const controller_form = require("../controllers/page_forms");
module.exports = function(app){
    app.get('/form_game',controller_form.form_game )
    app.get('/form_news',controller_form.form_news )
    app.get('/genre_platform',controller_form.genre_platform )
}