const bdConexao = require('../bdConexao/bdConexao.js')

const findAllService = () => {
  return new Promise((aceito, rejeitado)=>{
    bdConexao.query('SELECT * FROM alugueis', (error, results)=>{
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
    bdConexao.query('SELECT * FROM alugueis WHERE idalugueis = ?',[id], (error, results)=>{
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
    bdConexao.query('INSERT INTO alugueis SET ?', body, (error, results)=>{
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
    bdConexao.query('UPDAte alugueis SET dataAluguel = ?, numDias = ?, idCarro = ?, idCliente = ?, idFuncionario = ? WHERE idalugueis = ?',
      [body.dataAluguel, body.numDias, body.idCarro, body.idCliente, body.idFuncionario, id], (error, results)=>{
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
    bdConexao.query('DELETE FROM alugueis WHERE idalugueis = ?',[id], (error, results)=>{
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
    findOneByIdService,
    createService,
    updateService,
    removeService
}