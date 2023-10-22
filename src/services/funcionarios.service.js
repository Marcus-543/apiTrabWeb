const bdConexao = require('../bdConexao/bdConexao.js')

const findAllService = () => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('SELECT * FROM funcionarios', (error, results)=>{
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
    bdConexao.query('SELECT * FROM funcionarios WHERE cpf = ?',[cpf], (error, results)=>{
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
    bdConexao.query('SELECT * FROM funcionarios WHERE idfuncionarios = ?',[id], (error, results)=>{
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
    bdConexao.query('INSERT INTO funcionarios SET ?', body, (error, results)=>{
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
    bdConexao.query('UPDAte funcionarios SET nome = ?, cpf = ? WHERE idfuncionarios = ?',
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
    bdConexao.query('DELETE FROM funcionarios WHERE idfuncionarios = ?',[id], (error, results)=>{
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