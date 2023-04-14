const controller_form = require("../controllers/page_forms");
module.exports = function(app){
    app.get('/formGame',controller_form.form_game )
    app.get('/formNews',controller_form.form_news )
    app.get('/genrePlatform',controller_form.genre_platform )
}