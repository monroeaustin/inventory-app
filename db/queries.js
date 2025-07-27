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




module.exports = {
  displayAllEmployees,
  countTotalEmployees,
  getEmployeesByStatus,
  countActiveEmployees,
  countTopPerformers,
  insertEmployee,
  dropEmployee,
  searchAndSortEmployees

};


