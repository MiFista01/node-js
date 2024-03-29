const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class GamePlatforms extends Model{}
GamePlatforms.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_game: {
        type: DataTypes.INTEGER,
        references:{
            model: "games",
            key:"id"
        }
    },
    id_platform: {
        type: DataTypes.INTEGER,
        references:{
            model: "platforms",
            key:"id"
        }
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'game_platform'
})
module.exports = GamePlatforms