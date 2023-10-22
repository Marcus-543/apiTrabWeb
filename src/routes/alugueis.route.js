const { Router } = require('express')
const { create, findAll, findOne, update, remove } = require('../controllers/alugueis.controller.js')

const carrosMiddlewares = require('../middlewares/carros.middleware.js')
const clientesMiddlewares = require('../middlewares/clientes.middleware.js')
const funcionariosMiddlewares = require('../middlewares/funcionarios.middleware.js')
const alugueisMiddlewares = require('../middlewares/alugueis.middleware.js')

const alugueisRouter = Router()

alugueisRouter.get('/', findAll)
alugueisRouter.get('/:idAluguel', alugueisMiddlewares.validaId, findOne)
alugueisRouter.post('/', alugueisMiddlewares.validaCampos, carrosMiddlewares.validaId, alugueisMiddlewares.validaDispCarro, clientesMiddlewares.validaId, funcionariosMiddlewares.validaId, create)
alugueisRouter.put('/:idAluguel', alugueisMiddlewares.validaCampos, alugueisMiddlewares.validaId, carrosMiddlewares.validaId, alugueisMiddlewares.validaDispCarro, clientesMiddlewares.validaId, funcionariosMiddlewares.validaId, update)
alugueisRouter.delete('/:idAluguel', alugueisMiddlewares.validaId, remove)

module.exports = alugueisRouter