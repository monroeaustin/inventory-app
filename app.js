require('dotenv').config();
const express = require('express')
const app = express()
const path = require("node:path");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
const homeRoute = require('./routes/home')
const employeeRoute = require('./routes/employee')
const transactionRoute = require('./routes/transaction')
const categoryRoute = require('./routes/category')


app.use('/',homeRoute)
app.use('/employees',employeeRoute)
app.use('/transactions',transactionRoute)
app.use('/categorys',categoryRoute)


app.listen(3000,() => {

    console.log('APP is running baby')
})