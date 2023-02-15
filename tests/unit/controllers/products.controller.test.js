const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { productsController } = require("../../../src/controllers");
const { productsService } = require("../../../src/services");
const { productsListMock, newProductMock } = require("./mocks/products.controller.mock");

describe('Testes de unidade productsController', function () {
  it('Recupera lista de produtos em GET /products com status 200', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(productsService, 'getAll')
      .resolves({ type: null, message: productsListMock});

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([
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
    ])
  });

  it('Recupera produto por id em GET /products/:id com status 200', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: null, message: productsListMock[0]});

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(
      {
        "id": 1,
        "name": "Martelo de Thor"
      })
  });

  it('Retorna erro caso produto não encontrado em GET /products/:id com status 404', async function () {
    const res = {};
    const req = {
      params: { id: 999 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found'});

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
  });

  it('Cadastro válido de produto retorna novo produto com 201', async function () {
    const res = {};
    const req = {
      body: newProductMock,
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(productsService, 'insertProduct')
      .resolves({ type: null, message : { id: 7, ...newProductMock }})
    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      "id": 7,
      "name": "Bermuda do Hulk",
    });
  });

  it('Cadastro inválido por nome de produto retorna erro', async function () {
    const res = {};
    const req = {
      body: 'Hulk',
    }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, 'insertProduct')
      .resolves({ type: 'INVALID_VALUE', message : '"name" length must be at least 5 characters long'})
    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Atualização válida de produto retorna novo produto com 200', async function () {
    const res = {};
    const req = {
      body: newProductMock,
      params: { id: 1},
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(productsService, 'updateProduct')
      .resolves({ type: null, message : { id: 1, ...newProductMock }})
    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      "id": 1,
      "name": "Bermuda do Hulk",
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});