const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.findById);

module.exports = router;
