const models = require('../models')
const Funs = require('../Fun')
const key = require("../config/key");

exports.datalists = async function(req,res){
    let genres = await models.genre.findAll()
    let platforms = await models.platform.findAll()
    res.send({genres:genres, platforms:platforms})
}
exports.drop_gen_plat = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && (user.role == 2 || user.role == 3)){
        if(req.body.obj == "genre"){
            models.genre.destroy({where:{id:req.body.index}})
            res.send({status:1})
        }
        if(req.body.obj == "platform"){Funs.isIterable
            models.platform.destroy({where:{id:req.body.index}})
            res.send({status:1})
        }
    }else{
        res.send({status:0})
    }
}
exports.drop_game = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && (user.role == 2 || user.role == 3)){
        models.game.destroy({where:req.body})
        res.send({status:1})
    }else{
        res.send({status:0})
    }
 }
exports.updater = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && (user.role == 2 || user.role == 3)){
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
            // try {
                let game = await models.game.findOne({where:{id:req.body.id}})
                game.update(req.body.prime)
                let old_genres = await models.gameGenre.findAll({where:{id_game:req.body.id}})
                if(Funs.isIterable(req.body.genres)){
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
                                old_genres = Funs.arrayRemove(old_genres,genre.id,"id_genre")
                            }
                        }
                    }
                }
                for(let i of old_genres){
                    models.gameGenre.destroy({where:{id_genre:i.id_genre}})
                }
                let old_platforms = await models.gamePlatform.findAll({where:{id_game:req.body.id}})
                if(Funs.isIterable(req.body.platforms)){
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
                                old_platforms = Funs.arrayRemove(old_platforms,platform.id,"id_platform")
                            }
                        }
                    }
                }
                for(let i of old_platforms){
                    models.gamePlatform.destroy({where:{id_platform:i.id_platform}})
                }
                res.send({status:1})
            // } catch (error) {
            //     res.send({status:0})
            // }
            
        }
    }else{
        res.send({status:0});
    }
 }
exports.search_game = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    let games_id = []
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
    if(Funs.isIterable(genre)){
        genres.forEach(element => {
            id_genres.push(element.id)
        });
    }
    if(Funs.isIterable(platforms)){
        platforms.forEach(element => {
            id_platforms.push(element.id)
        });
    }
    if(id_genres.length > 0 && Funs.isIterable(id_genres)){
        for(let i of id_genres){
            let game_genre = await models.gameGenre.findAll({attributes: ['id_game'],where:{id_genre:i}})
            for(let j of game_genre){
                if(!id_game_genre.includes(j.id_game)){
                    id_game_genre.push(j.id_game)
                }
            }
        }
    }
    if(id_platforms.length > 0 && Funs.isIterable(id_platforms)){
        for(let i of id_platforms){
            let game_platform = await models.gamePlatform.findAll({attributes: ['id_game'],where:{id_platform:i}})
            for(let j of game_platform){
                if(!id_game_platform.includes(j.id_game)){
                    id_game_platform.push(j.id_game)
                }
            }
        }
    }
    if((Funs.isIterable(id_game_genre) && id_game_genre.length>0) && (Funs.isIterable(id_game_platform) && id_game_platform.length>0)){
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
        games_id.push(i.id)
    }
    res.cookie("games_id", games_id, { maxAge: key.lifeAge })
    res.send({status: 1, size:games_id.length})
    
 }
exports.get_game = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    if(req.cookies.games_id[req.body.index] != undefined){
        let game = await models.game.findOne({where:{id:req.cookies.games_id[req.body.index]}, paranoid: false})
        let buf = Buffer.from(game.img) 
        game.img =  buf.toString("utf8")
        if(req.body.page == "search"){
            res.render('partials/search_render', {games:[game], user})
        }
        if(req.body.page == "trash"){
            res.render('partials/trash_render', {trash_games:[game], user})
        }
    }else{
        res.send({status:0})
    }
 }
exports.restore = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && (user.role == 2 || user.role == 3)){
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
    }else{
        res.send({status:0})
    }
 }
exports.full_delete = async function(req,res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && (user.role == 2 || user.role == 3)){
        if(req.body.obj == "game"){
            await models.gameGenre.destroy({where:{id_game:req.body.index}})
            await models.gamePlatform.destroy({where:{id_game:req.body.index}})
            await models.game.destroy({where:{id:req.body.index},force:true})
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
    }else{
        res.send({status:0})
    }
 }
exports.news = async function(req,res){ 
    let user = await Funs.checkUser(req.cookies.token);
    let keywords = await models.key_worlds.findAll({attributes:["text"]})
    res.send({keywords, user})
 }
exports.news_search = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let all_news = []
    let news = await models.news.findAll({where:{title:{[models.Op.substring]:req.body.name}}})
    if(Funs.isIterable(news)){
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
    if(Funs.isIterable(keys)){
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
    res.render('partials/news_render',{NewsKeys:arrayUniqueByKey, user})
}
exports.news_delete = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && (user.role == 2 || user.role == 3)){
        let news = await models.news.findOne({where:{id:req.body.id}})
        let news_keys = await models.news_keyworld.findAll({where:{id_news:news.id}})
        for(let i of news_keys) {
            await i.destroy()
        }
        news.destroy()
        res.send({status:1}) 
    }else{
        res.send({status:0})
    }
}
exports.manage_fav = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let fav = await models.favourites.findOne({where:{userId:user.id, gameId:req.body.id}})
    if(fav!=null){
        fav.destroy();
    }else{
        await models.favourites.create({userId:user.id, gameId:req.body.id}) 
    }
}
exports.getRating = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let ratings = await models.ratings.findAll({where:{gameId:req.body.id}})
    let rating = 0
    if(ratings.length != 0){
        for(let i of ratings){
            rating += i.raiting
        }
        rating /= ratings.length
        rating = Math.ceil(rating * 10) / 10;
    }
    let rate = await models.ratings.findOne({where:{gameId:req.body.id}});
    res.send({rating, userRate:rate})
}
exports.setRating = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let rating = await models.ratings.findOne({where:{userId:user.id,gameId:req.body.game}});
    if(rating == null){
        await models.ratings.create({userId:user.id,gameId:req.body.game, raiting: req.body.rate});
    }else{
        await rating.update({raiting: req.body.rate});
    }
    let ratings = await models.ratings.findAll({where:{gameId:req.body.game}});
    rating = 0
    if(ratings.length != 0){
        for(let i of ratings){
            rating += i.raiting
        }
        rating /= ratings.length
        rating = Math.ceil(rating * 10) / 10;
    }
    res.send({rating})
}
exports.manageComment = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user){
        let comment  = await models.comments.findOne({where:{userId:user.id, gameId:req.body.game}});
        if(comment == null){
            await models.comments.create({userId:user.id, gameId:req.cookies.game, comments:req.body.comment});
        }else{
            await comment.update({comments:req.body.comment})
        }
        res.send({status:1})
    }else{
        res.redirect("/")
    }
}