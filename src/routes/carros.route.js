const { Router } = require('express')
const { create, findAll, findOne, update, remove } = require('../controllers/carros.controller.js')

const carrosRouter = Router()

carrosRouter.get('/', findAll)
carrosRouter.get('/:id', findOne)
carrosRouter.post('/', create)
carrosRouter.put('/:id', update)
carrosRouter.delete('/:id', remove)

module.exports = carrosRouter