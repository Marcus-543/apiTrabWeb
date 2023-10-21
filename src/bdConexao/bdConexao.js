const mysql = require('mysql');

const bdconexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'locadora'
});

bdconexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL como ID ' + bdconexao.threadId);
});

module.exports = bdconexao