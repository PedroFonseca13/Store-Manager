const router = require('express').Router();
const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middleware/productsMiddleware');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findById);
router.post('/products', productsMiddleware.validateName, productsController.registerProduct);

module.exports = router;
