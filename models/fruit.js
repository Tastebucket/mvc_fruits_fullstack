///////////////////////////////////////////////////
/// Our schema and model for the fruit resource ///
///////////////////////////////////////////////////

const mongoose = require('mongoose')  //import mongoose

// we'll destructure the Schema and model functions from mongoose
const{ Schema, model } = mongoose

const fruitSchema = new Schema ({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model('Fruit',fruitSchema)

////////////////////////
/// Export our Model ///
////////////////////////

module.exports = Fruit