const objects = require("../controllers/objects");
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/create_game',objects.create_game )
    app.post('/create_genre',objects.create_genre )
    app.post('/create_news',objects.create_news )
    app.post('/create_platform',objects.create_platform )
}