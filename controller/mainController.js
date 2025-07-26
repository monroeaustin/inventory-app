const { render } = require("ejs")

function showHomePage(req,res){

    res.render('index')
}

function showEmployees(req,res) {
  res.render('employees')
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
