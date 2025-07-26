const { render } = require("ejs")
const db = require('./db/queries');

function showHomePage(req,res){

    res.render('index')
}

async function showEmployees(req,res) {
  const employee = await db.displayAllEmployees;
  res.render('employees', {employee})
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
