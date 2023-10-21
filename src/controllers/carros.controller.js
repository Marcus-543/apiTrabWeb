const { createService,
        findAllService,
        findOneService,
        updateService,
        removeService
} = require('../services/carros.service.js')

const findAll = async (req, res) => {
    try {
        const carros = await findAllService()

        if (carros.length == 0) {
            res.status(400).send({
                message: "nenhum carro cadastrado"
            })
        }else{
            res.status(201).send(carros)
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const id = req.params.id
        const carro = await findOneService(id)
 
        if (carro.length == 0) {
            res.status(400).send({
                message: "carro nao cadastrado"
            })
        }else{
            res.status(201).send(carro[0])
        }
    
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const create = async (req, res) => {
    try {
        const { placa, cor } = req.body

        if (!placa || !cor) {
            res.status(400).send({
                message: "envie todos os campos nescessarios"
            })
        }

        const carro = await createService(req.body)

        if (carro.insertId == 0) {
            res.status(400).send({
                message: "Erro ao cadastar o carro"
            })

        }else{
            res.status(201).send({
                    id: carro.insertId,
                    placa,
                    cor
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
        const { placa, cor } = req.body
        const id = req.params.id

        if (!placa || !cor) {
            res.status(400).send({
                message: "envie todos os campos nescessarios"
            })
        }

        const carro = await updateService(id, req.body)

        if (carro.changedRows == 0) {
            res.status(400).send({
                message: "Erro ao atualizar o carro"
            })
        }else{
            res.status(201).send({
                    id,
                    placa,
                    cor
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
        const id = req.params.id
        const carroDeletado = await findOneService(id)
        const carro = await removeService(id)

        if (carro.affectedRows == 0) {
            res.status(400).send({
                message: "erro ao remover carro"
            })
        }else{
            res.status(201).send(carroDeletado[0])
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