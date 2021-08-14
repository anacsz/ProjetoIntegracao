const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

router.get('/pixar', controller.getAllPixar)


router.get('/', controller.getAll)


router.post('/', controller.createTitle)

//listar um titulo/get/findById

//atualizar uma informacao especifica num titulo/patch/findById/save

//deletar um titulo/delete/findById/remove

module.exports = router