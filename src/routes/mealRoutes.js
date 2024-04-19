const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const { authenticateToken } = require('../middlewares/authenticateToken'); // Importe o middleware de autenticação JWT

// Rotas para manipular as refeições
router.post('/meals', authenticateToken, mealController.createMeal); // Aplica o middleware de autenticação JWT
router.put('/meals/:id', authenticateToken, mealController.updateMeal);
router.delete('/meals/:id', authenticateToken, mealController.deleteMeal);
router.get('/users/:userId/meals', authenticateToken, mealController.listMealsByUser);
router.get('/meals/:id', authenticateToken, mealController.getMealById); 

// Rota para recuperar as métricas de um usuário
router.get('/users/:userId/metrics', authenticateToken, mealController.getUserMetrics);

module.exports = router;
