const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class User extends Model{}
User.init({
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
    email: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING,
    },
    salt:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
    }
},{
    sequelize:db,
    timestamps: false,
    modelName: 'user'
})
module.exports = User