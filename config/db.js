const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expensewise';
    try {
        await mongoose.connect(uri);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        console.log('⚠️  Starting server without DB — register/login will fail. Ensure MongoDB is running on localhost:27017 or set MONGO_URI in .env');
        // Do not exit; allow the server to run so user can see pages and debug locally.
    }
};

module.exports = connectDB;