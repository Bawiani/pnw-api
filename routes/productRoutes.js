const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.post('/product', productController.addproduct);
router.get('/products', productController.products);
router.get('/product/:id', productController.findproduct);
router.get('/productsproduced', productController.productsproduced);
router.patch('/product/:id', productController.updateproduct);
router.delete('/product/:id', productController.deleteproduct);

module.exports = router;