const category = require('../models/category');
class category_fun{
    static create(data){
        let unq = new Set(data)
        
        unq.forEach(element => {
            if (element.name != null && element.name != undefined && element.name != ""){
                category.findOrCreate({where:{name: element.name},
                                        defaults:{name: element.name}}).
                                        then(res =>{console.log(res);}).
                                        catch(err =>{console.log(err);})
            }else{
                conslog.log("Not correct data")
            }
        });
    }
    static update(data,id){
        if (data.name != null && data.name != undefined && data.name != ""){
            category.update({name: data.name},{where: {id: id}}).then(res =>{console.log(res);}).catch(err =>{console.log(err);})
        }else{
            conslog.log("Not correct data")
        }
    }
    static destroy(parametrs){
        Object.keys(parametrs).forEach(element => {
            if (parametrs[element] != null && parametrs[element] != undefined && parametrs[element] != ""){

                category.destroy({where: parametrs}).then(res =>{console.log(res);}).catch(err =>{console.log(err);})
            }else{
                conslog.log("Not correct data")
            }
        });
        
    }
}
module.exports = category_fun;