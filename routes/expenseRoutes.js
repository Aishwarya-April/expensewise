const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
// note: mock DB support removed to avoid inconsistent user data storage

router.get('/add', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('add-expense', { user: req.session.user, error: null });
});

router.post('/add', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const { title, amount, type, category, date, note } = req.body;
        if (!title || !amount || !type || !category) {
            return res.render('add-expense', {
                user: req.session.user,
                error: 'All fields are required'
            });
        }
        const userId = req.session.user.id;
        const newExpense = new Expense({
            userId,
            title,
            amount: parseFloat(amount),
            type,
            category,
            date: date ? new Date(date) : Date.now(),
            note
        });
        await newExpense.save();
        const User = require('../models/User');
        await User.findByIdAndUpdate(userId, { $push: { transactions: newExpense._id } });
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error creating expense:', error);
        res.render('add-expense', { user: req.session.user, error: 'Something went wrong' });
    }
});

router.get('/delete/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const userId = req.session.user.id;
        // only delete a transaction belonging to the logged-in user
        const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId });
        if (deleted) {
            // remove reference from user document as well
            const User = require('../models/User');
            await User.findByIdAndUpdate(userId, { $pull: { transactions: deleted._id } });
        }
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/dashboard');
    }
});

module.exports = router;