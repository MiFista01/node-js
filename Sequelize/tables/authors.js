const db = require('../connection/database')
const {Sequelize} = require('sequelize')

const Author = db.define('authors',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    authors_name: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    },
    authors_last_name: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    }
},{
    timestamps: false
})
module.exports = Author