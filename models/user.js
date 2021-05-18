const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    nome: { type: String, required: true, unique: false },
    login: { type: String, required: true, unique: true, lowercase: true },
    fone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, required: true, select: false },
    tipo_conta: { type: String, required: true},
    unidade: { type: String, required: true,},
    setor: { type: String, required: true},
    created: { type: Date, default: Date.now }
});


userSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', userSchema);

