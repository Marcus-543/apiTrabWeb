const { Router } = require('express')
const { create, findAll, findOne, update, remove } = require('../controllers/funcionarios.controller.js')
const { validaCampos, validaCpf, validaId } = require('../middlewares/funcionarios.middleware.js')

const funcionariosRouter = Router()

funcionariosRouter.get('/', findAll)
funcionariosRouter.get('/:idFuncionario', validaId, findOne)
funcionariosRouter.post('/', validaCampos, validaCpf, create)
funcionariosRouter.put('/:idFuncionario', validaCampos, validaId, validaCpf, update)
funcionariosRouter.delete('/:idFuncionario', validaId, remove)

module.exports = funcionariosRouter