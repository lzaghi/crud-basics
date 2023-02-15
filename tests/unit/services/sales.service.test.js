const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { saleMock, invalidIdSaleMock, salesMock } = require("./mocks/sales.service.mock");

describe('Testes de unidade salesService', function () {
it('Cadastro válido de venda retorna a nova venda', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(1);

    const result = await salesService.insertSale(saleMock);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal({
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    });
  });

  it('Cadastro inválido de venda por productId retorna erro', async function () {
    const result = await salesService.insertSale(invalidIdSaleMock)

    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('Recupera lista de vendas em GET /sales', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesMock);

    const result = await salesService.getAll();

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal([
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 2,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]);
  });

  it('Recupera venda caso id existente em GET /sales/:id', async function () {
    sinon.stub(salesModel, 'getById').resolves([salesMock[0]]);

    const result = await salesService.getById(1);

    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.deep.equal([{
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    }]);
  });

  it('Retorna erro caso venda não exista em GET /sales/:id', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const result = await salesService.getById(1);

    expect(result.type).to.be.equal('SALE_NOT_FOUND')
    expect(result.message).to.be.deep.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});