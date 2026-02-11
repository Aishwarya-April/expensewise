const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'expensewise_jwt';
const User = require('../models/User');
const Expense = require('../models/Expense');
const MockDB = require('../models/MockDB');

// Initialize global useMockDB flag if not set
if (typeof global.useMockDB === 'undefined') {
    global.useMockDB = false;
}

router.get('/', (req, res) => {
    const user = req.session.user || null;
    res.render('index', { user });
});

router.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('register', { user: null, error: null });
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.render('register', { user: null, error: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.render('register', { user: null, error: 'Passwords do not match' });
        }
        if (password.length < 6) {
            return res.render('register', { user: null, error: 'Password must be at least 6 characters' });
        }
        
        let existingUser, newUser;
        
        if (global.useMockDB) {
            existingUser = await MockDB.findUserByEmail(email);
            if (existingUser) {
                return res.render('register', { user: null, error: 'Email already registered. Please login.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser = await MockDB.createUser({ name, email, password: hashedPassword });
        } else {
            try {
                existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.render('register', { user: null, error: 'Email already registered. Please login.' });
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                newUser = new User({ name, email, password: hashedPassword });
                await newUser.save();
            } catch (dbError) {
                console.log('📝 DB operation failed, switching to mock DB:', dbError.message);
                global.useMockDB = true;
                const hashedPassword = await bcrypt.hash(password, 10);
                newUser = await MockDB.createUser({ name, email, password: hashedPassword });
            }
        }
        
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        req.session.user = { id: newUser._id, name: newUser.name, email: newUser.email };
        req.session.token = token;
        // Ensure session is saved before redirect so the cookie is set reliably
        req.session.save(err => {
            if (err) console.error('Session save error:', err);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error(error);
        res.render('register', { user: null, error: 'Something went wrong. Please try again.' });
    }
});

router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('login', { user: null, error: null });
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render('login', { user: null, error: 'All fields are required' });
        }
        
        let user;
        if (global.useMockDB) {
            user = await MockDB.findUserByEmail(email);
        } else {
            try {
                user = await User.findOne({ email });
            } catch (dbError) {
                console.log('📝 DB operation failed, switching to mock DB:', dbError.message);
                global.useMockDB = true;
                user = await MockDB.findUserByEmail(email);
            }
        }
        
        if (!user) {
            return res.render('login', { user: null, error: 'No account found with this email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { user: null, error: 'Incorrect password' });
        }
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        req.session.user = { id: user._id, name: user.name, email: user.email };
        req.session.token = token;
        // Ensure session is saved before redirect so the cookie is set reliably
        req.session.save(err => {
            if (err) console.error('Session save error:', err);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.error(error);
        res.render('login', { user: null, error: 'Something went wrong. Please try again.' });
    }
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const userId = req.session.user.id;
        let expenses;
        
        if (global.useMockDB) {
            expenses = await MockDB.findExpensesByUserId(userId);
        } else {
            try {
                expenses = await Expense.find({ userId }).sort({ date: -1 });
            } catch (dbError) {
                console.log('📝 DB operation failed, switching to mock DB:', dbError.message);
                global.useMockDB = true;
                expenses = await MockDB.findExpensesByUserId(userId);
            }
        }
        
        expenses = expenses || [];
        let totalIncome = 0;
        let totalExpense = 0;
        expenses.forEach(exp => {
            if (exp.type === 'income') totalIncome += exp.amount;
            else totalExpense += exp.amount;
        });
        const balance = totalIncome - totalExpense;
        res.render('dashboard', {
            user: req.session.user,
            expenses,
            totalIncome: Number(totalIncome) || 0,
            totalExpense: Number(totalExpense) || 0,
            balance: Number(balance) || 0
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) console.error('Session destroy error:', err);
        res.clearCookie('token');
        res.redirect('/');
    });
});

module.exports = router;