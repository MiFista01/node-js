const sequelize = require("sequelize")
const models = {};
models.game = require("./game");
models.gameGenre = require("./gameGenre")
models.gamePlatform = require("./gamePlatform");
models.genre = require("./genre")
models.key_worlds = require("./key_worlds");
models.news = require("./news")
models.news_keyworld = require("./news_keyworld");
models.platform = require("./platform")
models.Op = sequelize.Op

module.exports = models;