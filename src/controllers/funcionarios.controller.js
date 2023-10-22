const { createService,
        findAllService,
        updateService,
        removeService
} = require('../services/funcionarios.service.js')

const findAll = async (req, res) => {
    try {
        const funcionarios = await findAllService()
        if (funcionarios.length == 0) {
            res.status(400).send({
                message: "nenhum funcionario cadastrado"
            })
        }else{
            res.status(201).send(funcionarios)
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const funcionario = req.funcionario
        res.status(201).send(funcionario)

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const create = async (req, res) => {
    try {
        const funcionario = await createService(req.body)
        if (funcionario.insertId == 0) {
            res.status(400).send({
                message: "Erro ao cadastar o funcionario"
            })

        }else{
            res.status(201).send({
                    id: funcionario.insertId,
                    nome: req.body.nome,
                    cpf: req.body.cpf
                }
            )
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const update = async (req, res) => {
    try {
        const id = req.idFuncionario
        const funcionario = await updateService(id, req.body)
        if (funcionario.changedRows == 0) {
            res.status(400).send({
                message: "Erro ao atualizar o funcionario"
            })
        }else{
            res.status(201).send({
                    id,
                    nome: req.body.nome,
                    cpf: req.body.cpf
                }
            )
        }
        
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const remove = async (req, res) => {
    try {
        const id = req.idFuncionario
        const funcionarioDeletado = req.funcionario

        const funcionario = await removeService(id)
        if (funcionario.affectedRows == 0) {
            res.status(400).send({
                message: "erro ao remover funcionario"
            })
        }else{
            res.status(201).send(funcionarioDeletado)
        }
    
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    findAll,
    findOne,
    create,
    update,
    remove
}