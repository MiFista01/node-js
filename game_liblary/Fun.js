const jwt = require("jsonwebtoken");
var fs = require('fs');
const key = require("./config/key");
const models = require("./models")
var bcrypt = require('bcrypt');

exports.isIterable = function(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
exports.arrayRemove = function (arr, value, key) { 
    return arr.filter(function(elem){ 
        return elem[key] != value; 
    });
}

exports.checkUser = async function(token){
    return jwt.verify(token,key.secretKey, async(err, decoded) => {
        if (err) {
            return false;
        }else{
            let user = await models.user.findOne({where:{id:decoded.id}});
            return user;
        }
    })
}
exports.checkHash = async function(obj,value){
    let objects = await models[obj].findAll({where:{id:value}});
    let result;
    for(let i of objects){
        let hash = bcrypt.hash(i.id);
        if(hash === value){
            if(result == undefined){
                result == i.id
            }else{
                result == false
            }
        }
    }
}
exports.checkFav = async function(games, userId){
    let rawGames = games
    for (let i of rawGames){
        let favourites = await models.favourites.findOne({where:{userId:userId, gameId:i.id}})
        if(favourites != null){
            i.fav = true;
        }else{
            i.fav = false;
        }
    }
    return rawGames;
}