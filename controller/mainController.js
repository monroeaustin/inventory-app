
const db = require('../db/queries');

function showHomePage(req,res){

    res.render('index')
}

async function showEmployees(req,res) {
  const employees = await db.displayAllEmployees();
  const totalCountEmployees = await db.countTotalEmployees();
  const activeCountEmployees = await db.countActiveEmployees('Active');
  const countTopPerformers = await db.countTopPerformers();
  const employeeDashboard = {
    count: totalCountEmployees,
    active:activeCountEmployees,
    topPerformers: countTopPerformers
  }
  res.render('employees', {employees,
    employeeDashboard});
}
function showTransactions(req,res) {
  res.render('transactions')
}

function showCategorys(req,res) {
  res.render('categorys')
}

function newEmployee(req,res) {
  res.render('new-employee')
}

function newTransactions(req,res){
  res.render('new-transaction');
}
function newCategorys(req,res){
  res.render('new-category')
}

module.exports = {
  showHomePage,
  showEmployees,
  showTransactions,
  showCategorys,
  newEmployee,
  newTransactions,
  newCategorys
};
