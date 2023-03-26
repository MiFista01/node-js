const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Favourites extends Model{}
Favourites.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        references:{
            model: "users",
            key:"id"
        }
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "games",
            key:"id"
        }
    }
},
{
    sequelize:db,
    timestamps:false,
    modelName: 'favourites'
})
module.exports = Favourites