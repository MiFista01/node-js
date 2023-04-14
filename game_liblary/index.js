
const sequelize = require("sequelize");
const db = require("./connection/database");
const models = require("./models");
const Funs = require("./Fun");
// db.sync();

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

var express = require("express");
var app = express();

var bcrypt = require('bcrypt');
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ===================settings============================
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "4000mb"}));
app.use(bodyParser.urlencoded({limit: "4000mb", extended: true, parameterLimit:5000000}));
// ===================settings============================

setTimeout(() => {
    models.user.findOne({where:{username:"admin"}}).then(async (result) => {
        if(result == null){
            let username = "admin"
            let email = "aleksei22891@gmail.com"
            let salt = await bcrypt.genSalt(10)
            let password =await bcrypt.hash("1234",salt)
            let role = 3;
            models.user.create({username,email, password, salt, role})
        }
    })
}, 2000);



// ==============================routes=============================
app.get('/', async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let games = await models.game.findAll({order:[["id","DESC"]],limit:4})
    let checkedGames;
    if(user){

        checkedGames = await Funs.checkFav(games,user.id);
    }else{
        checkedGames = games
    }
    let popularGames = await models.ratings.findAll({
        attributes: [
          'gameId',
          [sequelize.fn('sum', sequelize.col('raiting')), 'totalRating'],
        ],
        group: ['gameId'],
        order:[['totalRating','DESC']],
    });
    games = [];
    for( let i of popularGames){
        let gg = await models.game.findOne({where:{id:i.gameId}});
        if(gg != null){
            games.push(gg);
        }
        if(games.length >= 4){
            break;
        }
    }
    
    let checkPopularGames;
    if(user){
        checkPopularGames = await Funs.checkFav(games,user.id);
    }else{
        checkPopularGames = games
    }
    console.log(checkPopularGames[3])
    let news = await models.news.findAll({order:[["id","DESC"]],limit:5})
    res.render('pages/index', {games:checkedGames, popularGames:checkPopularGames,news:news, user})
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

require("./routes/form_page.routes")(app)
require("./routes/user_page.routes")(app)
require("./routes/data.routes")(app)
require("./routes/objects.routes")(app)
require("./routes/user_funs.routes")(app) 
// ==============================routes=============================
app.listen(3000); 
