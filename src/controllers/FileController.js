const  Box = require('../models/Box');
const  File = require('../models/File');

class FileController{
    async store(req,res){
        //console.log(req.file);
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);

        // await --> significa que é assincrono
        await box.save();

        // pega variavel req.io
        // pega todos usuarios conectados na box com o id do mongo e 
        // envia a informação com os dados do arquivo( mesma informação retornada no res.json )
        req.io.sockets.in(box._id).emit('file', file);

       // Criar um arquivo
        return res.json(file);
    }
}

// instancia a classe:
module.exports = new FileController();

// Cors => módulo que determina quem vai poder acessar nossa aplicação
