const pool = require("./pool");

const createEmployeeTable = 
`CREATE TABLE employee (
  id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 100) PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER CHECK (age BETWEEN 13 AND 100),
  status VARCHAR(50) CHECK (status IN ('Active', 'Retired', 'Junior', 'Terminated')),
  hire_date DATE,
  top_performer BOOLEAN
);`


const createTransactionsTable = 
`CREATE TABLE transactions (
  transaction_id VARCHAR(100) PRIMARY KEY,
  employee_id INTEGER REFERENCES employee(id),
  name VARCHAR(150),
  transaction_category VARCHAR(150) REFERENCES category(id),
  amount NUMERIC(10,2),
  hire_date DATE
);`



const createCategoryTable = 
`CREATE TABLE category (
  id INTEGER PRIMARY KEY,
  name VARCHAR(150),
  transaction_description VARCHAR(80),
  type VARCHAR(100) CHECK (status in ('Income','Reimbursement','Deduction')),
);`

const createAdminTable = 
`
CREATE TABLE admin_users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(100)
);
`
async function countTotalEmployees(){
    const { rows } = await pool.query ("SELECT * FROM employee")
    return rows.length
}
async function displayAllEmployees(){
    const { rows } = await pool.query ("SELECT * FROM employee")
    return rows
}

async function searchEmployeeByName(name){
    const value = `%${name}%`
    const { rows } = await pool.query ("SELECT * FROM employee WHERE first_name OR last_name ILIKE $1",[value])
    return rows
}
async function getEmployeesByStatus(status) {
  const { row } = await pool.query(
    "SELECT * FROM employee WHERE status = $1",[status]
  );
  return row;
}

async function countActiveEmployees(){
    const { rows } = await pool.query ("SELECT * FROM employee WHERE status = 'Active'")
    return rows.length
}

async function countTopPerformers(){
    const { rows } = await pool.query ("SELECT * FROM employee WHERE top_performer = TRUE")
    return rows.length
}

a

