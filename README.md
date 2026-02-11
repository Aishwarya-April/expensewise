# 💰 ExpenseWise - Personal Expense Tracker

ExpenseWise is a full-stack web application that helps you manage your personal finances by tracking income and expenses. It provides an intuitive dashboard to monitor your spending patterns, categorize transactions, and maintain a clear picture of your financial health.

---

## 📋 What is ExpenseWise?

ExpenseWise is a **Personal Finance Management Tool** designed to:
- ✅ Track your daily income and expenses
- ✅ Categorize transactions (Food, Transport, Shopping, Entertainment, Health, Education, Salary, Other)
- ✅ View spending summaries on an interactive dashboard
- ✅ Secure user authentication with login and registration
- ✅ Toggle between light and dark mode for comfortable viewing
- ✅ Manage multiple transactions with notes and dates

**Who should use it?** Anyone who wants to keep track of their spending and understand where their money is going.

---

## 🛠️ Tech Stack

### **Backend - Server & Logic**
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime environment for running server code |
| **Express.js** | Web framework for building the REST API and handling routes |
| **MongoDB + Mongoose** | NoSQL database for storing user data and transactions |

### **Frontend - User Interface**
| Technology | Purpose |
|-----------|---------|
| **EJS (Embedded JavaScript)** | Template engine for rendering dynamic HTML pages |
| **HTML5** | Markup structure for web pages |
| **CSS3** | Styling and responsive design |
| **JavaScript (Vanilla)** | Client-side interactivity (dark mode, form validation) |

### **Security & Authentication**
| Technology | Purpose |
|-----------|---------|
| **bcryptjs** | Password hashing and encryption for secure storage |
| **JSON Web Tokens (JWT)** | Secure token-based authentication |
| **express-session** | Server-side session management |
| **cookie-parser** | Parse and manage HTTP cookies |

### **Development Tools**
| Technology | Purpose |
|-----------|---------|
| **dotenv** | Manage environment variables (.env file) |
| **morgan** | HTTP request logger for debugging |
| **express-rate-limit** | Prevent abuse by limiting requests |
| **axios** | Make HTTP requests (API calls) |

---

## 🏗️ Project Structure

```
expensewise/
├── server.js                 # Main application file
├── package.json              # Project dependencies
├── config/
│   └── db.js                # Database connection setup
├── models/
│   ├── User.js              # User data schema
│   ├── Expense.js           # Expense/Income data schema
│   └── MockDB.js            # Mock database for testing
├── routes/
│   ├── authRoutes.js        # Login, Register, Home routes
│   ├── expenseRoutes.js     # Add, View, Delete expenses
│   └── apiRoutes.js         # API endpoints for data fetching
├── middleware/
│   └── authMiddleware.js    # Authentication checks
├── views/
│   ├── index.ejs            # Landing/Home page
│   ├── register.ejs         # Registration form
│   ├── login.ejs            # Login form
│   ├── dashboard.ejs        # Main dashboard (expenses summary)
│   ├── add-expense.ejs      # Add new expense form
│   └── partials/            # Reusable components
│       ├── header.ejs       # Page header
│       └── navbar.ejs       # Navigation bar
└── public/
    ├── css/
    │   └── style.css        # All styling
    ├── js/
    │   ├── main.js          # Main JavaScript logic
    │   └── darkmode.js      # Dark mode toggle functionality
    └── images/              # Images and assets
```

---

## 🎯 Key Features Explained

### **1. User Authentication**
- **Sign Up**: Create a new account with name, email, and password
- **Sign In**: Secure login with encrypted password verification
- **Session Management**: Automatic logout after 24 hours for security
- **Password Protection**: Passwords are encrypted using bcryptjs before storing

### **2. Expense Management**
- **Add Transaction**: Log income or expense with title, amount, category, and date
- **Categorization**: Organize transactions into 8 categories
- **Edit/Delete**: Modify or remove transactions as needed
- **Notes**: Add additional details for each transaction

