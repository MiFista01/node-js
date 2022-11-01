const db = require('../connection/database')
const {Sequelize} = require('sequelize')

const BookAuthor = db.define('book_author',{
    id_book: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{model: 'books',
                    key:"id"}
    },
    id_author: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{model: 'authors',
                    key:"id"},
        primaryKey: true
    }
},{
    timestamps: false
})
module.exports = BookAuthor