const {Op, Sequelize} = require('sequelize');
const db = require("./connection/database")
const Game = require("./models/game")
const Genre = require("./models/genre")
const Platform = require("./models/platform")
const GameGenre = require("./models/gameGenre")
const GamePlatform = require("./models/gamePlatform")
const News = require("./models/news")
db.sync()
var express = require("express")
var app = express()

// ===================settings============================
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "4000mb"}));
app.use(bodyParser.urlencoded({limit: "4000mb", extended: true, parameterLimit:5000000}));
// ===================settings============================

// ==============================routes=============================
app.get('/', async function(req, res){
    let games_prime = await Game.findAll({order:[["id","DESC"]],limit:3})
    let games = []
    for(let i of games_prime){
        let game = {}
        game.prime = i
        let game_genres = await GameGenre.findAll({where:{id_game:i.id}})
        let genres = []
        for(let j of game_genres){
            let genre = await Genre.findOne({where:{id:j.id_genre}})
            if (genre != null){
                genres.push(genre.name)
            }
        }
        game.genres = genres
        let game_platforms = await GamePlatform.findAll({where:{id_game:i.id}})
        let platforms = []
        for(let j of game_platforms){
            let platform = await Platform.findOne({where:{id:j.id_platform}})
            if (platform != null){
                platforms.push(platform.name)
            }
        }
        game.platforms = platforms
        games.push(game)
    }
    let news = await News.findAll({order:[["id","DESC"]],limit:5})
    res.render('pages/index', {games:games,news:news})
})
app.get('/form_game', async function(req, res){
    let all_issuers = await Game.findAll({attributes: ['issuer'],distinct: 'issuer'})
    let all_developers = await Game.findAll({attributes: ['developer'],distinct: 'Developer'})
    res.render('pages/form_game',{all_issuers, all_developers})
})
app.get('/form_news', (req, res) => {
    res.render('pages/form_news')
})
app.get('/genre_platform', async function(req, res){
    let genres = await Genre.findAll()
    let platforms = await Platform.findAll()
    res.render('pages/genre_platform',{genres:genres, platforms:platforms})
})
var game_datas = ""
app.get('/game/:id', async function(req, res){
    let game = await Game.findOne({where:{id:req.params.id}})
    let game_genre = await GameGenre.findAll({where:{id_game:req.params.id}})
    let genres = []
    let all_genres = await Genre.findAll({attributes: ['name']})
    let all_platforms = await Platform.findAll({attributes: ['name']})
    let all_issuers = await Game.findAll({attributes: ['issuer'],distinct: 'issuer'})
    let all_developers = await Game.findAll({attributes: ['developer'],distinct: 'Developer'})
    for(let i of game_genre){
        let genre = await Genre.findOne({where:{id:i.id_genre}})
        if (genre != null){
            genres.push(genre)
        }
    }
    let game_platform = await GamePlatform.findAll({where:{id_game:req.params.id}})
    let platforms = []
    for(let i of game_platform){
        let platform = await Platform.findOne({where:{id:i.id_platform}})
        if (platform != null){
            platforms.push(platform)
        }
    }
    game_datas = {prime:game, genres: genres, platforms: platforms}
    res.render('pages/game',{prime:game, genres: genres, platforms: platforms, read:false, all_genres:all_genres, all_platforms: all_platforms,all_issuers,all_developers})
    
})
app.get('/search_page', async function(req, res){
    let games_prime = await Game.findAll({where:{ title: {[Op.substring]: ""}},order:[["id","ASC"]]})
    let games = []
    for(let i of games_prime){
        let game = {}
        game.prime = i
        let game_genres = await GameGenre.findAll({where:{id_game:i.id}})
        let genres = []
        for(let j of game_genres){
            let genre = await Genre.findOne({where:{id:j.id_genre}})
            if (genre != null){
                genres.push(genre.name)
            }
        }
        game.genres = genres
        let game_platforms = await GamePlatform.findAll({where:{id_game:i.id}})
        let platforms = []
        for(let j of game_platforms){
            let platform = await Platform.findOne({where:{id:j.id_platform}})
            if (platform != null){
                platforms.push(platform.name)
            }
        }
        game.platforms = platforms
        games.push(game)
    }
    let titles = await Game.findAll({
        attributes: ['title'],
        distinct: true
    })
    let issuers = await Game.findAll({
        attributes: ['issuer'],
        distinct: true
    })
    let developers = await Game.findAll({
        attributes: ['developer'],
        distinct: true
    })
    let genres = await Genre.findAll({attributes: ['name']})
    let platforms = await Platform.findAll({attributes: ['name']})
    res.render('pages/page_search', {games:games, titles, issuers, developers, genres, platforms})
})
// ==============================routes=============================

