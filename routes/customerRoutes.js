const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customerController');

router.post('/customer', customerController.addcustomer);
router.get('/customers', customerController.customers);
router.get('/customer/:id', customerController.findcustomer);
router.patch('/customer/:id', customerController.updatecustomer);
router.delete('/customer/:id', customerController.deletecustomer);

module.exports = router;