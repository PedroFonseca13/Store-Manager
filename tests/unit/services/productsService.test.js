const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testes de productsService', () => {

  describe('Verifica se a função getAll lista todos os produtos', () => {

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
      sinon.stub(productsModel, 'getAll').returns(products)
    });

    after(() =>
      productsModel.getAll.restore()
    )

    it('Deve retornar um array de produtos', async () => {
      const result = await productsService.getAll()
      expect(result).to.be.an('array')
    })

    it('de objetos com propriedades "id", "name"', async () => {
      const response = await productsService.getAll();
      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
    });

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
        await productsModel.findById.restore()
      });

      it('Deve retornar o objeto do produto', async () => {
        const result = await productsService.findById(1);
        expect(result).to.be.an('object');
      });

      it('Deve possuir a propriedade "id" e "name"', async () => {
        const result = await productsService.findById(1);
        expect(result).to.have.a.property('id');
        expect(result).to.have.a.property('name');
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

      it('Deve retornar um objeto vazio', async () => {
        const result = await productsService.findById('9999')
        expect(result).to.be.an('object');
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

  describe('Deleta um produto no DB', () => {
    const id = 1;

    before(() => {
      const execute = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      };
      const execute1 = {
        id: 1,
      };

      sinon.stub(productsModel, 'findById').resolves(execute);
      sinon.stub(productsModel, 'deleteProduct').resolves(execute1);
    });

    after(() => {
      productsModel.findById.restore();
      productsModel.deleteProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.deleteProduct(id);

      expect(response).to.be.a('object');
    });

    it('com propriedades "id", "name" e "quantity"', async () => {
      const response = await productsService.deleteProduct(id);

      expect(response).to.have.a.property('id');
    });
  });
})
