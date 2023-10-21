const { Router } = require('express')
const { create, findAll, findOne, update, remove } = require('../controllers/carros.controller.js')
const { validaCampos, validaPlaca, validaId } = require('../middlewares/carros.middleware.js')

const carrosRouter = Router()

carrosRouter.get('/', findAll)
carrosRouter.get('/:id', validaId, findOne)
carrosRouter.post('/', validaCampos, validaPlaca, create)
carrosRouter.put('/:id', validaCampos, validaId, validaPlaca, update)
carrosRouter.delete('/:id', validaId, remove)

module.exports = carrosRouter