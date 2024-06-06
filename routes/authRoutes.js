// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'personalBudgetTracker';


router.get('/login', (req, res) => {
  res.render('login');  
});

router.post('/login', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('users');
        const { username, password } = req.body;
        const user = await collection.findOne({ username: username, password: password });

        if (user) {
            res.redirect('/dashboard?username=' + encodeURIComponent(user.username));
        } else {
            res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send("Internal server error");
    } finally {
        await client.close();
    }
});

module.exports = router;
