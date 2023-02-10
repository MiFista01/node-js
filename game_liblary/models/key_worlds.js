const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class KeyWords extends Model{}
KeyWords.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'keywords'
})
module.exports = KeyWords