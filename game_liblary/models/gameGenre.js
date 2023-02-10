const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class GameGenre extends Model{}
GameGenre.init({
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
    id_genre: {
        type: DataTypes.INTEGER,
        references:{
            model: "genres",
            key:"id"
        }
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'game_genre'
})
module.exports = GameGenre