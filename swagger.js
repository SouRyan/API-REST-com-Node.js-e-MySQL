// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST com Node.js e MySQL',
      version: '1.0.0',
      description: 'Documentação da API com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Altere se a porta for diferente
      },
    ],
  },
  apis: ['./express.js'], // Caminho para os arquivos com as rotas e anotações
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
