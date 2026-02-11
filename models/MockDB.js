/**
 * In-memory mock database for testing when MongoDB is unavailable
 * This stores users and expenses in memory (lost on server restart)
 */

let mockUsers = [];
let mockExpenses = [];
let userIdCounter = 1;
let expenseIdCounter = 1;

const MockDB = {
    // User operations
    async createUser(userData) {
        const id = userIdCounter++;
        const user = { _id: id, ...userData, createdAt: new Date() };
        mockUsers.push(user);
        return user;
    },

    async findUserByEmail(email) {
        return mockUsers.find(u => u.email === email) || null;
    },

    async findUserById(id) {
        return mockUsers.find(u => u._id === id) || null;
    },

    // Expense operations
    async createExpense(expenseData) {
        const id = expenseIdCounter++;
        const expense = { _id: id, ...expenseData, createdAt: new Date() };
        mockExpenses.push(expense);
        return expense;
    },

    async findExpensesByUserId(userId) {
        return mockExpenses.filter(e => e.userId === userId);
    },

    async deleteExpense(id) {
        const index = mockExpenses.findIndex(e => e._id === id);
        if (index > -1) {
            mockExpenses.splice(index, 1);
            return true;
        }
        return false;
    },

    // Debugging
    printDB() {
        console.log('📊 Mock DB State:');
        console.log('Users:', mockUsers);
        console.log('Expenses:', mockExpenses);
    }
};

module.exports = MockDB;
