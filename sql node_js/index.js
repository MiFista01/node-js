const express = require('express');
const app = express();
const db = require('./config/connect');
app.use(express.json());
app.get('/actors/:id', function(req, res){
    db.query('SELECT * FROM actor WHERE actor_id = ?', req.params.id,  (err, result) =>{
        if (err) console.error(err)
        else res.send({result})
    });
});
app.put('/actors/:id', function(req, res){
    db.query('UPDATE actor SET ? WHERE actor_id = ?', [req.body,req.params.id],  (err, result) =>{
        if (err) console.error(err)
        res.status(200).send("Actor with ${req.params.id} updated")
    });
});
app.post('/actors', function(req, res){
    db.query('INSERT INTO actor SET ?', req.body,  (err, result) =>{
        if (err) console.error(err)
        res.status(201).send("Actor with ${req.params.id} updated")
    });
});
app.delete('/actors/:id', function(req, res){
    db.query('DELETE FROM actor WHERE actor_id = ?', req.params.id,  (err, result) =>{
        if (err) console.error(err)
        res.status(200).send("Actor deleted")
    });
});

app.listen(3000)
