const express = require('express')
const app = express()
const path = require("node:path");

const productRoutes = require('./controller/mainController')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
const homeRoute = require('./routes/home')
const employeeRoute = require('./routes/employee')
app.use('/',homeRoute)
app.use('/employee',employeeRoute)


app.listen(3000,() => {

    console.log('APP is running baby')
})