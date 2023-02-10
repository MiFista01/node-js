const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class NewsGamePlatforms extends Model{}
NewsGamePlatforms.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_news: {
        type: DataTypes.INTEGER,
        references:{
            model: "news",
            key:"id"
        }
    },
    id_keyworld: {
        type: DataTypes.INTEGER,
        references:{
            model: "keywords",
            key:"id"
        }
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'news_keywordls'
})
module.exports = NewsGamePlatforms