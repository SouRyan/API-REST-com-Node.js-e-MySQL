# API REST para Gerenciamento de Funcionários

Esta é uma API REST simples para gerenciamento de funcionários, construída com Node.js, Express e MySQL.

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 8.0 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Configuração

1. Clone ou baixe este repositório para o seu computador.

2. Instale as dependências do projeto:
   ```
   npm install
   ```

3. Configure o banco de dados MySQL:
   - Crie um banco de dados chamado `funcionarios`
   - Importe o arquivo `dump.sql` para criar a tabela e os dados iniciais:
     ```
     mysql -u seu_usuario -p funcionarios < dump.sql
     ```

4. Configure as variáveis de ambiente:
   - Copie o arquivo `.example.env` para um novo arquivo chamado `.env`
   - Edite o arquivo `.env` com suas configurações de banco de dados:
     ```
     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=funcionarios
     PORT=3000
     ```

## Executando a API

Para iniciar o servidor em modo de produção:
```
npm start
```

Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática):
```
npm run dev
```

O servidor estará disponível em `http://localhost:3000` (ou na porta que você configurou).

## Documentação da API

A API está documentada usando Swagger UI. Para acessar a documentação interativa, acesse:
```
http://localhost:3000/api-docs
```

Na documentação Swagger você encontrará:
- Descrição detalhada de todos os endpoints
- Estrutura dos corpos de requisição
- Exemplos de respostas
- Possibilidade de testar os endpoints diretamente da interface

## Endpoints da API

### GET /
- **Descrição**: Página inicial da API
- **Resposta**: Mensagem de boas-vindas

### GET /funcionarios
- **Descrição**: Lista todos os funcionários
- **Resposta**: Array de objetos com dados dos funcionários

### POST /funcionarios
- **Descrição**: Cria um novo funcionário
- **Corpo da Requisição**:
  ```json
  {
    "nome": "string",
    "cargo": "string",
    "salario": "number"
  }
  ```
- **Resposta**: Dados do funcionário criado

### PUT /funcionarios/:id
- **Descrição**: Atualiza um funcionário existente
- **Parâmetros**:
  - `id`: ID do funcionário a ser atualizado
- **Corpo da Requisição**:
  ```json
  {
    "nome": "string",
    "cargo": "string",
    "salario": "number"
  }
  ```
- **Resposta**: Dados atualizados do funcionário

### DELETE /funcionarios/:id
- **Descrição**: Remove um funcionário
- **Parâmetros**:
  - `id`: ID do funcionário a ser removido
- **Resposta**: Mensagem de confirmação

## Exemplo de uso

### Criar um novo funcionário
```
POST http://localhost:3000/funcionarios
Content-Type: application/json

{
  "nome": "João Silva",
  "cargo": "Desenvolvedor",
  "salario": 5000
}
```

### Atualizar um funcionário
```
PUT http://localhost:3000/funcionarios/1
Content-Type: application/json

{
  "nome": "João Silva",
  "cargo": "Desenvolvedor Senior",
  "salario": 6000
}
```

### Deletar um funcionário
```
DELETE http://localhost:3000/funcionarios/1
```

## Solução de problemas

Se você encontrar problemas ao conectar ao banco de dados, verifique:
1. Se o MySQL está em execução
2. Se as credenciais no arquivo `.env` estão corretas
3. Se o banco de dados `funcionarios` foi criado e o arquivo `dump.sql` foi importado corretamente 
