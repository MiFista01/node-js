const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class GamePlatforms extends Model{}
GamePlatforms.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        fields: "id"
    },
    id_game: {
        type: DataTypes.INTEGER
    },
    id_platform: {
        type: DataTypes.INTEGER
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'game_platform'
})
module.exports = GamePlatforms