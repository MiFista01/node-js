const db = require('../connection/database')
const {DataTypes, Model} = require('sequelize')

class Category extends Model {}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        fields: "id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'category'
})
module.exports = Category