/////////////////importa as dependencias///////////////////////////////////
//frameworks
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
//models
const User = require('./models/User');
//roteadores
const beaconRouter = require('./routes/BeaconRouter');
const restrictedRouter = require('./routes/RestrictedRouter');
const authRouter = require('./routes/AuthRouter');
const pagesRouter = require('./routes/PagesRouter');
/////////////////////////////////////////////////////////////////////////////

//define as constantes para variaveis de ambiente
const PORT = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/mongoNoticias'

//instancia o express
const app = express();

//configura o banco de dados
mongoose.Promise = global.Promise;

//seta a rota para a paste de views e o EJS 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configura o middleware
app.use(session({ secret: 'teste' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if ('user' in req.session) {
        res.locals.user = req.session.user
    }
    next()
});

//define as rotas. O primeiro arg define a rota na URL e o segundo o roteador que sera chamado
app.use('/', authRouter);
app.use('/restrito', restrictedRouter);
app.use('/avisos', beaconRouter);
app.use('/', pagesRouter);

//define a pasta public como a pasta de arquivos estaticos
app.use(express.static('public'))

//cria o usuario Admin caso nao exista nenhum usuario
const createAdmin = async () => {
    const numUsers = await User.count();
    if (numUsers === 0) {
        const user = new User({
            userName: 'ADMIN',
            password: 'admin123'
        });
        await user.save(() => console.log('ADMIN criado'));
    } else {
        console.log('Já existe um usuario')
    }
}

//conecta no banco de dados e inicia o servidor
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("servidor rodando em http://localhost:" + PORT);
        })
    })
    .then(createAdmin())
    .catch(err => {
        console.log(err);
    });

