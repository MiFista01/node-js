const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Raitings extends Model{}
Raitings.init({
    userId: {
        type: DataTypes.INTEGER,

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
    },
    raiting: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize:db,
    timestamps:false,
    modelName: 'raitings'
})
module.exports = Raitings