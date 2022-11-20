const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("book","root","",{host: "localhost", dialect:"mysql"})
module.exports = sequelize