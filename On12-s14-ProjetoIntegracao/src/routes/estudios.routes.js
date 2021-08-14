const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Estudio = require('../models/estudio')

//listar todos os estudios/get/find
router.get('/', async (req, res) => {
  const estudios = await Estudio.find()
  res.json(estudios)
})

//criar um novo estudio/post/save
router.post('/', async (req, res) => {
  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })

  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Estudio ja cadastrado.'})
  }
  try{const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
    }catch(err){
        res.status(400).json({message: err.message})
    }
    

})


//atualizar uma informacao especifica num estudio/patch/findById/save

//deletar um estudio/delete/findById/remove

module.exports = router