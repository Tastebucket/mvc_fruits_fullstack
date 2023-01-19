///////////////////////////////////////////////////
/// Our schema and model for the fruit resource ///
///////////////////////////////////////////////////

//const mongoose = require('mongoose')  //import mongoose
const mongoose = require('../utils/connection')

// import our commentSchema, to use as a subdocument
const commentSchema = require('./comment')

// we'll destructure the Schema and model functions from mongoose
const{ Schema, model } = mongoose

const fruitSchema = new Schema ({
    name: {
    type: String
    },
    color: {
    type: String
    },
    readyToEat: {
    type: Boolean
    },
    owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
    comments: [commentSchema]
}, {
    timestamps: true
})

const Fruit = model('Fruit',fruitSchema)

////////////////////////
/// Export our Model ///
////////////////////////

module.exports = Fruit