const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const carrosRouter = require('./src/routes/carros.route.js')
const clientesRouter = require('./src/routes/clientes.route.js')

const server = express()
const porta = 3000

server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))

server.use('/carros', carrosRouter)
server.use('/clientes', clientesRouter)

server.listen(porta, () => console.log('servidor rodando na porta: ' + porta))