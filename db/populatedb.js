require("dotenv").config();
const { Client } = require("pg");

const createEmployeeTable = 
`CREATE TABLE IF NOT EXISTS employee (
  id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 100) PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER CHECK (age BETWEEN 16 AND 100),
  status VARCHAR(50) CHECK (status IN ('Active', 'Retired', 'Terminated')),
  hire_date DATE,
  top_performer BOOLEAN
);`


const createTransactionsTable = 
`CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employee(id),
  transaction_name VARCHAR(150),
  category_id INTEGER REFERENCES category(id),  -- foreign key!
  amount NUMERIC(10,2),
  purchase_date DATE
);
`



const createCategoryTable = 
`CREATE TABLE IF NOT EXISTS category (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,        
  description VARCHAR(150),    
  type VARCHAR(50) CHECK (type IN ('Income', 'Reimbursement', 'Deduction'))
);
`

const createAdminTable = 
`
CREATE TABLE IF NOT EXISTS admin_users (
  username VARCHAR(50) UNIQUE,
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  password VARCHAR(100),
  admin_access BOOLEAN,
  delete_permission BOOLEAN,
  logged_in BOOLEAN
);`

const createSystemLogsTable = 
`
CREATE TABLE IF NOT EXISTS system_logs (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  log TIMESTAMP DEFAULT NOW(),
  description VARCHAR(100)
);`

const seedScriptSQL = `
${createEmployeeTable}
${createCategoryTable}
${createTransactionsTable}
${createAdminTable}
${createSystemLogsTable}

-- Insert dummy employee data
INSERT INTO employee (first_name, last_name, age, status, hire_date, top_performer) VALUES
  ('Jane', 'Doe', 28, 'Active', '2022-03-01', false),
  ('John', 'Smith', 45, 'Active', '2010-06-15', false),
  ('Emily', 'Chen', 22, 'Terminated', '2024-01-12', false),
  ('Monroe', 'Austin', 24, 'Active', '2024-01-12', true),
  ('Elon', 'Musk', 51, 'Retired', '2017-01-12', true);

-- Insert dummy categories
INSERT INTO category (name, type, description) VALUES
  ('Bonus', 'Income', 'Used to reward employees with additional pay outside of regular salary, such as sign-on or performance bonuses.'),
  ('Travel Reimbursement', 'Reimbursement', 'Covers expenses paid by employees for business-related travel, such as flights, hotels, or meals.'),
  ('PTO Payout', 'Deduction', 'Used when paying out unused paid time off, typically during employee termination or resignation.');

-- Insert dummy transactions
INSERT INTO transactions ( employee_id, transaction_name, category_id, amount, purchase_date) VALUES
  ( 100, '1Yr Sign-On Bonus', 1, 500.00, '2025-07-20'),
  ( 101, 'HQ Plane Tickets', 2, 120.00, '2025-07-19'),
  ( 102, 'Sick Pay', 3, 2400.00, '2025-07-15');

-- Insert dummy admin user
INSERT INTO admin_users (username, password, admin_access,delete_permission,logged_in) VALUES
  ('admin', 'admin123', true, true,false);

-- Insert dummy system logs
INSERT INTO system_logs  (description) VALUES
  ('Started Server');
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