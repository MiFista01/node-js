const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class GameGenre extends Model{}
GameGenre.init({
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
    id_genre: {
        type: DataTypes.INTEGER
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'game_genre'
})
module.exports = GameGenre