const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');


describe('Testes do controller', () => {

  describe('Testa a função getAll', () => {

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

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(products)

      sinon.stub(productsService, 'getAll').resolves(products);
    })

    after(() => {
      sinon.restore()
    })

    it('Deve retornar um status 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });

    it('Deve retornar um json ', async () => {
      await productsController.getAll(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Test function findById', () => {

    const product = [
      {
        "id": 1,
        "name": "Martelo de Thor",
      }
    ];

    const res = {};
    const req = {};
    const next = () => { };

    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(product)
      req.params = sinon.stub().returns(1)

      sinon.stub(productsService, 'findById').resolves(product);
    })

    after(() => {
      sinon.restore()
    })

    it('Deve retornar um status 200', async () => {
      await productsController.findById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(product)).to.be.equal(true);
    });

    it('Deve retonar um json', async () => {
      await productsController.findById(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Testa a função registerProduct', () => {
    const product = [
      {
        id: '1',
        name: 'Martelo de Thor'
      },
    ];

    const req = {};
    const res = {};
    const next = () => { };


    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(product)
      req.body = sinon.stub().returns()

      sinon.stub(productsService, 'registerProduct').resolves(product);
    })

    after(() => {
      sinon.restore()
    })

    it('its called the with de status code 200', async () => {
      await productsController.registerProduct(req, res)
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(product)).to.be.equal(true);
    })
  });

  describe('Ao chamar o controller de deleteProduct', () => {
    describe('quando não existe o produto', () => {
      const response = {};
      const request = {};
      request.params = { id: 1 };

      before(() => {
        const execute = false;

        response.status = sinon.stub().returns(response);

        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'deleteProduct').throws({ status: 404, message: 'Product not found' });
      });

      after(() => {
        productsService.deleteProduct.restore();
      });

      it('é chamado o código 404', async () => {
        await productsController.deleteProduct(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o objeto de erro', async () => {
        await productsController.deleteProduct(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

    });

    describe('quando existe o produto', () => {
      const response = {};
      const request = {};
      request.params = { id: 1 };

      before(() => {
        const execute = {
          id: 1,
        };

        response.status = sinon.stub().returns(response);

        response.end = sinon.stub().returns();

        sinon.stub(productsService, 'deleteProduct').resolves(execute);
      });

      after(() => {
        productsService.deleteProduct.restore();
      });

      it('é chamado o código 204', async () => {
        await productsController.deleteProduct(request, response);

        expect(response.status.calledWith(204)).to.be.equal(true);
      });

    });

  });
});
