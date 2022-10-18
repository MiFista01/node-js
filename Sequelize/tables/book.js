const db = require('../connection/database')
const {Sequelize} = require('sequelize')

const Book = db.define('book',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    },
    isbn: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false
    },
    page_count: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false
    },
    published_date:{
        type: Sequelize.DATE,
        allowNull: false,
        allowNull: false
    },
    thumnbnail_URL:{
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false
    },
    short_description:{
        type: Sequelize.STRING,
        allowNull: false,
        allowNull: false
    }
    ,
    long_description:{
        type: Sequelize.STRING,
        allowNull: false,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
        allowNull: false
    }
},{
    timestamps: false
})
module.exports = Book