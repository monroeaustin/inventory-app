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
  transaction_type VARCHAR(150),
  amount NUMERIC(10,2),
  hire_date DATE
);`
