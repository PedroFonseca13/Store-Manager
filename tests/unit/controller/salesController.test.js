// const sinon = require('sinon');
// const salesService = require('../../../services/salesService');
// const salesControllers = require('../../../controllers/salesController');
// const { expect } = require('chai');

// describe('Chamada de Post em "/sales"', () => {


//   const sales = {
//     "id": 3,
//     "itemsSold": [
//       {
//         "productId": 1,
//         "quantity": 1
//       },
//       {
//         "productId": 2,
//         "quantity": 2
//       }
//     ]
//   }


//   const req = {}
//   const res = {}

//   before(() => {
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(sales);
//     sinon.stub(salesService, 'newSales').resolves(sales);
//   })

//   after(() => {
//     sinon.restore
//   })

//   it('its called with code 201', async () => {
//     await salesControllers.addSale(req, res);
//     expect(res.status.calledWith(201)).to.be.equal(true);
//     expect(res.json.calledWith(salesReturn)).to.be.equal(true);
//   })

// });
