const user_page = require("../controllers/user_page");
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/game/:id', user_page.game )
    app.get('/news_pages', user_page.news_pages )
    app.get('/search_page', user_page.search_page )
    app.get('/trash_page', user_page.trash_page )
}