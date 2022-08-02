const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { expect } = require('chai');

describe('Testes do salesController', () => {
  describe('Testa a função (getAll / salesController).', () => {
    const response = {};
    const request = {};

    before(async () => {
      const execute = [{
        saleId: 1,
        date: "2021-09-09 00:45:23",
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 2,
        date: "2021-09-09 00:45:23",
        productId: 2,
        quantity: 10,
      }];

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      await sinon.stub(salesService, 'getAll').resolves(execute);
    });

    after(async () => {
      salesService.getAll.restore();
    });

    it('Deve retornar um status 200.', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array das vendas', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Testa a função (findById / salesController).', () => {
    const response = {};
    const request = {};
    request.params = { id: '1' };

    before(() => {
      const execute = [{
        date: "2021-09-09 00:45:23",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2021-09-09 00:45:23",
        productId: 2,
        quantity: 10,
      }];

      response.status = sinon.stub().returns(response);

      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'findById').resolves(execute);
    });

    after(() => {
      salesService.findById.restore();
    });

    it('é chamado o código 200', async () => {
      await salesController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array da venda', async () => {
      await salesController.findById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

  describe('Testa a função (deleteSale / salesController).', () => {
    const response = {};
    const request = {};
    request.params = { id: 1 }

    before(() => {
      const execute = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);

      response.end = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').resolves(execute);
    });

    after(() => {
      salesService.deleteSale.restore();
    });

    it('é chamado o código 204', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});
