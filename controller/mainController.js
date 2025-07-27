
const db = require('../db/queries');
const { search } = require('../routes/home');

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
async function showTransactions(req, res) {
  try {
    const transactions = await db.getAllTransactionsWithDetails();
    const categories = await db.getAllCategories(); 
    res.render('transactions', {
      transactions,
      categories,
    });
  } catch (err) {
    console.error('Error loading transactions:', err.message);
    res.render('error');
  }
}

function showCategorys(req,res) {
  res.render('categorys')
}

function newEmployee(req,res) {
  res.render('new-employee')
}

async function addEmployee(req,res){
  const empdata = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    age: req.body.age,
    status: req.body.status,
    hireDate: req.body.hire_date,
    topPerformer: false
  }
   await db.insertEmployee(empdata)
  res.redirect("/employees")
}

async function deleteEmployee(req,res){

  const employeeID = parseInt(req.params.id);

  try {
     await db.dropEmployee(employeeID);
     res.redirect("/employees")
  } catch (err){
    console.log('Something went wrong:', err.message)
    res.render('error')
  }

}

async function newTransactions(req,res){
  const employees = await db.displayAllEmployees();
  const categories = await db.getAllCategories();
  res.render('new-transaction', {
    employees,
    categories
  });
}
function newCategorys(req,res){

  res.render('new-category')
}

async function conductSearch(req,res){
searchQuery = req.query;
  const totalCountEmployees = await db.countTotalEmployees();
  const activeCountEmployees = await db.countActiveEmployees('Active');
  const countTopPerformers = await db.countTopPerformers();
  const employeeDashboard = {
    count: totalCountEmployees,
    active:activeCountEmployees,
    topPerformers: countTopPerformers
  }
  let search = req.query.search
console.log('search term:', search);
  const employees   = await db.searchAndSortEmployees(searchQuery.search, searchQuery.sort);
  let sortBy = searchQuery.sort;
  console.log(sortBy)

res.render('employees-search', {employees,sortBy,search,
    employeeDashboard});
}






module.exports = {
  showHomePage,
  showEmployees,
  showTransactions,
  showCategorys,
  newEmployee,
  newTransactions,
  newCategorys,
  addEmployee,
  deleteEmployee,
  conductSearch
};
