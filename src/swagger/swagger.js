const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Shop API',
    description: 'API para CRUD de produtos e vendas de uma loja',
  },
  host: 'localhost:3000',
  schemes: ['http'], // protocolos http e/ou https

  // definitions: {
  //   Products: [
  //     {
  //       id: 1,
  //       name: 'Martelo de Thor',
  //     },
  //     {
  //       id: 2,
  //       name: 'Traje de encolhimento',
  //     },
  //     {
  //       id: 3,
  //       name: 'Escudo do Capitão América',
  //     },
  //   ],
  // },
};

const outputFile = './swagger.json';
const endpointsFiles = ['../app.js'];

/* NOTE: if you use the express Router, you must pass in the 
  'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);