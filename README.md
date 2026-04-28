# 💰 ExpenseWise - Personal Expense Tracker

**Version:** 1.0.0  
**Project Type:** Full-Stack Web Application  
**Author:** Development Team  
**License:** ISC  
**Date Created:** 2026

ExpenseWise is a full-stack web application that helps users manage their personal finances by tracking income and expenses. It provides an intuitive dashboard to monitor spending patterns, categorize transactions, convert currencies, and maintain a clear picture of financial health.

---

## 📋 Project Overview

ExpenseWise is a **Personal Finance Management Tool** designed to:
- ✅ Track daily income and expenses with custom notes
- ✅ Categorize transactions (Food, Transport, Shopping, Entertainment, Health, Education, Salary, Other)
- ✅ View spending summaries on an interactive, real-time dashboard
- ✅ Secure user authentication with registration and login
- ✅ Toggle between light and dark mode for user preference
- ✅ Manage multiple transactions with timestamps and descriptions
- ✅ Convert currencies in real-time using live exchange rates
- ✅ Session-based authentication with 24-hour expiration
- ✅ Role-based access control (user-specific data isolation)

**Target Users:** Individuals, students, freelancers, and professionals who need to monitor their spending and financial habits.

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
│   └── Expense.js           # Expense/Income data schema
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
- **Transaction List**: View all your income and expenses, fetches data via REST API for real‑time sync
- **Summary Stats**: See total income, total expenses and balance; updates automatically on add/edit/delete
- **Quick Filters**: Filter transactions by category
- **CSV Export**: Download current view (filtered) as a CSV file
- **Responsive Design**: Works on desktop, tablet, and mobile

> 📊 For charts and category/month breakdowns, visit the **Analytics** page via the navbar. For currency conversion tools, see the **Converter** page.

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

---

## 🔌 Detailed API Documentation

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/` | Get home page | ❌ |
| GET | `/register` | Show registration form | ❌ |
| POST | `/register` | Register new user | ❌ |
| GET | `/login` | Show login form | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/logout` | Logout user | ✅ |
| GET | `/dashboard` | User dashboard | ✅ |

### **Expense Management Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/expenses/add` | Show add expense form | ✅ |
| POST | `/expenses/add` | Create new transaction | ✅ |
| GET | `/expenses/delete/:id` | Delete transaction | ✅ |
| GET | `/analytics` | View analytics page | ✅ |
| GET | `/converter` | Show currency converter | ✅ |

### **REST API Endpoints**

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|----------------|----------|
| GET | `/api/expenses` | Get all transactions for user | ✅ | `{success: true, expenses: [...]}` |
| POST | `/api/expenses` | Create new transaction | ✅ | `{success: true, expense: {...}}` |
| GET | `/api/convert?amount=100&from=INR&to=USD` | Convert currency | ❌ | `{success: true, result: "...", rate: 0.012}` |
| GET | `/api/currencies` | Get list of supported currencies | ❌ | `{success: true, currencies: [...]}` |

---

## 💾 Database Schema Details

### **User Collection**
```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, lowercase, trimmed),
  password: String (required, bcrypt hashed, min 6 chars),
  transactions: [ObjectId] (references to Expense documents),
  preferredCurrency: String (default: "INR"),
  createdAt: Date,
  updatedAt: Date
}
```

### **Expense Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required, indexed),
  title: String (required, trimmed),
  amount: Number (required),
  type: String (enum: ["income", "expense"], required),
  category: String (
    enum: ["Food", "Transport", "Shopping", "Entertainment", 
           "Health", "Education", "Salary", "Other"],
    default: "Other"
  ),
  date: Date (default: current date),
  note: String (optional, trimmed),
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ Configuration Guide

### **Environment Variables (.env)**
```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/expensewise

# Session & Auth
SESSION_SECRET=your_secure_session_secret_key_here
JWT_SECRET=your_secure_jwt_secret_key_here

# External APIs
EXCHANGE_RATE_API_URL=https://api.exchangerate-api.com/v4/latest/
```

