const pool = require("./pool");


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
  const { rows } = await pool.query(
    "SELECT * FROM employee WHERE status = $1",[status]
  );
  return rows;
}
async function getEmployeesByID(id,order) {
  const { rows } = await pool.query(
    "SELECT * FROM employee WHERE id = $1",[id]
  );
  return rows;
}

async function countActiveEmployees(){
    const { rows } = await pool.query ("SELECT * FROM employee WHERE status = 'Active'")
    return rows.length
}

async function countTopPerformers(){
    const { rows } = await pool.query ("SELECT * FROM employee WHERE top_performer = TRUE")
    return rows.length
}

async function insertEmployee(emp){
  await pool.query(`INSERT INTO employee (first_name,last_name,age,status,hire_date,top_performer) 
    VALUES ($1,$2,$3,$4,$5,$6)`,  [
    emp.firstName,
    emp.lastName,
    emp.age,
    emp.status,
    emp.hireDate,
    emp.topPerformer
  ]);}
    
module.exports = {
displayAllEmployees,
countTotalEmployees,
getEmployeesByStatus,
countActiveEmployees,
countTopPerformers,
insertEmployee
};


