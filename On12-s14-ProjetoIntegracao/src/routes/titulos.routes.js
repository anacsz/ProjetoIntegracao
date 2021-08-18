const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

router.get('/pixar', controller.getAllPixar)


router.get('/marvel', controller.getAllMarvel)


router.post('/', controller.createTitle)

//listar um titulo/get/findById
router.get('/', controller.getAll)

//atualizar uma informacao especifica num titulo/patch/findById/save
router.patch('/:id', controller.updateOne)

//deletar um titulo/delete/findById/remove
router.delete('/:id', controller.deleteById)

module.exports = router