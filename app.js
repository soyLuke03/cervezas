const express = require('express')
const app = express()
// require('./db')
const cervezas = require('./routes/cervezas')

//MIDDLEWARE
app.use(express.json())

//ROUTES
app.use('/cervezas', cervezas)



app.listen(3000)