const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const MockDB = require('../models/MockDB');

// Detect if using mock DB
const isMockDB = () => global.setUseMockDB && typeof global.setUseMockDB === 'function' || false;

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
        
        // Check if using mock DB via global flag
        const useMockDB = typeof global.useMockDB !== 'undefined' ? global.useMockDB : false;
        
        try {
            if (useMockDB) {
                await MockDB.createExpense({
                    userId: req.session.user.id,
                    title,
                    amount: parseFloat(amount),
                    type,
                    category,
                    date: date ? new Date(date) : new Date(),
                    note
                });
            } else {
                const newExpense = new Expense({
                    userId: req.session.user.id,
                    title,
                    amount: parseFloat(amount),
                    type,
                    category,
                    date: date || Date.now(),
                    note
                });
                await newExpense.save();
            }
        } catch (dbError) {
            console.log('DB operation failed, trying mock DB:', dbError.message);
            global.useMockDB = true;
            await MockDB.createExpense({
                userId: req.session.user.id,
                title,
                amount: parseFloat(amount),
                type,
                category,
                date: date ? new Date(date) : new Date(),
                note
            });
        }
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('add-expense', { user: req.session.user, error: 'Something went wrong' });
    }
});

router.get('/delete/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const useMockDB = typeof global.useMockDB !== 'undefined' ? global.useMockDB : false;
        
        try {
            if (useMockDB) {
                await MockDB.deleteExpense(parseInt(req.params.id));
            } else {
                await Expense.findByIdAndDelete(req.params.id);
            }
        } catch (dbError) {
            console.log('DB operation failed, trying mock DB:', dbError.message);
            global.useMockDB = true;
            await MockDB.deleteExpense(parseInt(req.params.id));
        }
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/dashboard');
    }
});

module.exports = router;