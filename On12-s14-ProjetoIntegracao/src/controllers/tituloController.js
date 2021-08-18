const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const getAllPixar = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  const titulosFiltrados = titulos.filter(titulo => titulo.estudio.nome == "Pixar")
  res.json(titulosFiltrados)
}

const getAllMarvel = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  const titulosFiltrados = titulos.filter(titulo => titulo.estudio.nome == "Marvel")
  res.json(titulosFiltrados)
}

const getAll = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  res.status(200).json(titulos)
}

const createTitle = async (req, res) => {
  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  })
  const tituloJaExiste = await Titulo.findOne({nome: req.body.nome})
 if (tituloJaExiste) {
   return res.status(409).json({error: 'Estudio ja consta cadastrado.'})
 }
  try{
      const novoTitulo = await titulo.save()
      res.status(201).json(novoTitulo)
  }catch (err){
      res.status(400).json({message: err.message})
  }
}

const updateOne = async (req, res) => {
  try {
    
   const titulo = await Titulo.findById(req.params.id)
   
   if (titulo == null){
     return res.status(404).json({message: "Título não localizado"})
   }
   
   if (req.body.nome != null){
     titulo.nome = req.body.nome
   }
   const tituloAtualizado = await titulo.save()
   
   res.status(200).json(tituloAtualizado)
   
  } catch (err){
   res.status(500).json({ message: err.message})
  }
}

const deleteById = async (req, res) => {
  const titulo = await Titulo.findById(req.params.id)
      if (titulo == null){
          return res.status(404).json({message: "Título não localizado."})
  }
  try{
        await titulo.remove()
          res.status(200).json({message:"Título excluido com sucesso."})
      } catch (err){
          res.status(500).json({message: err.message})
    }
}


module.exports = {
  getAll,
  createTitle,
  getAllPixar,
  getAllMarvel,
  createTitle,
  updateOne,
  deleteById
}