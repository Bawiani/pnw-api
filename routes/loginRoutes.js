const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const superAdminAuth = require('../middleware/superAdminAuth');

const loginController = require('../controllers/loginController');

router.post('/login/register', loginController.register);
router.post('/login', loginController.login);
router.get('/users', loginController.users);
router.get('/user/:id', loginController.findUser);
router.patch('/user/:id', loginController.updateUser);
router.delete('/user/:id', loginController.deleteUser);

module.exports = router;