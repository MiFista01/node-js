const user_page = require("../controllers/user_page");
module.exports = function(app){
    app.get('/game/:id', user_page.game )
    app.get('/newsPages', user_page.news_pages )
    app.get('/searchPage', user_page.search_page )
    app.get('/trashPage', user_page.trash_page )
    app.get('/profile', user_page.profile)
    app.get('/favourites', user_page.favourites)
}