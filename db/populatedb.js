const { Client } = require("pg");

const createEmployeeTable = 
`CREATE TABLE IF NOT EXISTS employee (
  id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 100) PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER CHECK (age BETWEEN 13 AND 100),
  status VARCHAR(50) CHECK (status IN ('Active', 'Retired', 'Junior', 'Terminated')),
  hire_date DATE,
  top_performer BOOLEAN
);`


const createTransactionsTable = 
`CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  transaction_id VARCHAR(100) UNIQUE,
  employee_id INTEGER REFERENCES employee(id),
  name VARCHAR(150),
  transaction_category VARCHAR(150) REFERENCES category(id),
  amount NUMERIC(10,2),
  hire_date DATE
);`



const createCategoryTable = 
`CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY,
  name VARCHAR(150),
  transaction_description VARCHAR(80),
  type VARCHAR(100) CHECK (status in ('Income','Reimbursement','Deduction')),
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
  ('John', 'Smith', 45, 'Retired', '2010-06-15', false),
  ('Emily', 'Chen', 22, 'Junior', '2024-01-12', false);
  ('Monroe', 'Austin', 24, 'Junior', '2024-01-12', true);

-- Insert dummy categories
INSERT INTO category (id, name, transaction_description, type) VALUES
  (1, 'Bonus', 'Year-end performance bonus', 'Income'),
  (2, 'Travel Reimbursement', 'Flight and hotel expenses', 'Reimbursement'),
  (3, 'PTO Payout', 'Paid time off payout', 'Deduction');

-- Insert dummy transactions
INSERT INTO transactions (transaction_id, employee_id, name, transaction_category, amount, hire_date) VALUES
  ('T001', 100, 'Jane Doe', 1, 500.00, '2025-07-20'),
  ('T002', 101, 'John Smith', 2, 120.00, '2025-07-19'),
  ('T003', 102, 'Emily Chen', 3, 2400.00, '2025-07-15');

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