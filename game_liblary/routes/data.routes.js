const send_data = require("../controllers/send_data");
module.exports = function(app){
    app.post('/datalists', send_data.datalists );
    app.post('/drop_game', send_data.drop_game );
    app.post('/drop_gen_plat', send_data.drop_gen_plat );
    app.post('/full_delete', send_data.full_delete );
    app.post('/get_game', send_data.get_game );
    app.post('/news', send_data.news );
    app.post('/news_delete', send_data.news_delete );
    app.post('/news_search', send_data.news_search );
    app.post('/restore', send_data.restore );
    app.post('/search_game', send_data.search_game );
    app.post('/updater', send_data.updater );
    app.post('/manage_fav', send_data.manage_fav );
    app.post('/getRating', send_data.getRating );
    app.post('/setRate', send_data.setRating );
}