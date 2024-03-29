const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Game extends Model{}
Game.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    published_date:{
        type: DataTypes.DATEONLY,
    },
    issuer:{
        type: DataTypes.STRING
    },
    developer:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    },
    img:{
        type: DataTypes.BLOB('long')
    }
},
{
    sequelize:db,
    paranoid: true,
    deletedAt: 'destroyTime',
    modelName: 'games'
})
module.exports = Game