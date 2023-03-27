const models = require('../models')
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
exports.login = async function(req, res){
    let user = await models.user.findOne({where:{username:req.body.user}})
    if(user != null){
        verifyUser(req,res,user)
    }else{
        user = await models.user.findOne({where:{username:req.body.user}})
        if(user != null){
            verifyUser(req,res,user)
        }
    }
}
async function verifyUser(req,res,user){
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    var token = jwt.sign({ id: user.id}, config.secret, { 
        expiresIn: 86400 // 24 hours
    });
    res.headers["x-access-token"] = token
    res.status(200).send({
        status: 1,
        token
    });
    
}