const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Test layer services', () => {

  describe('Verifica se a funcção getAll lista todos os produtos', () => {

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

    before(async () => {
      sinon.stub(productsModel, 'getAll').returns([[products]])
    });

    after(() =>
      productsModel.getAll.restore()
    )

    it('Deve retornar um array de produtos', async () => {
      const result = await productsService.getAll()
      expect(result).to.be.an('array')
    })

  });

  describe('Verifica a função findById', () => {

    describe('Verifica se a função findById retorna o produto', () => {

      const productByID = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ];

      before(async () => {
        sinon.stub(productsModel, 'findById').resolves(productByID)
      });

      after(async () => {
        await productsModel.getById.restore()
      });

      it('Deve retornar o objeto do produto', async () => {
        const result = await productsService.findById(1)
        expect(result).to.be.an('object');
      });

      it('should have a id and name', async () => {
        const result = await productsService.findById(1)
        expect(result).to.deep.equal(productByID);
      });
    });

    describe('Verifica o id errado', () => {
      const notFound = [{}];

      before(async () => {
        await sinon.stub(productsModel, 'findById').resolves(notFound)
      });

      after(async () => {
        await productsModel.findById.restore()
      });

      it('Deve retornar um array', async () => {
        const result = await productsService.findById('9999')
        expect(result).to.be.an('array');
      });
    })

  });

  describe('Verifica a função newSale', () => {
    const product = {
      "id": 1,
      "name": "Martelo de Thor",
    }

    const { name } = product;

    before(async () => {
      sinon.stub(productsModel, 'registerProduct').resolves(product)
    });

    after(async () => {
      sinon.restore();
    })

    it('Deve retornar um objeto que represente o produto adicionado', async () => {
      const result = await productsService.registerProduct(name, product);
      expect(result).to.be.an('object')
    })
  });

})
