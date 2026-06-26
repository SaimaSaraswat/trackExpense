# 💰 TrackExpense — MERN Stack Expense Tracker

A full-stack personal finance tracker built with the MERN stack. Track your income and expenses, visualize spending patterns, and monitor your savings — all in one clean dashboard.

---

## 🌟 What Makes This Project Unique

- **Complete MERN stack** — MongoDB, Express, React, Node.js
- **JWT Authentication** — secure login and register system
- **Real-time Dashboard** — monthly income vs expense overview with savings rate
- **Category Breakdown** — visual progress bars showing where your money goes
- **Income + Expense Tracking** — manage both sides of your finances
- **Recent Transactions** — see your latest activity at a glance
- **Excel Export** — download your data as a spreadsheet
- **Fully Responsive** — works on mobile and desktop

---

## 📸 Screenshots

### 🔐 Login Page
![Login](https://github.com/SaimaSaraswat/trackExpense/raw/main/screenshots/login.png)

### 📊 Overview Dashboard
![Overview](https://github.com/SaimaSaraswat/trackExpense/raw/main/screenshots/overview.png)

### 💸 Expenses Tab
![Expenses](https://github.com/SaimaSaraswat/trackExpense/raw/main/screenshots/expenses.png)

### 💵 Income Tab
![Income](https://github.com/SaimaSaraswat/trackExpense/raw/main/screenshots/income.png)

---

## 🛠️ Tech Stack

| Layer             | Technology                           |
| ------------------ | ------------------------------------ |
| Frontend           | React.js, Context API, CSS Variables |
| Backend            | Node.js, Express.js                  |
| Database           | MongoDB Atlas                        |
| Authentication     | JWT (JSON Web Tokens)                |
| Password Security  | bcryptjs                             |
| Excel Export       | xlsx (SheetJS)                       |

---

## 📁 Project Structure

```
trackExpense/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js      # Register, login, profile
│   │   ├── expenseController.js
│   │   ├── incomeController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── models/
│   │   ├── userModels.js
│   │   ├── expenseModel.js
│   │   └── incomeModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── expenseRoute.js
│   │   ├── incomeRoute.js
│   │   └── dashboardRoute.js
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── ExpenseForm.js
│       │   ├── ExpenseList.js
│       │   ├── IncomeForm.js
│       │   ├── IncomeList.js
│       │   ├── DashboardOverview.js
│       │   └── StatsBar.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Dashboard.js
│       └── utils/
│           └── api.js
├── screenshots/
└── README.md
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed — download from [nodejs.org](https://nodejs.org)
- MongoDB Atlas account — free at [mongodb.com](https://mongodb.com)
- Git installed — download from [git-scm.com](https://git-scm.com)

### 1. Clone the Repository
```bash
git clone https://github.com/SaimaSaraswat/trackExpense.git
cd trackExpense
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:
```bash
node server.js
```
Backend runs on: `http://localhost:5000`

### 3. Setup Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

### 4. Open in Browser
Go to `http://localhost:3000` — register a new account and start tracking!

---

## 🔑 API Endpoints

### Auth Routes — `/api/user`
| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register new user   |
| POST   | `/login`    | Login user           |
| GET    | `/me`       | Get current user     |
| PUT    | `/profile`  | Update profile       |
| PUT    | `/password` | Change password      |

### Expense Routes — `/api/expense`
| Method | Endpoint         | Description        |
| ------ | ----------------- | ------------------- |
| POST   | `/add`            | Add expense          |
| GET    | `/get`            | Get all expenses     |
| PUT    | `/update/:id`     | Update expense       |
| DELETE | `/delete/:id`     | Delete expense       |
| GET    | `/overview`       | Expense overview     |
| GET    | `/downloadexcel`  | Download as Excel    |

### Income Routes — `/api/income`
| Method | Endpoint      | Description       |
| ------ | -------------- | ------------------- |
| POST   | `/add`        | Add income           |
| GET    | `/get`        | Get all income        |
| PUT    | `/update/:id` | Update income          |
| DELETE | `/delete/:id` | Delete income          |
| GET    | `/overview`   | Income overview        |

### Dashboard Route — `/api/dashboard`
| Method | Endpoint    | Description           |
| ------ | ----------- | ----------------------- |
| GET    | `/overview` | Full dashboard stats     |

---

## 🚀 Deployment

- **Backend** — deployed on Render
- **Frontend** — deployed on Vercel
- **Live Demo** — [trackexpense-tcng.onrender.com](https://trackexpense-tcng.onrender.com)

---

## 👩‍💻 Author

**Saima Saraswat**
GitHub: [@SaimaSaraswat](https://github.com/SaimaSaraswat)

---

## 📄 License

This project is open source and available under the MIT License.
