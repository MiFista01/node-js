const express = require('express')
const app = express()
const db_config = require("database_config.js");
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
})
connection.connect(error =>{
    if (error) throw error;
    console.log("success")
})
module.exports = connection