const express = require('express');
const app = express();
const db = require('config');

app.get('/', (req, res) => {
    db.query("SELECT * FROM category", function (err, results) {
        if (err) throw err;
        return res.render
    })
})