const bdConexao = require('../bdConexao/bdConexao.js')

const findAllService = () => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('SELECT * FROM clientes', (error, results)=>{
      if(error){
        rejeitado(error)
        return
      }else{
        aceito(results)
      }
    })
  })
}

const findOneByCpfService = (cpf) => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('SELECT * FROM clientes WHERE cpf = ?',[cpf], (error, results)=>{
      if(error){
        rejeitado(error)
        return
      }else{
        aceito(results)
      }
    })
  })
}

const findOneByIdService = (id) => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('SELECT * FROM clientes WHERE idclientes = ?',[id], (error, results)=>{
      if(error){
        rejeitado(error)
        return
      }else{
        aceito(results)
      }
    })
  })
}

const createService = (body) => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('INSERT INTO clientes SET ?', body, (error, results)=>{
      if(error){
        rejeitado(error)
        return
      }else{
        aceito(results)
      }
    })
  })
} 

const updateService = (id, body) => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('UPDAte clientes SET nome = ?, cpf = ? WHERE idclientes = ?',
      [body.nome, body.cpf, id], (error, results)=>{
      if(error){
        rejeitado(error)
        return
      }else{
        aceito(results)
      }
    })
  })
} 

const removeService = (id) => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('DELETE FROM clientes WHERE idclientes = ?',[id], (error, results)=>{
      if(error){
        rejeitado(error)
        return
      }else{
        aceito(results)
      }
    })
  })
}

module.exports = {
    findAllService,
    findOneByCpfService,
    findOneByIdService,
    createService,
    updateService,
    removeService
}