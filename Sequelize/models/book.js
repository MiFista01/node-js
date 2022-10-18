const db = require('../connection/database')
const {DataTypes, Model} = require('sequelize')

class Book extends Model {}
Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false
    },
    isbn: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        allowNull: false
    },
    page_count: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        allowNull: false
    },
    published_date:{
        type: DataTypes.DATE,
        allowNull: false,
        allowNull: false
    },
    thumnbnail_URL:{
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false
    },
    short_description:{
        type: DataTypes.STRING,
        allowNull: false,
        allowNull: false
    }
    ,
    long_description:{
        type: DataTypes.STRING,
        allowNull: false,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        allowNull: false
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'book'
})
module.exports = Book