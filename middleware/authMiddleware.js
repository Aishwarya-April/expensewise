const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'expensewise_jwt';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.session.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

module.exports = authMiddleware;