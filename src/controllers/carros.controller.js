const { createService,
        findAllService,
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
        const carro = req.carro
        res.status(201).send(carro)

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const create = async (req, res) => {
    try {
        const carro = await createService(req.body)
        if (carro.insertId == 0) {
            res.status(400).send({
                message: "Erro ao cadastar o carro"
            })
        }else{
            res.status(201).send({
                    id: carro.insertId,
                    placa: req.body.placa,
                    cor: req.body.cor
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
        const id = req.idCarro
        const carro = await updateService(id, req.body)
        if (carro.changedRows == 0) {
            res.status(400).send({
                message: "Erro ao atualizar o carro"
            })
        }else{
            res.status(201).send({
                    id,
                    placa: req.body.placa,
                    cor: req.body.cor
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
        const id = req.idCarro
        const carroDeletado = req.carro

        const carro = await removeService(id)
        if (carro.affectedRows == 0) {
            res.status(400).send({
                message: "erro ao remover carro"
            })
        }else{
            res.status(201).send(carroDeletado)
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