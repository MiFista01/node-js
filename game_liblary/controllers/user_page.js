const models = require('../models')
const Funs = require('../Fun')
const key = require("../config/key");

exports.game = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let game = await models.game.findOne({where:{id:req.params.id}})
    let genres = []
    let game_genre = await models.gameGenre.findAll({where:{id_game:req.params.id}})
    for(let i of game_genre){
        let genre = await models.genre.findOne({where:{id:i.id_genre}})
        if (genre != null){
            genres.push(genre)
        }
    }
    let game_platform = await models.gamePlatform.findAll({where:{id_game:req.params.id}});
    let platforms = []
    for(let i of game_platform){
        let platform = await models.platform.findOne({where:{id:i.id_platform}});
        if (platform != null){
            platforms.push(platform);
        }
    }
    let comments;

    if(user){
        comments = await models.comments.findAll({attributes: ["comments","userId",
            [models.sequelize.fn('date_format', models.sequelize.col('createdAt'), '%Y/%i/%d %H:%i'), 'create'],
            [models.sequelize.fn('date_format', models.sequelize.col('updatedAt'), '%Y/%i/%d %H:%i'), 'update']],
            where:{gameId:req.params.id, userid:{[models.Op.ne]:user.id}}
        });
        // try {
            for(let i of comments){
                let commentUser = await models.user.findOne({attributes:["id","username","img"], where:{id:i.userId}})
                i.user = commentUser;
            }
        // } catch (error) {
            
        // }
        
        let comment = await models.comments.findOne({attributes: ["comments","userId",
            [models.sequelize.fn('date_format', models.sequelize.col('createdAt'), '%Y/%i/%d %H:%i'), 'create'],
            [models.sequelize.fn('date_format', models.sequelize.col('updatedAt'), '%Y/%i/%d %H:%i'), 'update']],
            where:{userId:user.id,gameId:req.params.id}});
            
        res.cookie("game", req.params.id, { maxAge: key.lifeAge })
        if(user.role == 3 || user.role == 2){
            let all_genres = await models.genre.findAll({attributes: ['name']});
            let all_platforms = await models.platform.findAll({attributes: ['name']});
            let all_issuers = await models.game.findAll({attributes: ['issuer'],distinct: 'issuer'});
            let all_developers = await models.game.findAll({attributes: ['developer'],distinct: 'Developer'});
            res.render('pages/game',{user, prime:game, comment, comments,  genres, platforms, all_genres, all_platforms, all_issuers, all_developers});
        }else{
            console.log(comment)
            res.render('pages/game',{user, prime:game, comment, comments, genres, platforms})
        }
    }else{
        comments = await models.comments.findAll({attributes: ["comments","userId",
            [models.sequelize.fn('date_format', models.sequelize.col('createdAt'), '%Y/%i/%d %H:%i'), 'create'],
            [models.sequelize.fn('date_format', models.sequelize.col('updatedAt'), '%Y/%i/%d %H:%i'), 'update']],
            where:{gameId:req.params.id}
        });
        try {
            for(let i of comments){
                let commentUser = await models.user.findOne({attributes:["id","username","img"],where:{id:i.userId}})
                i.user = commentUser;
            }
        } catch (error) {
            
        }
        res.render('pages/game',{user,prime:game, comments, genres, platforms})
    }
    
}
exports.search_page = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let games = await models.game.findAll({order:[["id","ASC"]]})
    let checkedGames;
    if(user){
        checkedGames = await Funs.checkFav(games,user.id);
    }else{
        checkedGames = games
    }
    let titles = await models.game.findAll({
        attributes: ['title'],
        group: ['title']
    })
    let issuers = await models.game.findAll({
        attributes: ['issuer'],
        group: ['issuer'] 
    })
    let developers = await models.game.findAll({
        attributes: ['developer'],
        group: ['developer']
    })
    let genres = await models.genre.findAll({attributes: ['name']})
    let platforms = await models.platform.findAll({attributes: ['name']})
    res.render('pages/page_search', {games:checkedGames, titles, issuers, developers, genres, platforms, user})
}

exports.trash_page = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user){
        let trash_games = await models.game.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false})
    
        let trash_genres = await models.genre.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false})
        let trash_platforms = await models.platform.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false})    
        let titles = await models.game.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false,
            attributes: ['title'],
            distinct: true
        })
        let issuers = await models.game.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false,
            attributes: ['issuer'],
            distinct: true
        })
        let developers = await models.game.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false,
            attributes: ['developer'],
            distinct: true
        })
        let genres = await models.genre.findAll({attributes: ['name']})
        let platforms = await models.platform.findAll({attributes: ['name']})
        res.render('pages/page_trash',{trash_games, trash_genres, trash_platforms,titles, issuers, developers, genres, platforms, user})
    }else{
        res.cookie("token", "", { expires: new Date(0)});
        res.redirect("/");
    }
}
exports.news_pages = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let news = await models.news.findAll()
    let keyworlds = await models.key_worlds.findAll()
    let NewsKeys = []
    for (i of news){
        let news_keys = {}
        news_keys.news = i
        let keyworlds = []
        let news_keyworlds = await models.news_keyworld.findAll({where:{id_news:i.id}})
        for (j of news_keyworlds){
            let keyworld = await models.key_worlds.findOne({where:{id:j.id_keyworld}})
            keyworlds.push(keyworld.text)
        }
        news_keys.keyworlds = keyworlds
        NewsKeys.push(news_keys)
    }
    res.render('pages/news_page',{NewsKeys:NewsKeys, keyworlds:keyworlds,user}) 
}

exports.profile = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user){
        res.render('pages/profile',{user})
    }else{
        res.cookie("token", "", { expires: new Date(0)});
        res.redirect("/");
    }
}

exports.favourites = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user){
        let gamesId = await models.favourites.findAll({where:{userId:user.id}});
        let ids = [];
        for(let i of gamesId){
            ids.push(i.gameId);
        }
        let games = await models.game.findAll({where:{id:ids}});
        let checkedGames = await Funs.checkFav(games,user.id);
        res.render('pages/favourites',{user, games:checkedGames})
    }else{
        res.cookie("token", "", { expires: new Date(0)});
        res.redirect("/");
    }
}