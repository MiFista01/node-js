const objects = require("../controllers/objects");
module.exports = function(app){
    app.post('/createrGame',objects.createrGame )
    app.post('/create_genre',objects.createrGenre )
    app.post('/create_platform',objects.createrPlatform )
    app.post('/createrNews',objects.createrNews )
}
