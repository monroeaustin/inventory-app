const pool = require("./pool");


async function countTotalEmployees() {
  const { rows } = await pool.query("SELECT * FROM employee")
  return rows.length
}
async function displayAllEmployees() {
  const { rows } = await pool.query("SELECT * FROM employee")
  return rows
}

async function searchEmployeeByName(name) {
  const value = `%${name}%`
  const { rows } = await pool.query("SELECT * FROM employee WHERE first_name OR last_name ILIKE $1", [value])
  return rows
}
async function getEmployeesByStatus(status) {
  const { rows } = await pool.query(
    "SELECT * FROM employee WHERE status = $1", [status]
  );
  return rows;
}
async function getEmployeesByID(id, order) {
  const { rows } = await pool.query(
    "SELECT * FROM employee WHERE id = $1", [id]
  );
  return rows;
}

async function countActiveEmployees() {
  const { rows } = await pool.query("SELECT * FROM employee WHERE status = 'Active'")
  return rows.length
}

async function countTopPerformers() {
  const { rows } = await pool.query("SELECT * FROM employee WHERE top_performer = TRUE")
  return rows.length
}

async function insertEmployee(emp) {
  await pool.query(`INSERT INTO employee (first_name,last_name,age,status,hire_date,top_performer) 
    VALUES ($1,$2,$3,$4,$5,$6)`, [
    emp.firstName,
    emp.lastName,
    emp.age,
    emp.status,
    emp.hireDate,
    emp.topPerformer
  ]);
}

async function dropEmployee(id) {
  await pool.query(`DELETE FROM employee WHERE id = ($1)`, [id])
}
async function searchAndSortEmployees(search, sortBy) {
  let whereClause = '';
  let values = [];

  if (search) {
    whereClause = `WHERE 
      first_name ILIKE $1 OR 
      last_name ILIKE $1 OR 
      status ILIKE $1 OR 
      CAST(id AS TEXT) ILIKE $1`;
    values.push(`%${search}%`);
  } else if(!search && sortBy==='top_performer'){
    whereClause = 'WHERE top_performer = true';
  }

  let orderBy = '';
  switch (sortBy) {
    case 'id_asc':
      orderBy = 'ORDER BY id ASC';
      break;
    case 'id_desc':
      orderBy = 'ORDER BY id DESC';
      break;
    case 'first_name_asc':
      orderBy = 'ORDER BY first_name ASC';
      break;
    case 'first_name_desc':
      orderBy = 'ORDER BY first_name DESC';
      break;
    case 'age_asc':
      orderBy = 'ORDER BY age ASC';
      break;
    case 'age_desc':
      orderBy = 'ORDER BY age DESC';
      break;
  }

  const queryParts = [
    'SELECT * FROM employee',
    whereClause,
    orderBy
  ];

  const sql = queryParts.filter(Boolean).join(' ') + ';';

  console.log('[FINAL SQL]', sql);

  const { rows } = await pool.query(sql, values);
  return rows;
}

async function displayAllTransactions() {
  const { rows } = await pool.query(`
    SELECT 
      t.id,
      t.transaction_name,
      t.amount,
      t.purchase_date,
      e.id AS employee_id,
      e.first_name,
      e.last_name,
      c.name AS category_name,
      c.type AS category_type
    FROM transactions t
    JOIN employee e ON t.employee_id = e.id
    JOIN category c ON t.category_id = c.id
 
  `);
  return rows;
}

// Insert a new transaction
async function insertTransaction(txn) {
  await pool.query(`
    INSERT INTO transactions (employee_id, transaction_name, category_id, amount, purchase_date)
    VALUES ($1, $2, $3, $4, $5);
  `, [txn.employee_id, txn.transaction_name, txn.category_id, txn.amount, txn.purchase_date]);
}

// Delete a transaction by ID
async function dropTransaction(id) {
  await pool.query(`DELETE FROM transactions WHERE id = $1`, [id]);
}

// Get all categories (for dropdowns)
async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * FROM category ORDER BY name ASC`);
  return rows;
}

// Optional: Search transactions by employee ID or category name
async function searchTransactions(query) {
  const value = `%${query}%`;
  const { rows } = await pool.query(`
    SELECT 
      t.id,
      t.transaction_name,
      t.amount,
      t.purchase_date,
      e.id AS employee_id,
      e.first_name,
      e.last_name,
      c.name AS category_name,
      c.type AS category_type
    FROM transactions t
    JOIN employee e ON t.employee_id = e.id
    JOIN category c ON t.category_id = c.id
    WHERE 
      CAST(e.id AS TEXT) ILIKE $1 OR
      c.name ILIKE $1 OR
      e.first_name ILIKE $1 OR
      e.last_name ILIKE $1
    ORDER BY t.purchase_date DESC;
  `, [value]);
  return rows;
}

async function getAllTransactionsWithDetails() {
  const { rows } = await pool.query(`
    SELECT 
      t.id,
      t.transaction_name,
      t.amount,
      t.purchase_date,
      e.id AS employee_id,
      e.first_name,
      e.last_name,
      c.name AS category_name,
      c.type AS category_type
    FROM transactions t
    JOIN employee e ON t.employee_id = e.id
    JOIN category c ON t.category_id = c.id
    ORDER BY t.purchase_date DESC;
  `);
  return rows;
}

async function searchAndSortTransactions(search, filter) {
  let whereClause = '';
  let values = [];

  if (search && filter) {
    whereClause = `WHERE 
      (
        t.transaction_name ILIKE $1 OR 
        e.first_name ILIKE $1 OR 
        e.last_name ILIKE $1 OR 
        c.name ILIKE $1 OR 
        c.type ILIKE $1 OR 
        CAST(e.id AS TEXT) ILIKE $1
      ) 
      AND c.name = $2`;
    values.push(`%${search.trim()}%`, filter.trim());
  } else if (search) {
    whereClause = `WHERE 
      t.transaction_name ILIKE $1 OR 
      e.first_name ILIKE $1 OR 
      e.last_name ILIKE $1 OR 
      c.name ILIKE $1 OR 
      c.type ILIKE $1 OR 
      CAST(e.id AS TEXT) ILIKE $1`;
    values.push(`%${search.trim()}%`);
  } else if (filter) {
    whereClause = `WHERE c.name = $1`;
    values.push(filter.trim());
  }

  const sql = `
    SELECT 
      t.id,
      t.transaction_name,
      t.amount,
      t.purchase_date,
      e.id AS employee_id,
      e.first_name,
      e.last_name,
      c.name AS category_name,
      c.type AS category_type
    FROM transactions t
    JOIN employee e ON t.employee_id = e.id
    JOIN category c ON t.category_id = c.id
    ${whereClause}
    ORDER BY t.purchase_date DESC;
  `;

  console.log('[TRANSACTION SQL]', sql);
  console.log('[VALUES]', values);

  const { rows } = await pool.query(sql, values);
  return rows;
}





module.exports = {
  displayAllEmployees,
  countTotalEmployees,
  getEmployeesByStatus,
  countActiveEmployees,
  countTopPerformers,
  insertEmployee,
  dropEmployee,
  searchAndSortEmployees,
  displayAllTransactions,
  insertTransaction,
  getAllCategories,
  searchTransactions,
  dropTransaction,
  getAllTransactionsWithDetails,
  searchAndSortTransactions

};


