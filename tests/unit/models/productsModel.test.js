const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testes de productsModel.', () => {

  describe('Verificação da função (getAll / productsModel).', () => {

    before(async () => {
      const execute = [[{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      }]];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    })

    it('Deve retorna um array.', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });

    it('Dentro do array, deve haver um objeto.', async () => {
      const response = await productsModel.getAll();
      expect(response[0]).to.be.an('object');
    });

    it('Dentro do objeto, deve haver a propriedade "id".', async () => {
      const response = await productsModel.getAll();
      expect(response[0]).to.have.property('id');
    });
  });

  describe('Verificação da função (findById / productsModel)', () => {

    before(async () => {
      const result = [[{ id: 1 }]];
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Deve retorna um array.', async () => {
      const response = await productsModel.findById(1);
      expect(response).to.be.an('array');
    });

    it('Dentro do array, deve haver um objeto.', async () => {
      const response = await productsModel.findById(1);
      expect(response[0]).to.be.an('object');
      expect(response.length).to.be.equal(1);
    });

    it('Dentro do objeto, deve haver a propriedade "id".', async () => {
      const response = await productsModel.findById(1);
      expect(response[0]).to.have.property('id');
    });
  });

  describe('Verificação da função (updateProduct / productsModel)', () => {
    const id = 1;
    const name = 'skunk';
    const quantity = 2;

    before(() => {
      const execute = [{
        affectedRows: 1,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Deve retorna um objeto', async () => {
      const response = await productsModel.updateProduct(id, name, quantity);

      expect(response).to.be.a('object');
    });

    it('Deve retornar um objeto com as propriedades "id", "name"', async () => {
      const response = await productsModel.updateProduct(id, name);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
  });

  describe('Verificação da função (deleteProduct / productsModel)', () => {
    const id = 1;

    before(() => {
      const execute = [{
        affectedRows: 1,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Deve retornar um objeto', async () => {
      const response = await productsModel.deleteProduct(id);
      expect(response).to.be.a('object');
    });
  })
});
