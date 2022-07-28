const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Test layer services', () => {

  describe('test getAll function and list all products', () => {

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

    beforeEach(async () => {
      sinon.stub(productsModel, 'getAll').resolves(products)
    });

    afterEach(() =>
      productsModel.getAll.restore()
    )

    it('should be return a array', async () => {
      const result = await productsService.getAll()
      expect(result).to.be.an('array')
    })

  })

  describe('test function getById', () => {

    describe('when find product by id', () => {
      const productByID = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        }
      ];

      beforeEach(async () => {
        await sinon.stub(productsModel, 'findById').resolves(productByID)
      })

      afterEach(async () => {
        await productsModel.getById.restore()
      })

      it('should be a array', async () => {
        const result = await productsService.findById('1')
        expect(result).to.be.an('array');
      })

      it('should have a id and name', async () => {
        const result = await productsService.findById('1')
        expect(result).to.deep.equal(productByID);
      })


    });

    describe('when not find by id', () => {
      const notFound = [{}];

      beforeEach(async () => {
        await sinon.stub(productsModel, 'findById').resolves(notFound)
      })

      afterEach(async () => {
        await productsModel.findById.restore()
      })

      it('should be a array', async () => {
        const result = await productsService.findById('9999')
        expect(result).to.be.an('array');
      })
    })

  })

})
