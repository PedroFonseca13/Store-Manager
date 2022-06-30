const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.get('/sales', salesController.getAll);

module.exports = router;
