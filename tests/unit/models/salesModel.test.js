const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../connection');
const sinon = require('sinon');


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
    sinon.stub(connection, 'execute').returns(sales);
  })

  after(async () => {
    connection.execute.restore()
  })

  it('Deve retorna um array de sales', async () => {
    const result = await salesModel.registerSales(sales);
    expect(result).to.be.a('object');
  })
});
