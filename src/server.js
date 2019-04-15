// criando a primeira rota ( "teste" )

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// -----------------------------------------------------------------------------
// todo mundo pode acessar minha aplicação e consumir os recursos dela
// -----------------------------------------------------------------------------
app.use(cors());

//requisições http e ws( websockect )
const server = require('http').Server(app);
const io = require('socket.io')(server);

// toda vez que eu receber uma conexão num websocket , eu vou receber o socket 
// socket é a representação de conexao do usuário com o servidor ( conexão em realtime )
// isola o usupario dos demais ( conecta em uma sala única )
io.on('connection', socket =>{
   // console.log("ok");
   // connectRoom => rota - 
   socket.on('connectRoom', box => {
       socket.join(box);
   })
});

//mongoose.connect('mongodb+srv://omnistack:omnistack@mflix-rmhbu.mongodb.net/omnistack?retryWrites=true', {
//mongoose.connect('mongodb://localhost:27017/Yuri_DB', {

 mongoose.connect('mongodb+srv://omnistack:omnistack@mflix-rmhbu.mongodb.net/Test?retryWrites=true', {
    useNewUrlParser: true
});

// torna a informação de io global
app.use((req,res, next) => {
    req.io = io;
    // processa o middleware e vai passar pro restante da aplicação
    return next();
});

// middleware --> toda vez que usuário acessar a rota "teste"
// eu vou interceptar esta requisição
//app.get('/teste', (req,res) => {
//    return res.send('Hello World');
//})

// json --> formato utilizado em api rest
// api rest serviço que  só fornece dados para outras interfaces visuais
// servico retorna dados para o front end ( atraves do [json] )

app.use(express.json());

// urlencoded --> permite que envie arquivos nas requisições ( upload )
app.use(express.urlencoded({extended:true}));

// REDIRECIONAMENTO --> toda vez que o usuário utilizar a rota Files a gente vai buscar os arquivos da pasta "tmp"
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// app.use --> importa a variavel "routes" do modulo [routes.js]
app.use(require('./routes')); // './routes' --> indica que está na pasta local "src"


// troca app.listen para server.listen
server.listen(process.env.PORT || 3333);