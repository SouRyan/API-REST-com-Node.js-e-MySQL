// express.js
const express = require("express");
const app = express();
const port = 3000;
const connection = require("./database");
// Middleware para interpretar JSON
app.use(express.json());
// Rota raiz para teste
app.get("/", (req, res) => {
  res.send("WebAPI com Node.js e MySQL");
});
// Endpoint para listar usuários
app.get("/funcionarios", (req, res) => {
  connection.query("SELECT * FROM funcionario", (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).send("Erro no servidor");
    }
    res.json(results);
  });
});
// Endpoint para criar um novo registro de usuário
app.post("/funcionarios", (req, res) => {
  const { nome, cargo, salario } = req.body;
  const query = "INSERT INTO funcionario (nome,cargo,salario) VALUES (?, ?, ?)";
  connection.query(query, [nome, cargo, salario], (err, result) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
      return res.status(500).send("Erro no servidor");
    }
    res.status(201).json({ id: result.insertId, nome, cargo, salario });
  });
});
// Endpoint para atualizar um usuário
app.put("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cargo, salario } = req.body;
  const query =
    "UPDATE funcionario SET nome = ?, cargo = ? , salario = ? WHERE id = ?";
  connection.query(query, [nome, cargo, salario, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).send("Erro no servidor");
    }
    res.json({ id, nome, cargo, salario });
  });
});
// Endpoint para deletar um usuário
app.delete("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM funcionario WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).send("Erro no servidor");
    }
    res.json({ message: "Usuário removido com sucesso!" });
  });
});
// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
