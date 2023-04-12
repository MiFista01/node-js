const user_funs = require("../controllers/user_funs");
const Funs = require("../Fun")

var fs = require('fs');
var fs_extra = require('fs-extra');
var multer = require("multer");
const user_storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        // '/files' это директория в которую будут сохранятся файлы
        let user = await Funs.checkUser(req.cookies.token);
        if (!user){
            // cb(new Error('Not auwthorization'), false);
        }else{
            const { originalname } = file
            if(!fs.existsSync("public/uploads/user" + user.id)){
                fs.mkdir("../public/uploads/user" + user.id, function(err){
                    if (err) {
                        console.log('failed to create directory', err);
                    }
                })
            }
            fs_extra.emptyDirSync("public/uploads/user" + user.id)
            cb(null, "./public/uploads/user" + user.id)
            user.update({img:originalname}) 
            
        }
    },
    filename: (req, file, cb) => {
        // Возьмем оригинальное название файла, и под этим же названием сохраним его на сервере
        const { originalname } = file
        cb(null, originalname)
        
    }
})
var upload = multer({ storage: user_storage })


module.exports = function(app){
    app.post('/login', user_funs.login)
    app.get('/logout', user_funs.logout)
    app.post('/reg', user_funs.userReg)

    app.post('/update_profile', user_funs.update)
    app.post('/update_avatar', upload.single("avatar"), [], user_funs.update_avatar)
}