### **Server Configuration (server.js)**
- **Port**: 3000 (configurable via .env)
- **Session Timeout**: 24 hours
- **HTTP Logging**: Morgan logger enabled
- **Body Parsing**: JSON and URL-encoded
- **Static Files**: Served from `/public` directory
- **View Engine**: EJS

---

## 📄 File Descriptions

### **Core Files**
| File | Purpose |
|------|---------|
| `server.js` | Main Express server, middleware setup, route mounting |
| `package.json` | Project metadata, dependencies, scripts |

### **Configuration Files**
| File | Purpose |
|------|---------|
| `config/db.js` | MongoDB connection and setup |
| `config/currencies.js` | Supported currencies list |

### **Models (Database Schemas)**
| File | Purpose |
|------|---------|
| `models/User.js` | User schema with authentication fields |
| `models/Expense.js` | Transaction schema for income/expenses |
| `models/MockDB.js` | Legacy fallback (not recommended) |

### **Routes (Routes)**
| File | Purpose |
|------|---------|
| `routes/authRoutes.js` | Registration, login, logout, home, dashboard |
| `routes/expenseRoutes.js` | Add, delete, view expenses |
| `routes/apiRoutes.js` | REST API for AJAX requests |

### **Middleware**
| File | Purpose |
|------|---------|
| `middleware/authMiddleware.js` | Check if user is authenticated |

### **Views (Template Files)**
| File | Purpose |
|------|---------|
| `views/index.ejs` | Landing/home page |
| `views/register.ejs` | User registration form |
| `views/login.ejs` | User login form |
| `views/dashboard.ejs` | Main dashboard with transaction list |
| `views/add-expense.ejs` | Form to add new transaction |
| `views/analytics.ejs` | Charts and analytics |
| `views/converter.ejs` | Currency converter tool |
| `views/partials/header.ejs` | Page header component |
| `views/partials/navbar.ejs` | Navigation bar component |

### **Public Assets**
| File | Purpose |
|------|---------|
| `public/css/style.css` | All styling, responsive design |
| `public/js/main.js` | Dashboard logic, API calls, form handling |
| `public/js/darkmode.js` | Theme toggle functionality |
| `public/images/` | Icons, logos, images |

---

## 🔒 Security Measures

### **Password Security**
- Passwords encrypted with bcryptjs (salt rounds: 10)
- Minimum 6 characters required
- No plain-text storage

### **Session Security**
- httpOnly cookies (prevents JavaScript access)
- Secure session tokens with JWT
- 24-hour session expiration
- Session secret stored in environment variables

### **Input Validation**
- Server-side validation of all inputs
- Email format validation
- Amount and date validation
- XSS prevention through template escaping

### **Rate Limiting**
- Currency conversion endpoint limited to 50 requests per 15 minutes
- Prevents API abuse and excessive database queries

### **Data Isolation**
- Users can only access their own transactions
- userId referenced in all expense records
- Database query filtered by userId

---

## 🧪 Testing Workflow

### **Manual Testing**
1. **Registration**: Test with valid/invalid credentials
2. **Login**: Verify session creation and token generation
3. **Add Expense**: Create transaction, verify database entry
4. **Delete Expense**: Remove transaction, confirm deletion
5. **Currency Conversion**: Test different currency pairs
6. **Dark Mode**: Toggle theme, verify persistence
7. **Form Validation**: Test with empty/invalid inputs

### **Expected Behavior**
- ✅ Users can register with email and password
- ✅ Login creates session with 24-hour expiration
- ✅ Dashboard displays all user transactions
- ✅ Can add/delete expenses without errors
- ✅ Currency converter works with live rates
- ✅ Dark mode toggles and persists
- ✅ Invalid forms show appropriate error messages

---

