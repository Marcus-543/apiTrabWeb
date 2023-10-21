const { findOneByCpfService, findOneByIdService } = require('../services/clientes.service.js')

const validaCampos = (req, res, next) => {
    try {
        const { nome, cpf } = req.body
        if (!nome || !cpf) {
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

const validaCpf = async (req, res, next) => {
    try {
        const cpf = req.body.cpf
        const cliente = await findOneByCpfService(cpf)
        if (cliente.length != 0) {
            return res.status(400).send({
                message: "cliente ja cadastrado"
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
        const cliente = await findOneByIdService(id)
        if (cliente.length == 0) {
            return res.status(404).send({
                message: "cliente nao cadastrado"
            })
        }
        req.id = id
        req.cliente = cliente[0]
        next()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    validaCampos,
    validaCpf,
    validaId
}