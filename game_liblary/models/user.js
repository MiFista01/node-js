const db = require('../connection/database')
const {DataTypes, Model} =  require('sequelize')
class User extends Model{}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING
    },
    salt:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING,
        defaultValue: 1
    },
    img:{
        type: DataTypes.TEXT
    }
},
{
    sequelize:db,
    timestamps:false,
    modelName: 'users'
})
module.exports = User