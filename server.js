const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'expensewise_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

// Log each request and whether a session user exists (helps debug redirects/404s)
app.use((req, res, next) => {
    console.log(`-> ${req.method} ${req.path}  sessionUser=${req.session && req.session.user ? 'yes' : 'no'}`);
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).send(`Page not found: ${req.method} ${req.originalUrl}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ ExpenseWise running at http://localhost:${PORT}`);
});

// Basic error handler to log server-side errors
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Internal server error');
});