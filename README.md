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
   - Copie o arquivo `.env.example` para um novo arquivo chamado `.env`
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

## Endpoints da API

- `GET /` - Página inicial
- `GET /funcionarios` - Lista todos os funcionários
- `POST /funcionarios` - Cria um novo funcionário
- `PUT /funcionarios/:id` - Atualiza um funcionário existente
- `DELETE /funcionarios/:id` - Remove um funcionário

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