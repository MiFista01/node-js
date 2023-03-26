const models = require('../models')
const Func = require('../Fun')

exports.create_game =  async function(req, res){
    try {
        let game_data = JSON.parse(JSON.stringify(req.body))
        delete game_data.genres
        delete game_data.platforms 
        let game = await models.game.create(game_data)
        if(Func.isIterable(req.body.genres)){
            for(let i of req.body.genres){
                let genre = await models.genre.findOrCreate({where:{name:i}})
                models.gameGenre.findOrCreate({where:{id_game:game.id,id_genre:genre[0].id}})
            }
        }
        
        if(Func.isIterable(req.body.platforms)){
            for(let i of req.body.platforms){
                let platform = await models.platform.findOrCreate({where:{name:i}})
                models.gamePlatform.findOrCreate({where:{id_game:game.id,id_platform:platform[0].id}})
            }
        }
        
        res.send({status:1})
    } catch (error) {
        res.send({status:0})
    }
   
}
exports.create_news = async function(req, res){
    try {
        let news_data = JSON.parse(JSON.stringify(req.body))
        delete news_data.worlds
        let news = await models.news.create(news_data)
        if (req.body.worlds.length != 0){
            for(i of req.body.worlds){
                let keyworld = await models.key_worlds.findOrCreate({where: { text: i }, defaults: {text: i}})
                console.log(keyworld[0].id)
                let news_world = await models.news_keyworld.findOrCreate({where: {id_news: news.id, id_keyworld: keyworld[0].id}, defaults: {id_news: news.id, id_keyworld: keyworld[0].id}})
            }
        }
        res.send({status:1})
    } catch (error) {
        res.send({status:0})
    }
   
}
exports.create_genre =  async function(req, res){
    try {
        let [genre, created] = await models.genre.findOrCreate({where:req.body})
        res.send({status:1, id:genre.id, created: created})
        
    } catch (error) {
        res.send({status:0})
    }
   
}
exports.create_platform = async function(req, res){
    try {
        let [platform,created] = await models.platform.findOrCreate({where:req.body})
        res.send({status:1, id:platform.id,created:created})
    } catch (error) {
        res.send({status:0})
    }
   
}