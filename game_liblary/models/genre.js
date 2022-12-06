const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Genre extends Model{}
Genre.init({
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
},{ modelName: 'genre',
    sequelize:db,
    paranoid: true,
    deletedAt: 'destroyTime'
})
module.exports = Genre