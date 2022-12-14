const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');


describe('Testes do productsController', () => {

  describe('Testa a função (getAll / productsController).', () => {

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

    it('Deve retornar um status 200.', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(products)).to.be.equal(true);
    });

    it('Deve retornar um json com o array dos produtos.', async () => {
      const t = await productsController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Testa a função (findById / productsController).', () => {
    describe('quando existe o produto', () => {

      const res = {};
      const req = {};
      const product = { data: [{ id: 1 }], status: 200 };
      const paramID = 1;

      before(async () => {
        req.params = sinon.stub().returns(paramID);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'findById').resolves(product);
      })

      after(async () => {
        productsService.findById.restore()
      })

      it('Deve retornar um status 200', async () => {
        await productsController.findById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Deve retonar o produto correto', async () => {
        await productsController.findById(req, res);
        expect(res.json.calledWith(product)).to.equal(true);
      });
    });
  });

  describe('Testa a função (registerProduct / productsController).', () => {
    describe('quando existe o produto', () => {
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

      it('Deve retornar um status 200', async () => {
        await productsController.registerProduct(req, res)
        expect(res.status.calledWith(201)).to.be.equal(true);
        expect(res.json.calledWith(product)).to.be.equal(true);
      })
    });
  });

  describe('Testa a função (updateProduct / productsController).', () => {
    describe('quando existe o produto', () => {
      const response = {};
      const request = {};
      request.body = { name: "Martelo de Thor", quantity: 10 };
      request.params = { id: 1 };

      before(() => {
        const execute = {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
        };

        response.status = sinon.stub().returns(response);

        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'updateProduct').resolves(execute);
      });

      after(() => {
        productsService.updateProduct.restore();
      });

      it('é chamado o código 200', async () => {
        await productsController.updateProduct(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o json com o objeto do produto', async () => {
        await productsController.updateProduct(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});
