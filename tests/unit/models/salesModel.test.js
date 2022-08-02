const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Testes de salesModel', () => {
  describe('Verificação da função getAll.', () => {

    before(() => {
      const execute = [[{
        sale_id: 1,
        date: "2021-09-09 00:45:23",
        product_id: 1,
        quantity: 5,
      },
      {
        sale_id: 2,
        date: "2021-09-09 00:45:23",
        product_id: 2,
        quantity: 10,
      }]];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    describe('quando é inserido com sucesso', async () => {

      it('retorna um array', async () => {
        const response = await salesModel.getAll();

        expect(response).to.be.a('array');
      });

      // it('de objetos com "saleId", "date", "productId" e "quantity"', async () => {
      //   const response = await salesModel.getAll();

      //   expect(response[0]).to.have.a.property('saleId');
      //   expect(response[0]).to.have.a.property('date');
      //   expect(response[0]).to.have.a.property('productId');
      //   expect(response[0]).to.have.a.property('quantity');
      // });
    })
  });

  describe('Verificação da função findById', () => {
    const saleId = 1;

    before(() => {
      const execute = [[{
        date: "2021-09-09 00:45:23",
        product_id: 1,
        quantity: 5,
      },
      {
        date: "2021-09-09 00:45:23",
        product_id: 2,
        quantity: 10,
      }]];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    describe('quando é inserido com sucesso', async () => {

      it('retorna um array', async () => {
        const response = await salesModel.findById(saleId);

        expect(response).to.be.a('array');
      });

      // it('de objetos com "date", "productId" e "quantity"', async () => {
      //   const response = await salesModel.findById(saleId);

      //   expect(response[0]).to.have.a.property('date');
      //   expect(response[0]).to.have.a.property('productId');
      //   expect(response[0]).to.have.a.property('quantity');
      // });
    })
  });

  describe('Cria vendas no DB sales', () => {

    before(() => {
      const execute = [{
        insertId: 1,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    describe('quando é inserido com sucesso', async () => {

      it('retorna um objeto', async () => {
        const response = await salesModel.insertData();

        expect(response).to.be.a('object');
      });

      it('com a propriedade "id"', async () => {
        const response = await salesModel.insertData();

        expect(response).to.have.a.property('id');
      });

    })
  })

  describe('Verifica a função de create em salesModel', () => {
    const sales = [
      {
        id: '1',
        name: 'Martelo de Thor'
      },
      {
        id: '2',
        name: 'Traje de encolhimento'
      }
    ]

    before(async () => {
      sinon.stub(connection, 'execute').resolves(sales);
    })

    after(async () => {
      connection.execute.restore()
    })

    it('Deve retorna um array.', async () => {
      const result = await salesModel.registerSales(sales);
      expect(result).to.be.a('object');
    })
  });

  describe('Atualiza vendas no DB sales_products', () => {
    const id = 1;
    const product_id = 1;
    const quantity = 5;

    before(() => {
      const execute = [{
        affectedRow: 1,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    describe('quando é inserido com sucesso', async () => {

      it('retorna um objeto', async () => {
        const response = await salesModel.updateSales(id, product_id, quantity);

        expect(response).to.be.a('object');
      });

      // it('com propriedades "productId" e "quantity"', async () => {
      //   const response = await salesModel.updateSales(id, product_id, quantity);

      //   expect(response).to.have.a.property('productId');
      //   expect(response).to.have.a.property('quantity');
      // });

    })
  })

  describe('Deleta vendas no DB sales', () => {
    const id = 1;

    before(() => {
      const execute = [{
        affectedRow: 1,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    })

    after(() => {
      connection.execute.restore();
    })

    describe('quando é inserido com sucesso', async () => {

      it('retorna um objeto', async () => {
        const response = await salesModel.deleteSale(id);

        expect(response).to.be.a('object');
      });

      // it('com propriedades "id"', async () => {
      //   const response = await salesModel.deleteSale(id);

      //   expect(response).to.have.a.property('id');
      // });

    })
  })
})
