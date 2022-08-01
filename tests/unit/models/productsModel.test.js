const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testes de productsModel', () => {

  describe('Verificação do getAll', () => {
    const produtcs = [
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
      sinon.stub(connection, 'execute').returns([produtcs]);
    });

    after(async () => {
      connection.execute.restore();
    })

    it('retorna um array de produtos', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.a('array');
    })
  });

  describe('Verificação do findById', () => {

    const product = {
      id: '1',
      name: 'Martelo de Thor'
    }

    before(async () => {
      sinon.stub(connection, 'execute').returns([[product]])
    })

    after(async () => {
      connection.execute.restore();
    })

    it('Retorna um objeto que representa o produto', async () => {

      const response = await productsModel.findById(1);
      expect(response).to.be.a('object')
    })

    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(productsModel.findById(0)).to.eventually.be.rejected;
    });

    it('deve retornar nada caso o connection.query retorne uma lista vazia', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(productsModel.findById(0)).to.eventually.be.undefined;
    });

    it('deve retornar um objeto caso o connection.query retorne um item na lista', () => {

    });
  });

  describe('Verificação do registerProduct', () => {
    const product = {
      id: '4',
      name: 'Martelo de Thor'
    }

    before(async () => {
      sinon.stub(connection, 'execute').returns([[product]])
    });

    after(async () => {
      connection.execute.restore();
    })

    it('Retorna um objeto que representa o produto', async () => {
      const { name } = product
      const response = await productsModel.registerProduct(name);
      expect(response).to.be.a('object')
    })
  });
});
