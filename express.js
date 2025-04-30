// express.js
const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const connection = require("./database");
// Middleware para interpretar JSON
app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota raiz para teste da API
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
app.get("/", (req, res) => {
  res.send("WebAPI com Node.js e MySQL");
});

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Retorna todos os funcionários
 *     responses:
 *       200:
 *         description: Lista de funcionários
 *       500:
 *         description: Erro no servidor
 */
app.get("/funcionarios", (req, res) => {
  connection.query("SELECT * FROM funcionario", (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).send("Erro no servidor");
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               salario:
 *                 type: number
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
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

/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Atualiza um funcionário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               salario:
 *                 type: number
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       500:
 *         description: Erro no servidor
 */
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

/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Remove um funcionário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *       500:
 *         description: Erro no servidor
 */
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

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
