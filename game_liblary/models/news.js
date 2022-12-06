const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class News extends Model{}
News.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        fields: "id"
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
    paranoid: true,
    deletedAt: 'destroyTime',
    modelName: 'news'
})
module.exports = News