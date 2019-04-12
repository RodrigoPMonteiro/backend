const  Box = require('../models/Box');

class BoxController{
    async store(req,res){
        
        const box = await  Box.create({ title: req.body.title })
        return res.json(box);
    }

    async show(req,res){
        const box = await Box.findById(req.params.id).populate({
            // informa com campo que quero ordenar
            path: 'files',
            // ordena por data de criação Crescente ( -1 --> Decrescente )
            options: { sort:{createdAt: 1 } }
        });

        return res.json(box);
    }
}

// instancia a classe:
module.exports = new BoxController();