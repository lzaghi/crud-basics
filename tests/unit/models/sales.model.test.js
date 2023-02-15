const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { saleMock, salesMock } = require("./mocks/sales.model.mock");

describe('Testes de unidade salesModel', function () {
  it('Cadastra uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 7 }]]);

    const result = await salesModel.insertSale();

    expect(result).to.equal(8);
  });

  it('Cadastra produtos de uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 7 }]);

    const result = await salesModel.insertSaleProducts(saleMock, 1);

    expect(result).to.equal(7);
  });

  it('Recupera lista de vendas em GET /sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal([
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

  it('Recupera venda por id em GET /sales/:id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock[0]]);

    const result = await salesModel.getById(1);

    expect(result).to.be.deep.equal({
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});