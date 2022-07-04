const router = require('express').Router();
const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middleware/productsMiddleware');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findById);
router.post('/products', productsMiddleware.validateName, productsController.registerProduct);
router.put('/products/:id', productsMiddleware.validateName, productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
