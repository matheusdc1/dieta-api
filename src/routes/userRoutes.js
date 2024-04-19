const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authenticateToken'); // Importa o middleware de autenticação JWT

// Rota para listar todos os usuários
router.get('/users', authenticateToken, userController.listUsers); // Aplica o middleware de autenticação JWT

// Rota para criar um novo usuário
router.post('/users', userController.createUser);

// Rota para fazer login
router.post('/login', userController.login);

module.exports = router;
