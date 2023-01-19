///////////////////////////////
///   Import Dependencies   ///
///////////////////////////////
const express = require('express')  // import express framework
//const mongoose = require('mongoose') // import the mongoose library
const morgan = require('morgan')  // import morgan request logger
require('dotenv').config() // Load my ENV file's variables
const path = require('path')
const FruitRouter = require('./controllers/fruitControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')

///////////////////////////////////
///  Create Express App Object  ///
///////////////////////////////////

const app = express()


///////////////////////////////////
///          Middleware         ///
///////////////////////////////////
// middleware runs before all the routes
// every request is processed through our middleware before mongoose can do anything with it
middleware(app)

///////////////////////////////////
///           Routes            ///
///////////////////////////////////
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})

app.use('/fruits', FruitRouter)
app.use('/users', UserRouter)
app.use('/comments', CommentRouter)

///////////////////////////////////
///        Server Listener      ///
///////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

//END