# 🗃️ Employee Manager – Inventory Management System

A full-stack Node.js/Express web application for managing employees, transactions, and categories. Built as part of [The Odin Project](https://www.theodinproject.com)'s Node.js curriculum, this project includes extra features like admin login, data filtering, and a production-quality UI.

---

## 🚀 Features

### ✅ Core Functionality

**👤 Employee Management**
- Create, view, and delete employee records
- Fields: first name, last name, age, status (Active, Retired, Terminated), hire date, top performer flag

**💸 Transaction Management**
- Log transactions tied to employees
- Categories like Bonus, PTO, Reimbursements, etc.
- Auto-joined with employee and category tables
- Search and filter transactions

**📂 Category Management**
- Create, view, and delete transaction categories
- Category types: `Income`, `Reimbursement`, `Deduction`

### 🔍 Search, Sort & Filter
- Search employees by name, ID, or status
- Sort by: name, age, ID, or top performer
- Filter transactions by employee or category

---

## 🔒 Extra Credit Features

**🔐 Admin Login System**
- Simple login form (username/password)
- Protects destructive actions like deleting records
- Uses a `logged_in` flag in the database

**🎨 Tailwind UI**
- Responsive design using TailwindCSS
- Clean, reusable EJS partials
- Beautiful login page

**🌱 Data Seeding**
- `populatedb.js` seeds database with:
  - Employees
  - Transactions
  - Categories
  - Admin login credentials

---

## 🛠️ Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Backend   | Node.js, Express  |
| Database  | PostgreSQL        |
| Frontend  | EJS, TailwindCSS  |
| Auth      | Custom logic      |
| ORM       | `pg` PostgreSQL client |

## 🔐 Secret Admin Permissions

| username     | password        |
|-----------|-------------------|
| admin   | admin123  |

---

## Screenshots

<img width="1285" alt="Employee Table" src="https://github.com/user-attachments/assets/47746898-7fba-4284-a54c-4fa6d0694370" />

<img width="1464" alt="Search Filters" src="https://github.com/user-attachments/assets/158a8f97-1c73-4bf7-8881-2ff62f4f456c" />

<img width="772" alt="Login Page" src="https://github.com/user-attachments/assets/d09fb765-ac56-4c81-8fb7-226e2934268c" />

📌 Notes
Delete actions are only allowed when logged in as an admin

Currently using DB-stored logged_in flag — future enhancements can include JWT or sessions

Easily extendable: add editing, custom roles, audit logs, etc.

🎓 Credit
Built as part of The Odin Project – Node.js Curriculum
By Monroe Austin
