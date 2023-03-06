const models = require('../models')

exports.form_game = async function(req, res){  
    let all_issuers = await models.game.findAll({attributes: ['issuer'],distinct: 'issuer'})
    let all_developers = await models.game.findAll({attributes: ['developer'],distinct: 'Developer'})
    res.render('pages/form_game',{all_issuers, all_developers})
}
exports.form_news = async (req, res) => {
    let worlds = await models.key_worlds.findAll({attributes: ['text']})
    res.render('pages/form_news',{worlds: worlds})
}
exports.genre_platform = async function(req, res){
    let genres = await models.genre.findAll()
    let platforms = await models.platform.findAll()
    res.render('pages/genre_platform',{genres:genres, platforms:platforms})
}