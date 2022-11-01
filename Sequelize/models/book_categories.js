const db = require('../connection/database')
const {Sequelize} = require('sequelize')

const BookCategories = db.define('book_categories',{
    id_book: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'books',
                    key:"id"},
    },
    id_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'categories',
                    key:"id"},
    }
},{
    timestamps: false
})
module.exports = BookCategories