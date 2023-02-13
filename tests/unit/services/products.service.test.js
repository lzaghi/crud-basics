const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");

const { productsList } = require("./mocks/products.service.mock");

describe('Testes de unidade productsService', function () {
  it('Recupera lista de produtos em GET /products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsList);

    const result = await productsService.getAll();

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal([
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ]);
  });

  it('Recupera produto caso id existente em GET /products/:id', async function () {
    sinon.stub(productsModel, 'getById').resolves(productsList[0]);

    const result = await productsService.getById(1);

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal({
        "id": 1,
        "name": "Martelo de Thor"
      });
  });

  it('Retorna erro caso produto não exista em GET /products/:id', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.getById(1);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND')
    expect(result.message).to.be.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});