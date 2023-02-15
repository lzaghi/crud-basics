const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { saleMock, invalidIdSaleMock } = require("./mocks/sales.service.mock");

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

  afterEach(function () {
    sinon.restore();
  });
});