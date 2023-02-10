const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class News extends Model{}
News.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT
    },
    text: {
        type: DataTypes.TEXT
    },
    link: {
        type: DataTypes.TEXT
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'news'
})
module.exports = News