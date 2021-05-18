const express = require('express');
const router = express.Router();
const Unidades = require('../models/unidade');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const config = require('../config/config');


router.get('/', async (req,res) => {
    try {
        const unidades = await Unidades.find({});
        return res.send(unidades);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca das unidades!' });
    }
});


router.post('/create',  async (req,res) => {
    const { nome, endereco, cep } = req.body;
    console.log(`${nome} - ${endereco} - ${cep}`);
    if (!nome || !endereco || !cep) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
        try {
                if (await Unidades.findOne({ nome }))
                return res.send({ error: 'Nome já registrado! '}); 

                const unidade = await Unidades.create(req.body);
                return res.status(201).send({ error: 'Unidade cadastrada!' });
        }
        catch (err) {
            return res.send({ error: `Erro ao gravar unidade: ${err}`})
        }
});


router.put('/update/:id', auth,  async (req,res) => {
    const { nome, endereco ,cep } = req.body;
    if (!nome || !endereco || !cep) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        if (await Unidades.findOne({ nome }))
            return res.send({ error: 'Nome já registrado! '});     
            
            const unidade = await Unidades.findByIdAndUpdate(req.params.id, req.body);        
            const unidadeChanged = await Unidades.findById(req.params.id);
            return res.status(201).send({ unidadeChanged});
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar loja: ${err}`})
    }     
});

router.delete('/delete/:id', auth, async (req,res) => {
    try {
        await Unidades.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Unidade removida!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover!' });
    }     
});


module.exports = router;