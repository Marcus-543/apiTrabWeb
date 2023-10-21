const { findOneByPlacaService, findOneByIdService } = require('../services/carros.service.js')

const validaCampos = (req, res, next) => {
    try {
        const { placa, cor } = req.body
        if (!placa || !cor) {
            return res.status(400).send({
                message: "envie todos os campos nescessarios"
            })
        }
        next()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const validaPlaca = async (req, res, next) => {
    try {
        const placa = req.body.placa
        const carro = await findOneByPlacaService(placa)
        if (carro.length != 0) {
            return res.status(400).send({
                message: "carro ja cadastrado"
            })
        }
        next()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const validaId = async (req, res, next) => {
    try {
        const id = req.params.id
        const carro = await findOneByIdService(id)
        if (carro.length == 0) {
            return res.status(404).send({
                message: "carro nao cadastrado"
            })
        }
        req.id = id
        req.carro = carro[0]
        next()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    validaCampos,
    validaPlaca,
    validaId
}