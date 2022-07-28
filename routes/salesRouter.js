const router = require('express').Router();
const salesController = require('../controllers/salesController');
const salesMiddleware = require('../middleware/salesMiddleware');

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.findById);
router.post('/sales', salesMiddleware.validateSale, salesController.addSale);

module.exports = router;
