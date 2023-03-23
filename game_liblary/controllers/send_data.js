const models = require('../models')
const Func = require('../Fun')

exports.datalists = async function(req,res){
    let genres = await models.genre.findAll()
    let platforms = await models.platform.findAll()
    res.send({genres:genres, platforms:platforms})
}
exports.drop_gen_plat = async function(req,res){
    if(req.body.obj == "genre"){
        models.genre.destroy({where:{id:req.body.index}})
        res.send({status:1})
    }
    if(req.body.obj == "platform"){Func.isIterable
        models.platform.destroy({where:{id:req.body.index}})
        res.send({status:1})
    }
}
exports.drop_game = async function(req,res){
    models.game.destroy({where:req.body})
    res.send({status:1})
 }
exports.updater = async function(req,res){
    if(req.body.obj == "genre"){
        try {
            models.genre.update({name:req.body.value},{where:{id:req.body.id}})
            res.send({status:1})
        } catch (error) {
            res.send({status:0})
        }
        
    }
    if(req.body.obj == "platform"){
        try {
            models.platform.update({name:req.body.value},{where:{id:req.body.id}})
            res.send({status:1})
        } catch (error) {
            res.send({status:0})
        }
        
    }
    if(req.body.obj == "game"){
        try {
            console.log("A")
            let game = await models.game.findOne({where:{id:req.body.id}})
            if(req.body.prime != undefined){
                for(let i in req.body.prime){
                    if(game[i] != req.body.prime[i]){
                        game[i] = req.body.prime[i]
                    }
                }
                game.save()
            }
            let old_genres = await models.gameGenre.findAll({where:{id_game:req.body.id}})
            if(Func.isIterable(req.body.genres)){
                for(let i of req.body.genres){
                    let genre = await models.genre.findOne({where:{name:i}})
                    if (genre == null){
                        let new_genre = await models.genre.create({name:i})
                        let new_game_genre = await models.gameGenre.create({id_game:req.body.id, id_genre:new_genre.id})
                    }else{
                        let game_genre = await models.gameGenre.findOne({where:{id_game:req.body.id, id_genre:genre.id}})
                        if(game_genre == null){
                            models.gameGenre.create({id_game:req.body.id, id_genre:genre.id})
                        }else{
                            old_genres = Func.arrayRemove(old_genres,genre.id,"id_genre")
                        }
                    }
                }
            }
            for(let i of old_genres){
                models.gameGenre.destroy({where:{id_genre:i.id_genre}})
            }
            let old_platforms = await models.gamePlatform.findAll({where:{id_game:req.body.id}})
            if(Func.isIterable(req.body.platforms)){
                for(let i of req.body.platforms){
                    let platform = await models.platform.findOne({where:{name:i}})
                    if (platform == null){
                        let new_platform = await models.platform.create({name:i})
                        let new_game_platform = await models.gamePlatform.create({id_game:req.body.id, id_platform:new_platform.id})
                    }else{
                        let game_platform = await models.gamePlatform.findOne({where:{id_game:req.body.id, id_platform:platform.id}})
                        if(game_platform == null){
                            models.gamePlatform.create({id_game:req.body.id, id_platform:platform.id})
                        }else{
                            old_platforms = Func.arrayRemove(old_platforms,platform.id,"id_platform")
                        }
                    }
                }
            }
            for(let i of old_platforms){
                models.gamePlatform.destroy({where:{id_platform:i.id_platform}})
            }
            res.send({status:1})
        } catch (error) {
            res.send({status:0})
        }
        
    }
 }
 var data_games = []
exports.search_game = async function(req,res){
    data_games = []
    let id_genres = []
    let id_platforms = []
    let genre = req.body.genre
    let platform = req.body.platform
    if(req.body.genre = undefined){
        genre = ""
    }
    if(req.body.platform = undefined){
        platform = "" 
    }
    let genres = await models.genre.findAll({attributes: ['id'], where:{name:{[models.Op.substring]: genre}}})
    let platforms = await models.platform.findAll({attributes: ['id'], where:{name:{[models.Op.substring]: platform}}})
    let id_game_genre = []
    let id_game_platform = []
    let id_games = []
    if(Func.isIterable(genre)){
        genres.forEach(element => {
            id_genres.push(element.id)
        });
    }
    if(Func.isIterable(platforms)){
        platforms.forEach(element => {
            id_platforms.push(element.id)
        });
    }
    if(id_genres.length > 0 && Func.isIterable(id_genres)){
        for(let i of id_genres){
            let game_genre = await models.gameGenre.findAll({attributes: ['id_game'],where:{id_genre:i}})
            for(let j of game_genre){
                if(!id_game_genre.includes(j.id_game)){
                    id_game_genre.push(j.id_game)
                }
            }
        }
    }
    if(id_platforms.length > 0 && Func.isIterable(id_platforms)){
        for(let i of id_platforms){
            let game_platform = await models.gamePlatform.findAll({attributes: ['id_game'],where:{id_platform:i}})
            for(let j of game_platform){
                if(!id_game_platform.includes(j.id_game)){
                    id_game_platform.push(j.id_game)
                }
            }
        }
    }
    if((Func.isIterable(id_game_genre) && id_game_genre.length>0) && (Func.isIterable(id_game_platform) && id_game_platform.length>0)){
        for(let i of id_game_genre){
            for(let j of id_game_platform){
                if(i == j && !id_games.includes(i)){
                    id_games.push(i)
                }
            }
        }
    }else{
        for(let i of id_game_genre){
            if( !id_games.includes(i)){
                id_games.push(i)
            }
        }
        for(let i of id_game_platform){
            if( !id_games.includes(i)){
                id_games.push(i)
            }
        }
    }
    if(req.body.title == undefined){
        req.body.title = ""
    }
    if(req.body.issuer == undefined){
        req.body.issuer = ""
    }
    if(req.body.developer == undefined){
        req.body.developer = ""
    }
    let data_find = {where:{ 
        title:{[models.Op.substring]: req.body.title},
        issuer:{[models.Op.substring]: req.body.issuer},
        developer:{[models.Op.substring]: req.body.developer}},
        order:[["id",req.body.asc_desc]]}
    if(req.body.page != undefined && req.body.page == "trash"){
        data_find.where.destroyTime = {[models.Op.not]:null}
        data_find.paranoid = false
    }
    if(id_games.length >0){
        data_find.where.id = id_games
    }
    let games = await models.game.findAll(data_find)
    for(let i of games){
        let game = {}
        let prime = i
        let game_genre = await models.gameGenre.findAll({where:{id_game:i.id}})
        let genres = []
        for(let j of game_genre){
            let genre = await models.genre.findOne({where:{id:j.id_genre}})
            genres.push(genre.name)
        }
        let game_platforms = await models.gamePlatform.findAll({where:{id_game:i.id}})
        let platforms = []
        for(let j of game_platforms){
            let platfrom = await models.platform.findOne({where:{id:j.id_platform}})
            platforms.push(platfrom.name)
        }
        game.prime = prime
        game.genres = genres
        game.platforms = platforms
        data_games.push(game)
    }
    res.send({status: 1, size:data_games.length})
 }