## 🐛 Common Issues & Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| MongoDB connection fails | MongoDB not running | Start MongoDB service |
| Blank dashboard | No transactions created | Add test transactions |
| Session expires quickly | SESSION_SECRET not in .env | Add valid secret to .env |
| 404 on routes | Route not mounted in server.js | Check route mounting order |
| CSS not loading | Static path incorrect | Check `express.static()` path |
| Password encryption fails | bcryptjs not installed | Run `npm install` |
| CORS errors | Cross-origin requests blocked | Check API endpoint domain |

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| **Total Files** | 20+ |
| **Total Routes** | 15+ |
| **API Endpoints** | 7+ |
| **Database Models** | 2 |
| **Frontend Pages** | 7 |
| **CSS Files** | 1 |
| **JavaScript Files** | 2 |
| **Supported Categories** | 8 |
| **Dependencies** | 11 |
| **Dev Dependencies** | 0 |

---

## 📋 Deployment Checklist

- [ ] Set all environment variables in production
- [ ] Use strong SESSION_SECRET and JWT_SECRET
- [ ] Configure MongoDB URI for production database
- [ ] Enable HTTPS for secure connections
- [ ] Set NODE_ENV=production
- [ ] Test all authentication flows
- [ ] Verify rate limiting is working
- [ ] Set appropriate CORS policies
- [ ] Configure error logging
- [ ] Test dark mode across browsers
- [ ] Verify mobile responsiveness
- [ ] Test currency converter with live API

---

## 📚 Technology Learning Notes

### **Why Node.js + Express?**
- Single language (JavaScript) for frontend and backend
- Fast, event-driven architecture
- Large ecosystem (npm packages)
- Good performance for I/O operations

### **Why MongoDB + Mongoose?**
- Flexible schema (easy to modify)
- NoSQL simplifies user-transaction relationship
- Mongoose provides data validation
- Easy to scale horizontally

### **Why EJS for Templates?**
- Lightweight and simple syntax
- Direct JavaScript execution
- Small learning curve
- Good for rapid prototyping

### **Why bcryptjs?**
- Industry-standard password hashing
- Built-in salt generation
- Resistant to brute-force attacks
- CPU-intensive by design (slow = secure)

---

## 📈 Performance Considerations

- **Database Indexes**: userId indexed on Expense model for fast queries
- **Session Storage**: In-memory (consider external store for scaling)
- **API Caching**: Currency rates cached locally if needed
- **Static Assets**: CSS and JS minified in production
- **Query Optimization**: Only fetch user's transactions

---

## 🔗 External Services

### **Exchange Rate API**
- **URL**: https://api.exchangerate-api.com/v4/latest/
- **Rate Limit**: 1500 requests/day (free tier)
- **Purpose**: Real-time currency conversion
- **Fallback**: If API fails, conversion gracefully fails

---

## 📞 Support & Contact

For issues, questions, or feature requests:
- Check GitHub Issues
- Review troubleshooting section above
- Check server logs for errors
- Verify .env configuration

---

## 📈 Future Enhancements

- 📊 Advanced analytics and charts
- 💳 Budget setting and alerts
- 📤 Export to CSV/PDF
- 🔔 Monthly expense reminders
- 👥 Multi-user support with sharing
- 📱 Mobile app version
- 🏦 Bank account integration
- 📧 Email notifications

- 🔐 Two-factor authentication
- 🌐 Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Report bugs with detailed descriptions
2. Suggest features with use cases
3. Submit pull requests with improvements
4. Help with documentation

---

## 📄 License

This project is open source and available under the ISC License.

---

## 📝 Development Notes

- **Created**: 2026
- **Last Updated**: March 27, 2026
- **Status**: Active Development
- **Stability**: Production-Ready (v1.0.0)

### **Known Limitations**
- Session data not persisted across server restarts
- No offline functionality
- Single-user architecture (no sharing features yet)
- Basic analytics (no advanced charts)

### **Future Priority Items**
1. Implement budget alerts
2. Add data export functionality
3. Create mobile app
4. Add recurring transaction support
5. Implement data backup features

## 👨‍💻 Author

Created as a Full Stack Web Development Project

**Built with ❤️ using Node.js, Express, and MongoDB**

---

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** February 2026
**Version:** 1.0.0
