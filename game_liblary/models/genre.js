const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Genre extends Model{}
Genre.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    }
},{ sequelize:db,
    paranoid: true,
    deletedAt: 'destroyTime',
    modelName: 'genres'
})
module.exports = Genre