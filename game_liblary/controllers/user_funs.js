const models = require('../models')
const key = require("../config/key");
const jwt = require("jsonwebtoken");
var Funs = require('../Fun')
var bcrypt = require("bcrypt");
exports.login = async function(req, res){
    let user = await models.user.findOne({where:{username:req.body.user}})
    if(user != null){
        verifyUser(req,res,user)
    }else{
        user = await models.user.findOne({where:{email:req.body.user}})
        if(user != null){
            verifyUser(req,res,user)
        }else{
            res.send({status:0})
        }
    }
}
exports.logout = async function(req, res){
    res.cookie("token", "", { expires: new Date(0)});
    res.redirect("/");
}

exports.userReg = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    if (!user){
        let userUsername = await models.user.findOne({where: {username: req.body.username}}); 
        let userEmail = await models.user.findOne({where: {email: req.body.email}});
        let exist = false;
        if(userUsername !=null || userEmail != null){
            exist = true;
        }
        if (!exist && req.body.username != "" && req.body.email != "" && req.body.password != ""){
            let salt = await bcrypt.genSalt(10)
            let hashPassword = await bcrypt.hash(req.body.password,salt)
            let user_crated = await models.user.create({username: req.body.username, email: req.body.email, password:hashPassword, salt:salt,})
            req.body.userId = user_crated.id;
            
        }else{
            res.send({status:0})
        }
    }else{
        res.send({status:0})
    }
    if(req.body.userId != undefined){
        var token = jwt.sign({ id: req.body.userId}, key.secretKey, { 
            expiresIn:key.lifeAge // 24 hours
        });
        res.cookie("token", token, { maxAge: key.lifeAge*1000 })
        res.send({status:1})
    }
}

exports.update = async function(req, res){
    let user = await Funs.checkUser(req.cookies.token);
    let updated = {}
    if(req.body.password != undefined && req.body.password.length >=4){
        let password = req.body.password;
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password,salt)
        user.update({password:hashPassword, salt});
        updated.password = 1;
    }
    let findUser = "";
    if(req.body.username !=undefined){
        findUser = await models.user.findOne({where:{username:req.body.username}})
        if(findUser == null){
            user.update({username:req.body.username})
            findUser = "";
            updated.username = 1
        }
    }
    findUser = await models.user.findOne({where:{email:req.body.email}})
    if(findUser == null){
        user.update({email:req.body.email})
        findUser = "";
        updated.email = 1
    }
    updated.status = 1
    res.send(updated)
}

exports.update_avatar = async function(req, res){
    res.send({status:1})
}


async function verifyUser(req,res,user){

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if (!passwordIsValid) {
        res.send({
            status:0
        });
    }else{
        var token = jwt.sign({ id: user.id}, key.secretKey, { 
            expiresIn:key.lifeAge // 24 hours
        });
        res.cookie("token", token, { maxAge: key.lifeAge*1000 })
        res.send({status: 1});
    }
    
}