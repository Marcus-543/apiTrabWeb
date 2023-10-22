const { Router } = require('express')
const { create, findAll, findOne, update, remove } = require('../controllers/clientes.controller.js')
const { validaCampos, validaCpf, validaId } = require('../middlewares/clientes.middleware.js')

const clientesRouter = Router()

clientesRouter.get('/', findAll)
clientesRouter.get('/:idCliente', validaId, findOne)
clientesRouter.post('/', validaCampos, validaCpf, create)
clientesRouter.put('/:idCliente', validaCampos, validaId, validaCpf, update)
clientesRouter.delete('/:idCliente', validaId, remove)

module.exports = clientesRouter