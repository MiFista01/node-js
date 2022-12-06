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
app.use(bodyParser.json({limit: "300mb"}));
app.use(bodyParser.urlencoded({limit: "300mb", extended: true, parameterLimit:50000}));
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
app.get('/form_game', (req, res) => {
    res.render('pages/form_game')
})
app.get('/form_news', (req, res) => {
    res.render('pages/form_news')
})
app.get('/genre_platform', async function(req, res){
    let genres = await Genre.findAll()
    let platforms = await Platform.findAll()
    res.render('pages/genre_platform',{genres:genres, platforms:platforms})
})
app.get('/game/:id', async function(req, res){
    console.log(req.params.id)
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
 })
// ==============================send data===============================


// ================================creat obj================================
app.post("/create_game", async function(req, res){
    try {
        let game_data = req.body
        let genres = req.body.genres.split(",")
        let platforms = req.body.platforms.split(",")
        delete game_data.genres
        let game = await Game.create(game_data)
        for(let i of genres){
            let genre = await Genre.findOrCreate({where:{name:i}})
            GameGenre.findOrCreate({where:{id_game:game.id,id_genre:genre[0].id}})
        }
        for(let i of platforms){
            let platform = await Platform.findOrCreate({where:{name:i}})
            GamePlatform.findOrCreate({where:{id_game:game.id,id_platform:platform[0].id}})
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