class Fun{
    constructor(entity) {
        this.entity = entity;
    }
    async getOne(parametrs){
        let count =  Object.keys(parametrs).length;
        Object.keys(parametrs).forEach(element => {
            if (parametrs[element]!= null || parametrs[element]!= undefined || parametrs[element]!= ""){
                count -= 1;
            }
        });
        if(count == 0){
            var found = await this.entity.findOne({where: parametrs}).then(res=>{return res.dataValues})
            return new Promise(function(res,rej){res(found)})
        }
    }
    async getAll(parametrs = ""){
        if (parametrs != ""){
            let count =  Object.keys(parametrs).length;
            Object.keys(parametrs).forEach(element => {
                if (parametrs[element]!= null || parametrs[element]!= undefined || parametrs[element]!= ""){
                    count -= 1;
                }
                if(count == 0){
                    this.entity.findAll({where: parametrs, raw: true}).
                                    then(res =>{console.log(res);}).
                                    catch(err =>{console.log(err);})
                }
            });
            
        }else{
            return this.entity.findAll({where: parametrs, raw: true}).
                                    then(res =>{console.log(res);}).
                                    catch(err =>{console.log(err);})
        }
    }
    
    async update(data,parametrs){
        let count =  Object.keys(data).length;
        Object.keys(data).forEach(element => {
            if (data[element]!= null || data[element]!= undefined || data[element]!= ""){
                count -= 1;
            }
        });
        if (count == 0){
            console.log(data)
            this.entity.update(data,{where: parametrs}).then(res =>{console.log(res);}).catch(err =>{console.log(err);})
        }else{
            conslog.log("Not correct data")
        }
    }
    async destroy(parametrs){
        Object.keys(parametrs).forEach(element => {
            if (parametrs[element] != null && parametrs[element] != undefined && parametrs[element] != ""){
                this.entity.destroy({where: parametrs}).then(res =>{console.log(res);}).catch(err =>{console.log(err);})
            }else{
                conslog.log("Not correct data")
            }
        });
        
    }
}
module.exports = Fun;