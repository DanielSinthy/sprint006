const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'personalBudgetTracker';

router.get('/transactions', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('transactions');
        const transactions = await collection.find({}).toArray();
        res.render('transactions', { transactions });
    } finally {
        await client.close();
    }
});

router.post('/transactions', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('transactions');
        await collection.insertOne(req.body);
        res.redirect('/transactions');
    } finally {
        await client.close();
    }
});

module.exports = router;