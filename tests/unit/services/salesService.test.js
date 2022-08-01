const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('verify if the func create sale returns the code 201', async () => {
  const sales = {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 2
      }
    ]
  }

  before(async () => {
    sinon.stub(salesModel, 'registerSales').returns(sales)
  })
  after(async () => {
    sinon.restore();
  })

  it('returns a object with products', async () => {
    const a = await salesService.newSales();
    expect(a).to.be.a('object');
  })

})
