const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');


describe('Testes do controller', () => {

  describe('Testa se o mock é válido', () => {

    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
    ];

    const res = {};
    const req = {};
    const next = () => { };

    beforeEach(async () => {
      sinon.stub(productsService, 'getAll').resolves(products);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(async () => {
      productsService.getAll.restore();
    });

    it('should have status 200', async () => {
      await productsController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('should have return a json ', async () => {
      await productsController.getAll(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Test function findById', () => {

    const productById = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    ];

    const res = {};
    const req = {};
    const next = () => { };

    beforeEach(async () => {
      req.params = '1';
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await sinon.stub(productsService, 'findById').resolves(productById);
    });

    afterEach(async () => {
      await productsService.findById.restore();
    });

    it('should have status 200', async () => {
      await productsController.findById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Deve retonar um json', async () => {
      await productsController.findById(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
