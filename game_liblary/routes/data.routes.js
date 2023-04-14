const send_data = require("../controllers/send_data");
module.exports = function(app){
    app.get('/datalists', send_data.datalists );
    app.put('/game', send_data.dropGame );
    app.put('/genPlat', send_data.dropGenPlat );
    app.delete('/removal', send_data.fullDelete );
    app.post('/getGame', send_data.getGame );
    app.post('/news', send_data.news );
    app.delete('/newsRemoval', send_data.newsDelete );
    app.put('/newsSearch', send_data.newsSearch );
    app.put('/restore', send_data.restore );
    app.put('/searchGame', send_data.searchGame );
    app.put('/updater', send_data.updater );
    app.put('/managerFav', send_data.manageFav );
    app.put('/getRating', send_data.getRating );
    app.post('/setRate', send_data.setRating );
    app.put('/manageComment', send_data.manageComment );
}