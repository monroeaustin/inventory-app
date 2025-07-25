function showHomePage(req,res){

    res.render('index')
}

function showEmployees(req,res) {
  res.render('employees')
}


module.exports = {
  showHomePage,
  showEmployees
};
