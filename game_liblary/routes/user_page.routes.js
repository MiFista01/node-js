const user_page = require("../controllers/user_page");
module.exports = function(app){
    app.get('/game/:id', user_page.game )
    app.get('/news_pages', user_page.news_pages )
    app.get('/search_page', user_page.search_page )
    app.get('/trash_page', user_page.trash_page )
}