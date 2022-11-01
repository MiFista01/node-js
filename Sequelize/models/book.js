const db = require('../connection/database')
const {DataTypes, Model} = require('sequelize')

class Book extends Model {}
Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        fields: "id"
    },
    title: {
        type: DataTypes.STRING,
        autoIncrement: false,
    },
    isbn: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
    },
    page_count: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
    },
    published_date:{
        type: DataTypes.DATE,
    },
    thumnbnail_URL:{
        type: DataTypes.STRING,
    },
    short_description:{
        type: DataTypes.STRING,
    }
    ,
    long_description:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'book'
})
module.exports = Book