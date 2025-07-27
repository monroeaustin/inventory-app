# 🗃️ Employee Manager – Inventory Management System

A full-stack Node.js/Express web application for managing employees, categories, and transactions. Built as part of The Odin Project's NodeJS curriculum, with enhanced features and a modern, production-style UI.

---

## 🚀 Features

### ✅ Core Functionality

**👤 Employee Management**
- Create, view, and delete employee records
- Fields: first name, last name, age, status (Active, Retired, Terminated), hire date, top performer flag

**💸 Transaction Management**
- Log transactions tied to employees
- Categories: Bonus, PTO, Reimbursements, etc.
- Auto-joined with employee and category tables
- Search and filter support

**📂 Category Management**
- Create, view, and delete transaction categories
- Category types: `Income`, `Reimbursement`, `Deduction`

### 🔍 Search, Sort, and Filter
- Search across employee fields (name, ID, status)
- Sort by: name, age, ID, top performer
- Filter transactions by category or employee

---

## 🔒 Extra Credit Features

**🔐 Admin Login System**
- Basic login form (username/password)
- Protects destructive actions like deleting records
- Uses a `logged_in` flag stored in the database

**🎨 UI Design**
- Styled with TailwindCSS
- Responsive design with reusable EJS components
- Pretty login page and modern UI elements

**🌱 Database Seeding**
- `populatedb.js` script creates tables and inserts dummy data
- Includes employees, transactions, categories, and an admin user

---

## 🛠️ Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Backend   | Node.js, Express  |
| Database  | PostgreSQL        |
| Frontend  | EJS, TailwindCSS  |
| Auth      | Custom logic      |
| ORM       | `pg` PostgreSQL client |

---

## 📁 Folder Structure


---

## 🧪 Setup & Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/monroeaustin/inventory-app.git
cd inventory-app
npm install
3. Create .env File
env
Copy
Edit
DATABASE_URL=postgresql://youruser:yourpass@localhost:5432/employee-manager_db
4. Seed the Database
bash
Copy
Edit
node db/populatedb.js
5. Start the Server
bash
Copy
Edit
node app.js
Visit http://localhost:3000

🔐 Admin Login Info
| username     | password        |
|-----------|-------------------|
| admin   |  |   admin123

📸 Screenshots
<img width="1285" height="777" alt="image" src="https://github.com/user-attachments/assets/47746898-7fba-4284-a54c-4fa6d0694370" />

<img width="1464" height="637" alt="image" src="https://github.com/user-attachments/assets/158a8f97-1c73-4bf7-8881-2ff62f4f456c" />
<img width="772" height="646" alt="image" src="https://github.com/user-attachments/assets/d09fb765-ac56-4c81-8fb7-226e2934268c" />


📌 Notes
Delete actions are only allowed when logged in as an admin

Currently using DB-stored logged_in flag — future enhancements can include JWT or sessions

Easily extendable: add editing, custom roles, audit logs, etc.

🎓 Credit
Built as part of The Odin Project – Node.js Curriculum
By Monroe Austin

