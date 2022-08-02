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
});
