const objects = require("../controllers/objects");
module.exports = function(app){
    app.post('/createrGame',objects.createrGame )
    app.post('/createrGenre',objects.createrGenre )
    app.post('/createrPlatform',objects.createrPlatform )
    app.post('/createrNews',objects.createrNews )
}
