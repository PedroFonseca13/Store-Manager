const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testes de productsModel', () => {

  describe('Verifica se retorna todos os produtos.', () => {

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
      await sinon.stub(connection, 'execute').resolves(products)
    });

    afterEach(async () => await connection.execute.restore());

    it('Verifica se é um objeto.', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.a('object');
    });
  })

  describe('Verifica se encontra o produto pelo ID.', () => {

    describe('Procurando o produto.', () => {

      const product = [{}];

      beforeEach(async () => {
        await sinon.stub(connection, 'execute').resolves(product);
      });

      afterEach(async () => await connection.execute.restore());

      it('Deve retornar um objeto vazio.', async () => {
        const result = await productsModel.findById('a')
        expect(result).to.be.a('object')
      });
    })

    describe('Verifica o retorno de um ID inexistente.', () => {

      const productByID = [{
        "id": 1,
        "name": "Martelo de Thor",
      }];

      beforeEach(async () => {
        await sinon.stub(connection, 'execute').resolves(productByID);
      });

      afterEach(async () => await connection.execute.restore());

      it('should be a object with a product', async () => {
        const result = await productsModel.findById(1)
        expect(result).to.be.a('object')
      });

      it('should have a id and name with a product', async () => {
        const result = await productsModel.findById(1)
        expect(result).to.deep.equal({
          "id": 1,
          "name": "Martelo de Thor",
        })
      });
    });
  });
});
