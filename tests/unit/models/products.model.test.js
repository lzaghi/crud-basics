const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");

const { products, newProduct } = require("./mocks/products.model.mock");

describe('Testes de unidade productsModel', function () {
  it('Recupera lista de produtos em GET /products', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Recupera produto por id em GET /products/:id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastra um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 7 }]);

    const result = await productsModel.insertProduct(newProduct);

    expect(result).to.equal(7);
  });

  it('Atualiza um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await productsModel.updateProduct(newProduct, 1);

    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});