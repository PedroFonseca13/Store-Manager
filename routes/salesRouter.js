const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.findById);

module.exports = router;
