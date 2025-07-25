const express = require('express')
const app = express()
const productRoutes = require('./controller/mainController')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })).use('/', productRoutes.showHomePage);

app.listen(3000,() => {

    console.log('APP is running baby')
})