### **3. Dashboard**
- **Transaction List**: View all your income and expenses
- **Summary Stats**: See total income, total expenses, and balance
- **Filter by Type**: View only income or expenses
- **Responsive Design**: Works on desktop, tablet, and mobile

### **4. Dark Mode**
- **Visual Toggle**: Easy switch between light and dark themes
- **Persistent State**: Your preference is saved in browser storage
- **Eye-Friendly**: Reduces strain during night-time usage

---

## 🔄 How It Works (Simple Flow)

```
1. User Opens App (index.ejs)
   ↓
2. Register/Login with email & password (bcryptjs encrypts)
   ↓
3. Session Created (express-session)
   ↓
4. Access Dashboard
   ↓
5. Add Income/Expense (stored in MongoDB)
   ↓
6. View Summary & Analytics
   ↓
7. Logout (session ends)
```

---

## 📊 Data Models

### **User Model**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  password: "encrypted_hash_here",
  createdAt: "2024-01-15T10:30:00Z"
}
```

### **Expense Model**
```javascript
{
  userId: "user_id_reference",
  title: "Grocery Shopping",
  amount: 5000,
  type: "expense",           // or "income"
  category: "Food",
  date: "2024-01-20T00:00:00Z",
  note: "Weekly groceries",
  createdAt: "2024-01-20T10:30:00Z"
}
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB installed and running
- npm (Node Package Manager)

### **Installation**

1. Clone the repository:
```bash
git clone <repository-url>
cd expensewise
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expensewise
SESSION_SECRET=your_secret_key
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
node server.js
```

5. Open browser and visit:
```
http://localhost:3000
```

---

## 🔐 Security Features

✅ **Password Encryption** - Using bcryptjs for secure password storage
✅ **Session Tokens** - JWT for API authentication
✅ **Rate Limiting** - Prevent brute force attacks
✅ **Input Validation** - Server-side validation of all inputs
✅ **CORS Protection** - Secure cross-origin requests
✅ **HttpOnly Cookies** - Prevent XSS attacks

---

## 📱 Technologies at a Glance

| Layer | Tech | Why? |
|-------|------|------|
| **Server** | Express.js | Fast, lightweight, widely used |
| **Database** | MongoDB | Flexible, scalable NoSQL storage |
| **Auth** | bcryptjs + JWT | Industry-standard security |
| **Frontend** | EJS + Vanilla JS | Simple, no heavy frameworks |
| **Session** | express-session | Secure user session handling |

---

## 📝 API Routes

### **Authentication Routes**
- `GET /` - Home page
- `GET /register` - Registration form
- `POST /register` - Create new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - End session

### **Expense Routes**
- `GET /expenses/add` - Add expense form
- `POST /expenses/add` - Save new expense
- `GET /expenses` - View all expenses
- `DELETE /expenses/:id` - Delete expense

### **API Routes**
- `GET /api/expenses` - Fetch all expenses (JSON)
- `GET /api/summary` - Get financial summary

---

## 🎨 Frontend Features

- **Responsive Design** - Works on all devices
- **Dark Mode** - Toggle between themes
- **Real-time Validation** - Instant feedback on forms
- **Interactive Dashboard** - Charts and statistics
- **Smooth Navigation** - Seamless page transitions

---

## 📈 Future Enhancements

- 📊 Advanced analytics and charts
- 💳 Budget setting and alerts
- 📤 Export to CSV/PDF
- 🔔 Monthly expense reminders
- 👥 Multi-user support with sharing
- 📱 Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Report bugs
2. Suggest features
3. Submit pull requests

---

## 📄 License

This project is open source and available under the ISC License.

---

## 👨‍💻 Author

Created as a Full Stack Web Development Project

**Built with ❤️ using Node.js, Express, and MongoDB**

---

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** February 2026
**Version:** 1.0.0
