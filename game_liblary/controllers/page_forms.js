const models = require('../models')
const Funs = require('../Fun')

exports.form_game = async function(req, res){ 
    let user = await Funs.checkUser(req.cookies.token);
    if(user && user.role == 3){
        let all_issuers = await models.game.findAll({attributes: ['issuer'],distinct: 'issuer'})
        let all_developers = await models.game.findAll({attributes: ['developer'],distinct: 'Developer'})
        res.render('pages/form_game',{all_issuers, all_developers, user})
    }else{
        res.redirect("/");
    }
}
exports.form_news = async (req, res) => {
    let user = await Funs.checkUser(req.cookies.token);
    if(user && user.role ==3){
        let worlds = await models.key_worlds.findAll({attributes: ['text']})
        res.render('pages/form_news',{worlds: worlds, user})
    }else{
        res.redirect("/");
    }
}
exports.genre_platform = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if(user && user.role == 3){
        let genres = await models.genre.findAll()
        let platforms = await models.platform.findAll()
        res.render('pages/genre_platform',{genres:genres, platforms:platforms, user})
    }else{
        res.redirect("/");
    }
}