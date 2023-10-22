const { findOneByCpfService, findOneByIdService } = require('../services/funcionarios.service.js')

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
        const funcionario = await findOneByCpfService(cpf)
        if (funcionario.length != 0) {
            return res.status(400).send({
                message: "funcionario ja cadastrado"
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
        let id = 0
        if (req.params.idFuncionario) {
            id = req.params.idFuncionario
        }else{
            id = req.body.idFuncionario
        }

        const funcionario = await findOneByIdService(id)
        if (funcionario.length == 0) {
            return res.status(404).send({
                message: "funcionario nao cadastrado"
            })
        }
        req.idFuncionario = id
        req.funcionario = funcionario[0]
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