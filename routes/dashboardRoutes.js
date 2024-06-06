
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    const username = req.query.username; 
    if (username) {
        res.render('dashboard', { user: { name: username } });
    } else {
        res.send("You must be logged in to view this page.");
    }
});

module.exports = router;
