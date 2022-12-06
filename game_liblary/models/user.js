const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Game extends Model{}
Game.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        fields: "id"
    },
    name: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.DATE,
    },
    issuer:{
        type: DataTypes.STRING
    },
    developer:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    img:{
        type: DataTypes.BLOB("long")
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'game'
})