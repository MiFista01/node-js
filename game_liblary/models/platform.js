const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Platform extends Model{}
Platform.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        fields: "id"
    },
    name: {
        type: DataTypes.STRING
    }
},{
    sequelize:db,
    paranoid: true,
    deletedAt: 'destroyTime',
    modelName: 'platform'
})
module.exports = Platform