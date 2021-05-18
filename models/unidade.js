const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const unidadeSchema = new Schema({
    nome: { type: String, required: true},
    endereco: { type: String, required: true},
    cep: { type: String, required:true}
});

module.exports = mongoose.model('Unidade', unidadeSchema);

