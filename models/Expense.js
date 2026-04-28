const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        enum: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Education', 'Salary', 'Other'],
        default: 'Other'
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// define a virtual for convenience so we can populate('user') if desired
expenseSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Expense', expenseSchema);

module.exports = mongoose.model('Expense', expenseSchema);