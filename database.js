// database.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
host: 'localhost',
user: 'Thunder',
password: 'root',
database: 'funcionarios'
});
connection.connect((err) => {
if (err) {
console.error('Erro ao conectar ao MySQL:', err);
return;
}
console.log('Conectado ao MySQL com sucesso!');
});
module.exports = connection;