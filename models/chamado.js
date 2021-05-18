const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const chamadoSchema = new Schema({
    assunto: { type: String, required: true},
    descricao: { type: String, required: true},
    status: { type: String, required:false},
    prioridade: { type: Boolean, required:true},
    solicitante: { type: String, required:true},
    responsavel: { type: String, required:false}
});

module.exports = mongoose.model('chamado', chamadoSchema);

