///////////////////////////////
///   Import Dependencies   ///
///////////////////////////////
const express = require('express')  // import express framework
const Fruit = require('../models/fruit')


///////////////////////////////
///      Create Router      ///
///////////////////////////////
const router = express.Router()



///////////////////////////////
///         Routes          ///
///////////////////////////////

// we're going to build a seed route
// this will seed the database for us with a few starter resources
// There are two ways we will talk about seeding the database
// First -> seed route, they work but they are not best practices
// Second -> seed script
router.get('/seed', (req, res) => {
    // array of starter resources(fruits)
    const startFruits = [
        {name: 'Orange', color: 'orange', readyToEat: true},
        {name: 'Grape', color: 'purple', readyToEat: true},
        {name: 'Banana', color: 'green', readyToEat: false},
        {name: 'Apple', color: 'pink', readyToEat: true},
        {name: 'Lemon', color: 'yellow', readyToEat: false}
    ]

    // then we delete every fruit in the database (all instances of this resource)
    Fruit.deleteMany({})
        .then(() =>{
            // then we'll seed (create) our starter fruits
            Fruit.create(startFruits)
                // tell our db what to do with success and failures
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occurred: \n', err))
        })  
})

// INDEX route
// Read -> finds and displays all fruits
router.get('', (req, res) => {
    //find dem fruits
    Fruit.find({})
        //send json if successful
        .then(fruits => { res.json({ fruits: fruits })})
        .catch(err => console.log('The following error occurred: \n', err))
})

// CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('', (req,res) => {
    // here qwe have request body which creates a new document in the database
    const newFruit = req.body
    Fruit.create(newFruit)
        .then(fruit => {
            res.status(201).json({fruit: fruit.toObject() })
        })
        .catch(err => console.log('The following error occurred: \n', err))
})

// PUT route
// Update -> updates a specific fruit
// PUT replaces entire document with a new document from the req.body
// PATCH updates specific fields at specific times, but it requires a little more code to ensure that it works properly, so we'll use that later
router.put('/:id', (req,res) => {
    //save id to a variable for easy use later
    const id = req.params.id
    //save req body to a variable for easy use later
    const updatedFruit = req.body
    Fruit.findByIdAndUpdate(id,updatedFruit, { new: true })
        .then(fruit => {
            console.log('the newly updated fruit', fruit)
            res.sendStatus(204)
        })
        .catch(err => console.log('The following error occurred: \n', err))
})

// DELETE route
// Delete -> delete a specific fruit
router.delete('/:id', (req,res) => {
    const id = req.params.id
    //find and delete the fruit
    Fruit.findByIdAndRemove(id)
        .then(fruit => {
            res.sendStatus(204)
        })
        .catch(err => console.log('The following error occurred: \n', err))
})
// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req,res) => {
    //get id -> save to a variable
    const id = req.params.id
    //use mongoose method to find using that id
    Fruit.findById(id)
        // send the fruit as json upon success
        .then(fruit => {
            res.json({fruit: fruit})
        })
        // catch errors
        .catch(err => console.log('The following error occurred: \n', err))
})




///////////////////////////////
///       Export Router     ///
///////////////////////////////
module.exports = router