
const db = require("./connection/database")
const models = require("./models")
const Funs = require("./Fun")
// db.sync({alter:true})

var express = require("express")
var app = express()

var bcrypt = require('bcrypt');
const cors = require("cors");
const cookieParser = require("cookie-parser")

// ===================settings============================
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "4000mb"}));
app.use(bodyParser.urlencoded({limit: "4000mb", extended: true, parameterLimit:5000000}));
// ===================settings============================

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
    let news = await models.news.findAll({order:[["id","DESC"]],limit:5})
    res.render('pages/index', {games:checkedGames,news:news, user})
})

require("./routes/form_page.routes")(app)
require("./routes/user_page.routes")(app)
require("./routes/data.routes")(app)
require("./routes/objects.routes")(app)
require("./routes/user_funs.routes")(app) 
// ==============================routes=============================
app.listen(3000); 
