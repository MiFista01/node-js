const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("games","root","",{host: "localhost", dialect:"mysql"})
module.exports = sequelize