const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const { productsRouter, salesRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// não remova esse endpoint, é para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.send();
// });

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;