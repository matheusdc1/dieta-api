const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authenticateToken');

router.get('/users', authenticateToken, userController.listUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser); // Adicionamos esta rota para excluir usuários

router.post('/login', userController.login);

module.exports = router;