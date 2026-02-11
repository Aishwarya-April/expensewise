const express = require('express');
const router = express.Router();
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const convertLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { success: false, message: 'Too many requests, please try again later' }
});

router.get('/convert', convertLimiter, async (req, res) => {
    try {
        const { amount, to } = req.query;
        if (!amount || !to) {
            return res.json({ success: false, message: 'Amount and currency required' });
        }
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/INR`
        );
        const rates = response.data.rates;
        if (!rates[to]) {
            return res.json({ success: false, message: 'Currency not supported' });
        }
        const converted = (parseFloat(amount) * rates[to]).toFixed(2);
        res.json({ success: true, converted, rate: rates[to] });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Conversion failed. Try again.' });
    }
});

router.get('/expenses', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const Expense = require('../models/Expense');
        const expenses = await Expense.find({ userId: req.session.user.id }).sort({ date: -1 });
        res.json({ success: true, expenses });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch expenses' });
    }
});

module.exports = router;