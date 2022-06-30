const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAll);

module.exports = router;
