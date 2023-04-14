const models = require('../models')
const Funs = require('../Fun')
const user_storage = require("../index")
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const key = require("../config/key");
exports.createrGame = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && user.role == 3){
        let game_data = JSON.parse(JSON.stringify(req.body))
        delete game_data.genres;
        delete game_data.platforms;
        let game = await models.game.create(game_data) 
        if(Funs.isIterable(req.body.genres)){
            for(let i of req.body.genres){
                let genre = await models.genre.findOrCreate({where:{name:i}})
                await models.gameGenre.findOrCreate({where:{id_game:game.id,id_genre:genre[0].id}})
            }
        }
        
        if(Funs.isIterable(req.body.platforms)){
            for(let i of req.body.platforms){
                let platform = await models.platform.findOrCreate({where:{name:i}})
                await models.gamePlatform.findOrCreate({where:{id_game:game.id,id_platform:platform[0].id}})
            }
        }
        
        res.send({status:1})
    }else{
        res.send({status:0})
    }
}
exports.createrNews = async function(req, res){ 
    try {
        let user = await Funs.checkUser(req.cookies.token);
        if(user && user.role == 3){
            let news_data = JSON.parse(JSON.stringify(req.body))
            delete news_data.worlds
            let news = await models.news.create(news_data)
            if (req.body.worlds.length != 0){
                for(i of req.body.worlds){
                    let keyworld = await models.key_worlds.findOrCreate({where: { text: i }, defaults: {text: i}})
                    let news_world = await models.news_keyworld.findOrCreate({where: {id_news: news.id, id_keyworld: keyworld[0].id}, defaults: {id_news: news.id, id_keyworld: keyworld[0].id}})
                }
            }
            res.send({status:1})
        }else{
            res.send({status:0})
        }
    } catch (error) {
        res.send({status:0})
    }
}
exports.createrGenre = async function(req, res){
    try {
        let user = await Funs.checkUser(req.cookies.token);
        if(user && user.role == 3){
            let [genre, created] = await models.genre.findOrCreate({where:req.body})
            res.send({status:1, id:genre.id, created: created})
        }else{
            res.send({status:0})
        }
    } catch (error) {
        res.send({status:0})
    }
   
}
exports.createrPlatform = async function(req, res){
    try {
        let user = await Funs.checkUser(req.cookies.token);
        if(user && user.role == 3){
            let [platform,created] = await models.platform.findOrCreate({where:req.body})
            res.send({status:1, id:platform.id,created:created})
        }else{
            res.send({status:0})
        }
    } catch (error) {
        res.send({status:0})
    }
   
}
