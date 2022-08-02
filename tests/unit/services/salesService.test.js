const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Retorna todos as vendas', () => {
  describe('quando inserido com sucesso', () => {
    before(() => {
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

      sinon.stub(salesModel, 'getAll').resolves(execute);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.a('array');
    });

    it('de objetos com "saleId", "date", "productId" e "quantity"', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });

  });
});
