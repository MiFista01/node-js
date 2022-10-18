const db_config = require("./database_config");

const mysql = require('mysql2');

const connection = mysql.createPool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
});

module.exports = connection;