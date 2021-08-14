const express = require('express')
const router = express.Router()
const mongoose = require(mongoose)
const Titulo = require('../models/titulo')

router.get('/', async (req, res) =>{
    const titulos = await Titulo.find().populate('estudio')
    res.status(200).json(titulos)
})

router.post('/', async(req, res) =>{
    const titulo = new Titulo({
        _id: new mongoose.Types.ObejectId(),
        nome: req.body.nome,
        genero: req.body.descricao,
        descricao: req.body.estudio,
        criadoEm: req.body.criadoEm

    })

    try{
        const novoTitulo = await titulo.save()
        res.status(201).json(novoTitulo)

    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router