// ==============================send data===============================
app.post("/datalists",async function(req,res){
    let genres = await Genre.findAll()
    let platforms = await Platform.findAll()
    res.send({genres:genres, platforms:platforms})
})
app.post("/drop_genre",async function(req,res){
   Genre.destroy({where:req.body})
   res.send({status:1})
})
app.post("/updater",async function(req,res){
    if(req.body.obj == "genre"){
        try {
            Genre.update({name:req.body.value},{where:{id:req.body.id}})
            res.send({status:1})
        } catch (error) {
            res.send({status:0})
        }
        
    }
    if(req.body.obj == "platform"){
        try {
            Platform.update({name:req.body.value},{where:{id:req.body.id}})
            res.send({status:1})
        } catch (error) {
            res.send({status:0})
        }
        
    }
    if(req.body.obj == "game"){
        try {
            let game = await Game.findOne({where:{id:req.body.id}})
            if(req.body.prime != undefined){
                for(let i in req.body.prime){
                    if(game[i] != req.body.prime[i]){
                        game[i] = req.body.prime[i]
                    }
                }
                game.save()
            }
            let old_genres = await GameGenre.findAll({where:{id_game:req.body.id}})
            if(isIterable(req.body.genres)){
                for(let i of req.body.genres){
                    let genre = await Genre.findOne({where:{name:i}})
                    if (genre == null){
                        let new_genre = await Genre.create({name:i})
                        let new_game_genre = await GameGenre.create({id_game:req.body.id, id_genre:new_genre.id})
                    }else{
                        let game_genre = await GameGenre.findOne({where:{id_game:req.body.id, id_genre:genre.id}})
                        if(game_genre == null){
                            GameGenre.create({id_game:req.body.id, id_genre:genre.id})
                        }else{
                            old_genres = arrayRemove(old_genres,genre.id,"id_genre")
                        }
                    }
                }
            }
            for(let i of old_genres){
                GameGenre.destroy({where:{id_genre:i.id_genre}})
            }
            let old_platforms = await GamePlatform.findAll({where:{id_game:req.body.id}})
            if(isIterable(req.body.platforms)){
                for(let i of req.body.platforms){
                    let platform = await Platform.findOne({where:{name:i}})
                    if (platform == null){
                        let new_platform = await Platform.create({name:i})
                        let new_game_platform = await GamePlatform.create({id_game:req.body.id, id_platform:new_platform.id})
                    }else{
                        let game_platform = await GamePlatform.findOne({where:{id_game:req.body.id, id_platform:platform.id}})
                        if(game_platform == null){
                            GamePlatform.create({id_game:req.body.id, id_platform:platform.id})
                        }else{
                            old_platforms = arrayRemove(old_platforms,platform.id,"id_platform")
                        }
                    }
                }
            }
            for(let i of old_platforms){
                GamePlatform.destroy({where:{id_platform:i.id_platform}})
            }
            res.send({status:1})
        } catch (error) {
            res.send({status:0})
        }
        
    }
 })
// ==============================send data===============================


// ================================creat obj================================
app.post("/create_game", async function(req, res){
    try {
        let game_data = JSON.parse(JSON.stringify(req.body))
        delete game_data.genres
        delete game_data.platforms
        let game = await Game.create(game_data)
        if(isIterable(req.body.genres)){
            for(let i of req.body.genres){
                let genre = await Genre.findOrCreate({where:{name:i}})
                GameGenre.findOrCreate({where:{id_game:game.id,id_genre:genre[0].id}})
            }
        }
        
        if(isIterable(req.body.platforms)){
            console.log(req.body.platforms)
            for(let i of req.body.platforms){
                let platform = await Platform.findOrCreate({where:{name:i}})
                GamePlatform.findOrCreate({where:{id_game:game.id,id_platform:platform[0].id}})
            }
        }
        
        res.send({status:1})
    } catch (error) {
        res.send({status:0})
    }
   
})
app.post("/create_news", async function(req, res){
    try {
        News.create(req.body)
        res.send({status:1})
    } catch (error) {
        res.send({status:0})
    }
   
})
app.post("/create_genre", async function(req, res){
    try {
        let [genre, created] = await Genre.findOrCreate({where:req.body})
        res.send({status:1, id:genre.id, created: created})
        
    } catch (error) {
        res.send({status:0})
    }
   
})
app.post("/create_platform", async function(req, res){
    try {
        let [platform,created] = await Platform.findOrCreate({where:req.body})
        res.send({status:1, id:platform.id,created:created})
    } catch (error) {
        res.send({status:0})
    }
   
})
// ================================creat obj================================
app.listen(3000);


// ===========================functions=========================================
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
function arrayRemove(arr, value, key) { 
    
    return arr.filter(function(ele){ 
        return ele[key] != value; 
    });
}
// ===========================functions=========================================