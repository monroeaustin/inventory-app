
const db = require('../db/queries');
const auth = require("../utils/authCheck")
async function showHomePage(req, res) {

   try {
    const system_logs =  await db.retrieveSystemLogs();

    console.log(system_logs)
    res.render('index', {system_logs});
  } catch (err) {
    console.error("Error loading categories:", err.message);
    res.render("error");
  
}}

async function showEmployees(req, res) {
  const employees = await db.displayAllEmployees();
  const totalCountEmployees = await db.countTotalEmployees();
  const activeCountEmployees = await db.countActiveEmployees('Active');
  const countTopPerformers = await db.countTopPerformers();
  const employeeDashboard = {
    count: totalCountEmployees,
    active: activeCountEmployees,
    topPerformers: countTopPerformers
  }
  res.render('employees', {
    employees,
    employeeDashboard
  });
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

async function showCategorys(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render('categorys', { categories });
  } catch (err) {
    console.error("Error loading categories:", err.message);
    res.render("error");
  }
}
function newEmployee(req, res) {
  res.render('new-employee')
}

async function addEmployee(req, res) {
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

async function deleteEmployee(req, res) {
  const employeeID = parseInt(req.params.id);
const isAuthorized = await auth.authCheck();

  if ( !isAuthorized) {
    res.render('login')
  } else {
    try {
      await db.dropEmployee(employeeID);
      res.redirect("/employees")
    } catch (err) {
      console.log('Something went wrong:', err.message)
      res.render('error')
    }
  }



}

async function newTransactions(req, res) {
  const employees = await db.displayAllEmployees();
  const categories = await db.getAllCategories();
  res.render('new-transaction', {
    employees,
    categories
  });
}
function newCategorys(req, res) {

  res.render('new-category')
}

async function conductEmployeeSearch(req, res) {
  searchQuery = req.query;
  const totalCountEmployees = await db.countTotalEmployees();
  const activeCountEmployees = await db.countActiveEmployees('Active');
  const countTopPerformers = await db.countTopPerformers();
  const employeeDashboard = {
    count: totalCountEmployees,
    active: activeCountEmployees,
    topPerformers: countTopPerformers
  }
  let search = req.query.search
  console.log('search term:', search);
  const employees = await db.searchAndSortEmployees(searchQuery.search, searchQuery.sort);
  let sortBy = searchQuery.sort;
  console.log(sortBy)

  res.render('employees-search', {
    employees, sortBy, search,
    employeeDashboard
  });
}

async function postNewTransaction(req, res) {
  try {
    const txnData = {
      employee_id: parseInt(req.body.employee_id),
      transaction_name: req.body.description,
      category_id: parseInt(req.body.type), // <- now this is ID, not name
      amount: parseFloat(req.body.amount),
      purchase_date: req.body.date
    };

    await db.insertTransaction(txnData);
    res.redirect("/transactions");
  } catch (err) {
    console.error("Transaction insert error:", err.message);
    res.render("error");
  }
}


async function conductTransactionSearch(req, res) {
  const search = req.query.search || '';
  const filter = req.query.filter || '';

  try {
    const transactions = await db.searchAndSortTransactions(search, filter);
    const categories = await db.getAllCategories();

    res.render('transaction-search', {
      transactions,
      categories,
      search,
      filter
    });
  } catch (err) {
    console.error('Transaction search error:', err.message);
    res.render('error');
  }
}

async function deleteTransaction(req, res) {
  const transactionID = parseInt(req.params.id);
  const isAuthorized = await auth.authCheck();

  if (!isAuthorized) {
    res.render('login')
  } else {
    try {
      await db.dropTransaction(transactionID);
      res.redirect("/transactions");
    } catch (err) {
      console.error("Transaction delete error:", err.message);
      res.render("error");
    }
  }
}

async function addCategory(req, res) {
  const data = {
    name: req.body.name,
    description: req.body.description || '',
    type: req.body.type
  };

  try {
    await db.insertCategory(data);
    res.redirect('/categorys');
  } catch (err) {
    console.error("Category insert error:", err.message);
    res.render('error');
  }
}

async function deleteCategory(req, res) {
  const categoryID = parseInt(req.params.id);
  const isAuthorized = await auth.authCheck();

  if (!isAuthorized) {
    res.render('login')
  } else {
    try {
      await db.dropCategory(categoryID);
      res.redirect("/categorys");
    } catch (err) {
      console.error("Category delete error:", err.message);
      res.render("error");
    }
  }

}

function showLogin(req, res) {
  res.render('login')
}
async function processLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const isValid = await auth.passWordCheck(username, password);

    if (isValid) {
      await db.processLogin(true, username);
      console.log("Successful login");
      res.redirect('/');
    } else {
      console.log("Bad Password");
      res.render('login-error');
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.render('error');
  }
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
  conductEmployeeSearch,
  postNewTransaction,
  conductTransactionSearch,
  deleteTransaction,
  addCategory,
  deleteCategory,
  showLogin,
  processLogin

};
