const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesController } = require("../../../src/controllers");
chai.use(sinonChai);
const { salesService } = require("../../../src/services");
const { saleMock, noIdSaleMock, noQuantitySaleMock, salesMock } = require("./mocks/sales.controller.mock");

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

  it('Recupera lista de vendas em GET /sales com status 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(salesService, 'getAll')
      .resolves({ type: null, message: salesMock});

    await salesController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([
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
    ])
  });

  it('Recupera venda por id em GET /sales/:id com status 200', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(salesService, 'getById')
      .resolves({ type: null, message: [salesMock[0]] });

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([{
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    }])
  });

  it('Retorna erro caso venda não encontrado em GET /sales/:id com status 404', async function () {
    const res = {};
    const req = {
      params: { id: 999 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(salesService, 'getById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found'});

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' })
  });


  afterEach(function () {
    sinon.restore();
  });
});