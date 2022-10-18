const db = require('../connection/database')
const {Sequelize} = require('sequelize')

const Category = db.define('categories',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category_name: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    }
},{
    timestamps: false
})
module.exports = Category