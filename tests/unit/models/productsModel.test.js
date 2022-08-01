const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testes de productsModel.', () => {

  describe('Verificação da função getAll.', () => {

    before(async () => {
      const result = [[{ id: 1 }]];
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    })
    describe('Se a requisição for bem sucedida.', () => {

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
  });

  describe('Verificação da função findById', () => {

    before(async () => {
      const result = [[{ id: 1 }]];
      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('Se a requisição for bem sucedida.', () => {
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
  });

  describe('Verificação da função registerProduct', () => {
    const MOCK_NAME = 'Steve Rogers'
    const MOCK_ID = 1

    before(async () => {
      const result = [{ insertId: MOCK_ID }];
      sinon.stub(connection, 'execute').resolves(result);
    });
    after(async () => {
      connection.execute.restore();
    });

    describe('Se a requisição for bem sucedida.', () => {
      it('Deve retornar um array', async () => {
        const response = await productsModel.registerProduct(MOCK_NAME);
        expect(response).to.be.an('array');
      });
      it('Dentro do array, deve haver um objeto.', async () => {
        const response = await productsModel.registerProduct(MOCK_NAME);
        expect(response[0]).to.be.an('object');
      });
      it('Dentro do objeto, deve haver a propriedade "id".', async () => {
        const response = await productsModel.registerProduct(MOCK_NAME);
        expect(response[0]).to.have.property('id');
        expect(response[0].id).to.be.equal(MOCK_ID);
      });
      it('Dentro do objeto, deve haver a propriedade "name".', async () => {
        const response = await productsModel.registerProduct(MOCK_NAME);
        expect(response[0]).to.have.property('name');
        expect(response[0].name).to.be.equal(MOCK_NAME);
      });
    })
  });

  describe('Verificação da função updateProduct', () => {
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

    describe('Se a requisição for bem sucedida.', async () => {
      it('Deve retorna um objeto', async () => {
        const response = await productsModel.updateProduct(id, name, quantity);

        expect(response).to.be.a('object');
      });

      it('Deve retornar um objeto com as propriedades "id", "name" e "quantity"', async () => {
        const response = await productsModel.updateProduct(id, name, quantity);

        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('quantity');
      });
    })
  });

  describe('Verificação da função deleteProduct', () => {

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

    describe('Se a requisição for bem sucedida.', async () => {
      it('retorna um objeto', async () => {
        const response = await productsModel.deleteProduct(id);
        expect(response).to.be.a('object');
      });

      it('com a propriedade "id"', async () => {
        const response = await productsModel.deleteProduct(id);
        expect(response).to.have.a.property('id');
      });
    })
  });
});
