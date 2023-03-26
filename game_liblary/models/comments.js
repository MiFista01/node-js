const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class Comments extends Model{}
Comments.init({
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
    comments: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
{
    sequelize:db,
    modelName: 'comments'
})
module.exports = Comments