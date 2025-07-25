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

module.exports = {
  showHomePage,
  showEmployees,
  showTransactions,
  showCategorys
};
