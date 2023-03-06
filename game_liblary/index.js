const {Op, Sequelize} = require('sequelize');
const db = require("./connection/database")
const Game = require("./models/game")
const Genre = require("./models/genre")
const Platform = require("./models/platform")
const GameGenre = require("./models/gameGenre")
const GamePlatform = require("./models/gamePlatform")
const News = require("./models/news")
const KeyWorlds = require("./models/key_worlds")
const NewsKeyWorlds = require("./models/news_keyworld")
// db.sync({force:true})
const cors = require("cors");
var express = require("express")
var app = express()
var bcrypt = require('bcrypt');

// ===================settings============================
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
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

require("./routes/form_page.routes")(app)
require("./routes/user_page.routes")(app)
// ==============================routes=============================

// ==============================send data===============================

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
        let news_data = JSON.parse(JSON.stringify(req.body))
        delete news_data.worlds
        let news = await News.create(news_data)
        if (req.body.worlds.length != 0){
            for(i of req.body.worlds){
                let keyworld = await KeyWorlds.findOrCreate({where: { text: i }, defaults: {text: i}})
                console.log(keyworld[0].id)
                let news_world = await NewsKeyWorlds.findOrCreate({where: {id_news: news.id, id_keyworld: keyworld[0].id}, defaults: {id_news: news.id, id_keyworld: keyworld[0].id}})
            }
        }
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