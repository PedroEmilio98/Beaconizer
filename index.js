//importa as dependencias
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

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


app.get('/', (req, res) => {
    res.render('index')
})
//define a pasta public como a pasta de arquivos estaticos
app.use(express.static('public'))


//conecta no banco de dados e inicia o servidor
mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("servidor rodando em http://localhost:" + PORT);
        })
    })
    .catch(err => {
        console.log(err);
    });



