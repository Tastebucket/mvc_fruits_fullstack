const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

///////////////////////////////////////////////////
///   Define User schema and create User model  ///
///////////////////////////////////////////////////
const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

module.exports = User
