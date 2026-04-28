const express = require('express');
const router = express.Router();
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const { isValidCurrency } = require('../config/currencies');

// simple middleware for session-based authentication
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
}

const convertLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { success: false, message: 'Too many requests, please try again later' }
});

router.get('/convert', convertLimiter, async (req, res) => {
    try {
        const { amount, from, to } = req.query;
        if (!amount || !to) {
            return res.json({ success: false, message: 'Amount and target currency required' });
        }
        
        // Default from currency to INR if not specified
        const fromCurrency = (from || 'INR').toUpperCase();
        const toCurrency = to.toUpperCase();
        
        // Validate currencies
        if (!isValidCurrency(fromCurrency) || !isValidCurrency(toCurrency)) {
            return res.json({ success: false, message: 'One or more currencies not supported' });
        }
        
        // If both currencies are the same, return the amount as-is
        if (fromCurrency === toCurrency) {
            const result = parseFloat(amount).toFixed(2);
            return res.json({ success: true, result, rate: 1 });
        }
        
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const rates = response.data.rates;
        if (!rates[toCurrency]) {
            return res.json({ success: false, message: 'Target currency not supported' });
        }
        const result = (parseFloat(amount) * rates[toCurrency]).toFixed(2);
        res.json({ success: true, result, rate: rates[toCurrency] });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Conversion failed. Try again.' });
    }
});

// Get list of supported currencies
router.get('/currencies', (req, res) => {
    try {
        const { getAllCurrencies } = require('../config/currencies');
        const currencyList = getAllCurrencies();
        res.json({ success: true, currencies: currencyList });
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch currencies' });
    }
});

// list all transactions (income+expense) for logged-in user
router.get('/expenses', requireAuth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.session.user.id }).sort({ date: -1 });
        res.json({ success: true, expenses });
    } catch (error) {
        console.error('API /expenses error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch expenses' });
    }
});

// create a new transaction
router.post('/expenses', requireAuth, async (req, res) => {
    try {
        const { title, amount, type, category, date, note } = req.body;
        if (!title || !amount || !type || !category) {
            return res.status(400).json({ success: false, message: 'Missing fields' });
        }
        const newExp = new Expense({
            userId: req.session.user.id,
            title,
            amount: parseFloat(amount),
            type,
            category,
            date: date ? new Date(date) : Date.now(),
            note
        });
        await newExp.save();
        // keep a reference on the User document for quick population
        try {
            const User = require('../models/User');
            await User.findByIdAndUpdate(req.session.user.id, { $push: { transactions: newExp._id } });
        } catch (uErr) {
            console.error('Failed to update user.transactions:', uErr);
        }
        res.json({ success: true, expense: newExp });
    } catch (error) {
        console.error('API create expense error:', error);
        res.status(500).json({ success: false, message: 'Unable to create transaction' });
    }
});

// delete a transaction by id, ensure ownership
router.delete('/expenses/:id', requireAuth, async (req, res) => {
    try {
        const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.session.user.id });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Not found or unauthorized' });
        }
        // remove reference from user document as well
        try {
            const User = require('../models/User');
            await User.findByIdAndUpdate(req.session.user.id, { $pull: { transactions: deleted._id } });
        } catch (uErr) {
            console.error('Failed to remove transaction from user:', uErr);
        }
        res.json({ success: true });
    } catch (error) {
        console.error('API delete expense error:', error);
        res.status(500).json({ success: false, message: 'Unable to delete transaction' });
    }
});

// update existing transaction (optional)
router.put('/expenses/:id', requireAuth, async (req, res) => {
    try {
        const updates = req.body;
        const exp = await Expense.findOneAndUpdate(
            { _id: req.params.id, userId: req.session.user.id },
            updates,
            { new: true }
        );
        if (!exp) {
            return res.status(404).json({ success: false, message: 'Not found or unauthorized' });
        }
        res.json({ success: true, expense: exp });
    } catch (error) {
        console.error('API update expense error:', error);
        res.status(500).json({ success: false, message: 'Unable to update transaction' });
    }
});

// endpoint to return current user profile (populated with transactions)
router.get('/user', requireAuth, async (req, res) => {
    try {
        const User = require('../models/User');
        const user = await User.findById(req.session.user.id).populate('transactions');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        console.error('API /user error:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve user' });
    }
});

// update user profile/preferences
router.put('/user', requireAuth, async (req, res) => {
    try {
        const updates = req.body;
        const User = require('../models/User');
        const user = await User.findByIdAndUpdate(req.session.user.id, updates, { new: true });
        res.json({ success: true, user });
    } catch (error) {
        console.error('API /user PUT error:', error);
        res.status(500).json({ success: false, message: 'Failed to update user' });
    }
});

// aggregated stats by category and month
router.get('/expenses/stats', requireAuth, async (req, res) => {
    try {
        // Construct an ObjectId instance to be safe across mongoose/node versions
        const userId = new mongoose.Types.ObjectId(req.session.user.id);
        // breakdown by category
        const byCategory = await Expense.aggregate([
            { $match: { userId } },
            { $group: { _id: '$category', total: { $sum: '$amount' } } }
        ]);
        // breakdown by year-month
        const byMonth = await Expense.aggregate([
            { $match: { userId } },
            { $group: {
                _id: { year: { $year: '$date' }, month: { $month: '$date' } },
                total: { $sum: '$amount' }
            } },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);
        res.json({ success: true, breakdown: byCategory, monthly: byMonth });
    } catch (error) {
        console.error('API expense stats error:', error);
        res.status(500).json({ success: false, message: 'Unable to compute stats' });
    }
});

module.exports = router;