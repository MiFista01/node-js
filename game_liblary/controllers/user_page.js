const models = require('../models')

exports.game = async function(req, res){
    let game = await models.game.findOne({where:{id:req.params.id}})
    let game_genre = await models.gameGenre.findAll({where:{id_game:req.params.id}})
    let genres = []
    let all_genres = await models.genre.findAll({attributes: ['name']})
    let all_platforms = await models.platform.findAll({attributes: ['name']})
    let all_issuers = await models.game.findAll({attributes: ['issuer'],distinct: 'issuer'})
    let all_developers = await models.game.findAll({attributes: ['developer'],distinct: 'Developer'})
    for(let i of game_genre){
        let genre = await models.genre.findOne({where:{id:i.id_genre}})
        if (genre != null){
            genres.push(genre)
        }
    }
    let game_platform = await models.gamePlatform.findAll({where:{id_game:req.params.id}})
    let platforms = []
    for(let i of game_platform){
        let platform = await models.platform.findOne({where:{id:i.id_platform}})
        if (platform != null){
            platforms.push(platform)
        }
    }
    game_datas = {prime:game, genres: genres, platforms: platforms}
    res.render('pages/game',{prime:game, genres: genres, platforms: platforms, read:false, all_genres:all_genres, all_platforms: all_platforms,all_issuers,all_developers})
    
}
exports.search_page = async function(req, res){
    let games_prime = await models.game.findAll({where:{ title: {[models.Op.substring]: ""}},order:[["id","ASC"]]})
    let games = []
    for(let i of games_prime){ 
        let game = {}
        game.prime = i
        let game_genres = await models.gameGenre.findAll({where:{id_game:i.id}})
        let genres = []
        for(let j of game_genres){
            let genre = await models.genre.findOne({where:{id:j.id_genre}})
            if (genre != null){
                genres.push(genre.name)
            }
        }
        game.genres = genres
        let game_platforms = await models.gamePlatform.findAll({where:{id_game:i.id}})
        let platforms = []
        for(let j of game_platforms){
            let platform = await models.platform.findOne({where:{id:j.id_platform}})
            if (platform != null){
                platforms.push(platform.name)
            }
        }
        game.platforms = platforms
        games.push(game)
    }
    let titles = await models.game.findAll({
        attributes: ['title'],
        distinct: true
    })
    let issuers = await models.game.findAll({
        attributes: ['issuer'],
        distinct: true
    })
    let developers = await models.game.findAll({
        attributes: ['developer'],
        distinct: true
    })
    let genres = await models.genre.findAll({attributes: ['name']})
    let platforms = await models.platform.findAll({attributes: ['name']})
    res.render('pages/page_search', {games:games, titles, issuers, developers, genres, platforms, read:false})
}

exports.trash_page = async function(req, res){
    let trash_games = await models.game.findAll({where:{destroyTime:{[models.Op.not]:null}},paranoid:false})
    let deleted_games = []
    for(let i of trash_games){
        let game = {}
        game.prime = i
        let genres = []
        let game_genre = await models.gameGenre.findAll({where:{id_game:i.id}})
        for (let j of game_genre){
            let genre = await models.genre.findOne({where:{id:j.id_genre}})
            if(genre != null){
                genres.push(genre.name)
            }
        }
        game.genres = genres
        let platforms = []
        let game_platforms = await models.gamePlatform.findAll({where:{id_game:i.id}})
        for (let j of game_platforms){
            let platform = await models.platform.findOne({where:{id:j.id_platform}})
            if(platform != null){
                platforms.push(platform.name)
            }
        }
        game.platforms = platforms
        deleted_games.push(game)
    };
    
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
    res.render('pages/page_trash',{deleted_games, trash_genres, trash_platforms,titles, issuers, developers, genres, platforms, read:false})
}
exports.news_pages = async function(req, res){
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
    res.render('pages/news_page',{NewsKeys:NewsKeys, keyworlds:keyworlds})
}