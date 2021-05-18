const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app = express();


const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

// conectando ao banco de dados
mongoose.connect(config.dbString,options);

// ocultando algumas mensagens do console
mongoose.set('useCreateIndex',true);

// retornando status da conexão com o banco
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
});

// verificando erros de conexão
mongoose.connection.on('error', (err) => {
    console.log(`Erro na conexão com o banco de dados:  ${err}`);
});

// verificando se ocorreu desconexão
mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
});

// configurando o 'body-parser' para as requisições com 'body'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const userRoutes = require('./routes/users');
const chamadosRoutes = require('./routes/chamados');
const unidadesRoutes = require('./routes/unidades');


//app.use('/', publicRoutes);
app.use('/users', userRoutes);
app.use('/chamados', chamadosRoutes);
app.use('/unidades', unidadesRoutes);


app.listen(3000);

module.exports = app;