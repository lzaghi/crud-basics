const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { saleMock } = require("./mocks/sales.model.mock");

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

  afterEach(function () {
    sinon.restore();
  });
});