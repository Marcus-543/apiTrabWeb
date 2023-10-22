const { findAllService, findOneByIdService } = require('../services/alugueis.service.js')

const validaCampos = (req, res, next) => {
    try {
        const { idCarro, idCliente, numDias } = req.body
        if (!idCarro || !idCliente || !numDias) {
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

const validaDispCarro = async (req, res, next) => {
    try {
        let id = 0
        if (req.params.idCarro) {
            id = req.params.idCarro
        }else{
            id = req.body.idCarro
        }

        const alugueis = await findAllService()
        for(aluguel in alugueis){
            if (aluguel.idCarro == id){
                const dataAluguel = aluguel.data
                const numDias = aluguel.numDias

                const dia = parseInt(dataAluguel.substr(0, 2));
                const mes = parseInt(dataAluguel.substr(2, 2)) - 1;
                const ano = 2000 + parseInt(dataAluguel.substr(4, 2));

                const dataAluguelObj = new Date(ano, mes, dia);
                dataAluguelObj.setDate(dataAluguelObj.getDate() + numDias);

                const dataAtual = new Date();
                if ( !(dataAtual > dataAluguelObj) ) {
                    return res.status(400).send({
                        message: "o carro informado esta em um aluguel ativo"
                    })
                }
            }
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
        const id = req.params.idAluguel
        const aluguel = await findOneByIdService(id)
        if (aluguel.length == 0) {
            return res.status(404).send({
                message: "aluguel nao cadastrado"
            })
        }
        req.idAluguel = id
        req.aluguel = aluguel[0]
        next()
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    validaCampos,
    validaDispCarro,
    validaId
}