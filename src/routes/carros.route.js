const { Router } = require('express')
const { create, findAll, findOne, update, remove } = require('../controllers/carros.controller.js')
const { validaCampos, validaPlaca, validaId } = require('../middlewares/carros.middleware.js')

const carrosRouter = Router()

carrosRouter.get('/', findAll)
carrosRouter.get('/:idCarro', validaId, findOne)
carrosRouter.post('/', validaCampos, validaPlaca, create)
carrosRouter.put('/:idCarro', validaCampos, validaId, validaPlaca, update)
carrosRouter.delete('/:idCarro', validaId, remove)

module.exports = carrosRouter