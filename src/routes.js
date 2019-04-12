
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer', );

// separa a parte de rotas do módulo principal (server.js)
const routes = express.Router();


const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

// req --> representa a requisição ( do frontend por exemplo, um formulario, um parametro )
// res --> resposta que daremos ao cliente ( retorno que o backend enviará )
// porém arquitetura restful não utiliza o metodo [get]
//routes.get('/teste', (req,res) => { 
 //   return res.send('Hello World - Rota --> /teste Nodemon ');
//})

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
    "/boxes/:id/files", 
    multer(multerConfig).single("file"), 
    FileController.store
);

// GET --> utilizado para buscar alguma informação do nosso servico ( api )
//POST --> quando formos criar alguma coisa
//PUT --> quando formos editar alguma coisa
//DELETE --> quando formos deletar alguma coisa



// exporta a variável "routes" do arquivo atual [routes.js]
module.exports = routes;

