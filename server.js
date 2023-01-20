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
// this was fine for building API that sends and recieves json
// but now our app is going to be Full-Stack. That means handling front-end and back-end from the same server (in this case)
//const app = express()
// This is the new app
const app = require("liquid-express-views")(express())


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
    const { username, loggedIn, userId } = req.session
    res.render('home.liquid', { username, loggedIn, userId })
})

app.use('/fruits', FruitRouter)
app.use('/users', UserRouter)
app.use('/comments', CommentRouter)

app.get('/error', (req,res) => {
    const error = req.query.error || 'This page does not exist'
    const { username, loggedIn, userId } = req.session
    res.render('home.liquid', { username, loggedIn, userId })
})
// catchall route
app.all('*', (req,res) => {
    res.redirect('/error')
})

///////////////////////////////////
///        Server Listener      ///
///////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

//END