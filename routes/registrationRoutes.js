
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'personalBudgetTracker';


router.get('/register', (req, res) => {
    res.render('register');  
});

const User = require('../models/User'); 

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.createUser({ username, email, password });
        res.redirect('/login'); 
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(400).send(error.message);
    }
});

module.exports = router;

