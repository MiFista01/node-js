
const db = require("./connection/database")
const Game = require("./models/game")
const Genre = require("./models/genre")
const Platform = require("./models/platform")
const GameGenre = require("./models/gameGenre")
const GamePlatform = require("./models/gamePlatform")
const News = require("./models/news")
const KeyWorlds = require("./models/key_worlds")
const NewsKeyWorlds = require("./models/news_keyworld")
const Comments = require("./models/comments")
const Favourites = require("./models/favourites")
const Raiting = require("./models/raitings")
const User = require("./models/user")
// db.sync()
const cors = require("cors");
var express = require("express")
const fileUpload = require('express-fileupload');
var app = express()
var bcrypt = require('bcrypt');

// var fs = require('fs');
// const path = require('path');
// var multer = require("multer");
// var upload = multer({ dest: 'uploads/' });
// const user_storage = multer.diskStorage({
//     destination: async(req, file, cb) => {
//         // '/files' это директория в которую будут сохранятся файлы 
//         User.findOne({where:{username:req.user}})
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         // Возьмем оригинальное название файла, и под этим же названием сохраним его на сервере
//         const { originalname } = file
//         cb(null, originalname)
//     }
// })

User.findOne({where:{username:"admin"}}).then(async (result) => {
    if(result == null){
        let username = "admin"
        let email = "aleksei22891@gmail.com"
        let salt = await bcrypt.genSalt(10)
        let password =await bcrypt.hash("1234",salt)
        let role = 3;
        User.create({username,email, password, salt, role})
    }
})
// ===================settings============================
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "4000mb"}));
app.use(bodyParser.urlencoded({limit: "4000mb", extended: true, parameterLimit:5000000}));
// ===================settings============================



// ==============================routes=============================
app.get('/', async function(req, res){
    console.log(req.headers)
    let games_prime = await Game.findAll({order:[["id","DESC"]],limit:4})
    let games = []
    for(let i of games_prime){
        let game = {}
        game.prime = i 
        let game_genres = await GameGenre.findAll({where:{id_game:i.id}})
        let genres = ""
        for(let j of game_genres){
            let genre = await Genre.findOne({where:{id:j.id_genre}})
            if (genre != null){
                if(j== game_genres[game_genres.length-1]){
                    genres+= genre.name
                }else{
                    genres+= genre.name+"/ "
                }
            }
        }
        game.genres = genres.substring(0,40)+"..."
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
require("./routes/data.routes")(app)
require("./routes/objects.routes")(app)
require("./routes/user_funs.routes")(app) 
// ==============================routes=============================
app.listen(3000);
