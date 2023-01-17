const express = require("express");

const router = express.Router();

const itemController = require("../controllers/itemController");

router.post('/item', itemController.addItem);
router.get('/items', itemController.items);
router.get('/item/:id', itemController.findItem);
router.patch('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);

module.exports = router;