const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.post('/sales', salesController.addsales);
router.get('/sales', salesController.sales);
router.get('/pendingsales', salesController.findpendingsales);
router.get('/sales/:id', salesController.findsales);
router.patch('/readysales/:id', salesController.readysales);
router.patch('/deliverysales/:id', salesController.deliverysales);
router.patch('/sales/:id', salesController.updatesales);
router.delete('/sales/:id', salesController.deletesales);

module.exports = router;