const { createService,
        findAllService,
        updateService,
        removeService
} = require('../services/alugueis.service.js')

const findAll = async (req, res) => {
    try {
        const alugueis = await findAllService()
        if (alugueis.length == 0) {
            res.status(400).send({
                message: "nenhum aluguel cadastrado"
            })
        }else{
            res.status(201).send(alugueis)
        }

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const findOne = async (req, res) => {
    try {
        const aluguel = req.aluguel
        res.status(201).send(aluguel)

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

const create = async (req, res) => {
    try {
        const aluguel = await createService(req.body)
        if (aluguel.insertId == 0) {
            res.status(400).send({
                message: "Erro ao cadastar o aluguel"
            })

        }else{
            res.status(201).send({
                    idAluguel: aluguel.insertId,
                    dataAluguel: req.body.dataAluguel,
                    numDias: req.body.numDias,

                    cliente: req.cliente,
                    carro: req.carro,
                    funcionario: req.funcionario
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
        const id = req.idAluguel
        const aluguel = await updateService(id, req.body)
        if (aluguel.changedRows == 0) {
            res.status(400).send({
                message: "Erro ao atualizar o aluguel"
            })
        }else{
            const { nomeFuncionario, cpfFuncionario } = req.funcionario
            res.status(201).send({
                    idAluguel: aluguel.insertId,
                    dataAluguel: req.body.dataAluguel,
                    numDias: req.body.numDias,

                    cliente: req.cliente,
                    carro: req.carro,
                    funcionario: {
                        nomeFuncionario,
                        cpfFuncionario
                    }
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
        const id = req.idAluguel
        const aluguelDeletado = req.aluguel

        const aluguel = await removeService(id)
        if (aluguel.affectedRows == 0) {
            res.status(400).send({
                message: "erro ao remover aluguel"
            })
        }else{
            res.status(201).send(aluguelDeletado)
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