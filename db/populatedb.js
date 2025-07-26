require("dotenv").config();
const { Client } = require("pg");

const createEmployeeTable = 
`CREATE TABLE IF NOT EXISTS employee (
  id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 100) PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER CHECK (age BETWEEN 13 AND 100),
  status VARCHAR(50) CHECK (status IN ('Active', 'Retired', 'Terminated')),
  hire_date DATE,
  top_performer BOOLEAN
);`


const createTransactionsTable = 
`CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  employee_id INTEGER REFERENCES employee(id),
  transaction_name VARCHAR(150),
  category_id INTEGER REFERENCES category(id),
  amount NUMERIC(10,2),
  purchase_date DATE
);`



const createCategoryTable = 
`CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY,
  name VARCHAR(150),
  type VARCHAR(100) CHECK (type IN ('Income','Reimbursement','Deduction'))
);`

const createAdminTable = 
`
CREATE TABLE IF NOT EXISTS admin_users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(100),
  admin_access BOOLEAN
);
`

const seedScriptSQL = `
${createEmployeeTable}
${createCategoryTable}
${createTransactionsTable}
${createAdminTable}

-- Insert dummy employee data
INSERT INTO employee (first_name, last_name, age, status, hire_date, top_performer) VALUES
  ('Jane', 'Doe', 28, 'Active', '2022-03-01', false),
  ('John', 'Smith', 45, 'Active', '2010-06-15', false),
  ('Emily', 'Chen', 22, 'Terminated', '2024-01-12', false),
  ('Monroe', 'Austin', 24, 'Active', '2024-01-12', true),
  ('Elon', 'Musk', 51, 'Retired', '2017-01-12', true);

-- Insert dummy categories
INSERT INTO category (id, name, type) VALUES
  (1, 'Bonus', 'Income'),
  (2, 'Travel Reimbursement','Reimbursement'),
  (3, 'PTO Payout', 'Deduction');

-- Insert dummy transactions
INSERT INTO transactions ( employee_id, transaction_name, category_id, amount, purchase_date) VALUES
  ( 100, '1Yr Sign-On Bonus', 1, 500.00, '2025-07-20'),
  ( 101, 'HQ Plane Tickets', 2, 120.00, '2025-07-19'),
  ( 102, 'Sick Pay', 3, 2400.00, '2025-07-15');

-- Insert dummy admin user
INSERT INTO admin_users (username, password, admin_access) VALUES
  ('admin', 'admin123', true);
`;



async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(seedScriptSQL);
  await client.end();
  console.log("done");
}

main();