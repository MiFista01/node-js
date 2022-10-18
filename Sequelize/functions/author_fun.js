const author = require('../models/author');
class author_fun{
    static create(data){
        let unq = new Set(data)
        
        unq.forEach(element => {
            if (element.name != null && element.name != undefined && element.name != ""){
                author.findOrCreate({where:{name: element.name, last_name: element.last_name},
                                        defaults:{name: element.name, last_name: element.last_name}}).
                                        then(res =>{console.log(res);}).
                                        catch(err =>{console.log(err);})
            }else{
                conslog.log("Not correct data")
            }
        });
    }
    static update(data,id){
        if (data.name != null && data.name != undefined && data.name != ""){
            author.update({name: data.name, last_name: data.last_name},{where: {id: id}}).then(res =>{console.log(res);}).catch(err =>{console.log(err);})
        }else{
            conslog.log("Not correct data")
        }
    }
    static destroy(parametrs){
        Object.keys(parametrs).forEach(element => {
            if (parametrs[element] != null && parametrs[element] != undefined && parametrs[element] != ""){

                author.destroy({where: parametrs}).then(res =>{console.log(res);}).catch(err =>{console.log(err);})
            }else{
                conslog.log("Not correct data")
            }
        });
        
    }
}
module.exports = author_fun;