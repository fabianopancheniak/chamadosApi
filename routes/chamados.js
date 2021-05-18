const express = require('express');
const router = express.Router();
const Chamados = require('../models/chamado');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const config = require('../config/config');


router.get('/', async (req,res) => {
    try {
        const chamados = await Chamados.find({});
        return res.send(chamados);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos chamados!' });
    }
});


router.post('/create',  async (req,res) => {
    const { assunto, descricao, status, prioridade, solicitante, responsavel } = req.body;
    console.log(`${assunto} - ${descricao} - ${status}- ${prioridade}- ${solicitante}- ${responsavel}`);
    if (!assunto || !descricao || !prioridade || !solicitante) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
        try {
                
                const chamado = await Chamados.create(req.body);
                return res.status(201).send({ error: 'Chamado solicitado' });
        }
        catch (err) {
            return res.send({ error: `Erro ao registrar chamado: ${err}`})
        }
});

router.put('/update/:id', auth, async (req,res) => {
    const { assunto, descricao, status, prioridade, solicitante, responsavel } = req.body;
    if (!assunto || !descricao || !prioridade || !solicitante) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
                   
            const chamado = await Chamados.findByIdAndUpdate(req.params.id, req.body);        
            const chamadoChanged = await Chamados.findById(req.params.id);
            return res.status(201).send({ chamadoChanged});
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar chamado: ${err}`})
    }     
});

router.delete('/delete/:id',  async (req,res) => {
    try {
        await Chamados.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Chamado removido!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover chamado!' });
    }     
});


module.exports = router;