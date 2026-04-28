const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'expensewise_jwt';
const User = require('../models/User');
const Expense = require('../models/Expense');
// Note: MockDB support was removed to prevent inconsistent data storage.
// Backend now relies solely on MongoDB; any connection failures are surfaced
// to the user so the root issue can be fixed.

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
        
        // always use MongoDB for user creation; propagate errors to client
        let existingUser;
        try {
            existingUser = await User.findOne({ email });
        } catch (dbError) {
            console.error('DB error during registration lookup:', dbError);
            return res.render('register', { user: null, error: 'Database error. Please try again later.' });
        }
        if (existingUser) {
            return res.render('register', { user: null, error: 'Email already registered. Please login.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        try {
            await newUser.save();
        } catch (dbError) {
            console.error('DB error saving new user:', dbError);
            return res.render('register', { user: null, error: 'Failed to create account. Try again later.' });
        }
        
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        req.session.user = { id: newUser._id, name: newUser.name, email: newUser.email, preferredCurrency: newUser.preferredCurrency || 'INR' };
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
        try {
            user = await User.findOne({ email });
        } catch (dbError) {
            console.error('DB error while looking up user on login:', dbError);
            return res.render('login', { user: null, error: 'Database error. Please try again.' });
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
        req.session.user = { id: user._id, name: user.name, email: user.email, preferredCurrency: user.preferredCurrency || 'INR' };
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

const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, async (req, res) => {
    // authMiddleware redirects to login if session invalid
    try {
        const userId = req.session.user.id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
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

// dedicated analytics page uses client-side fetch of /api/expenses/stats
router.get('/analytics', authMiddleware, (req, res) => {
    res.render('analytics', { user: req.session.user });
});

// currency converter page
router.get('/converter', authMiddleware, (req, res) => {
    res.render('converter', { user: req.session.user });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) console.error('Session destroy error:', err);
        res.clearCookie('token');
        res.redirect('/');
    });
});

module.exports = router;