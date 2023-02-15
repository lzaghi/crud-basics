const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesController } = require("../../../src/controllers");
chai.use(sinonChai);
const { salesService } = require("../../../src/services");
const { saleMock, noIdSaleMock, noQuantitySaleMock } = require("./mocks/sales.controller.mock");

describe('Testes de unidade salesController', function () {
  it('Cadastro válido de venda retorna nova venda com 201', async function () {
      const res = {};
      const req = {
        body: saleMock,
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon
        .stub(salesService, 'insertSale')
        .resolves({ type: null, message : { id: 7, itemsSold: saleMock }})
      await salesController.insertSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        "id": 7,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ],
      });
    });

  it('Cadastro inválido de venda por productId retorna erro', async function () {
      const res = {};
      const req = {
        body: noIdSaleMock,
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'insertSale')
        .resolves({ message : '"productId" is required'})
      await salesController.insertSale(req, res);

      expect(res.json).to.have.been.calledWith('"productId" is required');
  });
  
  it('Cadastro inválido de venda por quantity retorna erro', async function () {
      const res = {};
      const req = {
        body: noQuantitySaleMock,
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'insertSale')
        .resolves({ message : '"quantity" is required'})
      await salesController.insertSale(req, res);

      expect(res.json).to.have.been.calledWith('"quantity" is required');
  });

  afterEach(function () {
    sinon.restore();
  });
});