exports.get_game = async function(req,res){
    if(data_games[req.body.index] != undefined){
        let game = data_games[req.body.index]
        let buf = Buffer.from(game.prime.img)
        game.prime.img =  buf.toString("utf8")
        if(req.body.page == "search"){
            res.render('partials/search_render', {games:[game], read:false})
        }
        if(req.body.page == "trash"){
            res.render('partials/trash_render', {deleted_games:[game], read:false})
        }
    }else{
        res.send({status:0})
    }
   
 }
exports.restore = async function(req,res){
    if(req.body.obj == "game"){
        models.game.restore({where:{id:req.body.index}})
        res.send({status:1})
    }
    if(req.body.obj == "genre"){
        models.genre.restore({where:{id:req.body.index}})
        res.send({status:1})
    }
    if(req.body.obj == "platform"){
        models.platform.restore({where:{id:req.body.index}})
        res.send({status:1})
    }
 }
exports.full_delete = async function(req,res){
    if(req.body.obj == "game"){
        await models.gameGenre.destroy({where:{id_game:req.body.index}}); 
        await models.gamePlatform.destroy({where:{id_game:req.body.index}});
        await models.game.destroy({where:{id:req.body.index},force:true});
        res.send({status:1})
    }
    if(req.body.obj == "genre"){
        await models.gameGenre.destroy({where:{id_genre:req.body.index}})
        await models.genre.destroy({where:{id:req.body.index},force:true})
        res.send({status:1})
    }
    if(req.body.obj == "platform"){
        await models.gamePlatform.destroy({where:{id_platform:req.body.index}})
        await models.platform.destroy({where:{id:req.body.index},force:true})
        res.send({status:1})
    }
 }
exports.news = async function(req,res){ 
    let keywords = await models.key_worlds.findAll({attributes:["text"]})
    res.send({keywords: keywords})
 }
exports.news_search = async function(req, res){
    let all_news = []
    let news = await models.news.findAll({where:{title:{[models.Op.substring]:req.body.name}}})
    if(Func.isIterable(news)){
        for(let i of news){
            let news_key = await models.news_keyworld.findAll({where:{id_news:i.id}})
            let keys = []
            if(news_key != null){
                for (let j of news_key){
                    let key =  await models.key_worlds.findOne({where:{id:j.id_keyworld}})
                    keys.push(key.text)
                }
            }
            i.dataValues.keys = keys
            all_news.push(i.dataValues)
        }
    }
    let keys = await models.key_worlds.findAll({where:{text:{[models.Op.substring]:req.body.name}}})
    if(Func.isIterable(keys)){
        let keys_id = []
        for(let i of keys){
            keys_id.push(i.id)
        }
        let news_keys = await models.news_keyworld.findAll({where:{id_keyworld:keys_id}})
        let news_keys_id = []
        for(let i of news_keys){
            news_keys_id.push(i.id_news)
        }
        let newsKeys = await models.news.findAll({where:{id:news_keys_id}})
        for(let i of newsKeys){
            let news_key = await models.news_keyworld.findAll({where:{id_news:i.id}})
            let keys = []
            if(news_key != null){
                for (let j of news_key){
                    let key =  await models.key_worlds.findOne({where:{id:j.id_keyworld}})
                    keys.push(key.text)
                }
            }
            i.dataValues.keys = keys
            all_news.push(i.dataValues)
        }
    }
    const arrayUniqueByKey = [...new Map(all_news.map(item =>
        [item.id, item])).values()];
    res.render('pages/news_render',{NewsKeys:arrayUniqueByKey})
}
exports.news_delete = async function(req, res){
    let news = await models.news.findOne({where:{id:req.body.id}})
    let news_keys = await models.news_keyworld.findAll({where:{id_news:news.id}})
    for(let i of news_keys) {
        i.destroy()
    }
    news.destroy()
    res.send({status:1}) 
}