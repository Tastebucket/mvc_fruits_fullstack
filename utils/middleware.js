///////////////////////////////
///   Import Dependencies   ///
///////////////////////////////
const express = require('express')  // import express framework
const morgan = require('morgan')  // import morgan request logger




///////////////////////////////////
///          Middleware         ///
///////////////////////////////////
// middleware runs before all the routes
// every request is processed through our middleware before mongoose can do anything with it
const middleware = (app) => {
    app.use(morgan('tiny'))  // this is for request logging, the 'tiny argument declares what size of morgan log to use
    app.use(express.urlencoded({ extended: true})) /// this parses urlEncoded request bodies (useful for POST and PUT requests)
    app.use(express.static('public')) // this serves static files from the 'public' folder
    app.use(express.json()) // parses incoming request payloads with JSON
}

///////////////////////////////////
///  Export Middleware Function ///
///////////////////////////////////

module.exports = middleware