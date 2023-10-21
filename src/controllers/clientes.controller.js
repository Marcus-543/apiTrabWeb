const { createService,
        findAllService,
        updateService,
        removeService
} = require('../services/clientes.service.js')

const findAll = async (req, res) => {
    try {
        const clientes = await findAllService()
        if (clientes.length == 0) {
            res.status(400).send({
                message: "nenhum cliente cadastrado"
            })
        }else{
            res.status(201).send(clientes)
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const cliente = req.cliente
        res.status(201).send(cliente)

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const create = async (req, res) => {
    try {
        const cliente = await createService(req.body)
        if (cliente.insertId == 0) {
            res.status(400).send({
                message: "Erro ao cadastar o cliente"
            })

        }else{
            res.status(201).send({
                    id: cliente.insertId,
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
        const id = req.id
        const cliente = await updateService(id, req.body)
        if (cliente.changedRows == 0) {
            res.status(400).send({
                message: "Erro ao atualizar o cliente"
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
        const id = req.id
        const clienteDeletado = req.cliente

        const cliente = await removeService(id)
        if (cliente.affectedRows == 0) {
            res.status(400).send({
                message: "erro ao remover cliente"
            })
        }else{
            res.status(201).send(clienteDeletado)
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