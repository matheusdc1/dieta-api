const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um novo registro de refeição
async function createMeal(req, res) {
  const { name, description, isInDiet } = req.body;

  try {
    // Extrai o ID do usuário do objeto de requisição
    const userId = req.user.userId;

    // Cria o registro de refeição no banco de dados
    const newMeal = await prisma.meal.create({
      data: {
        name,
        description,
        isInDiet,
        // Associa a refeição ao usuário usando o ID extraído do token JWT
        user: { connect: { id: userId } }
      }
    });

    return res.status(201).json(newMeal);
  } catch (error) {
    console.error('Erro ao criar registro de refeição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função para atualizar uma refeição existente
async function updateMeal(req, res) {
  const mealId = req.params.id; // Id da refeição a ser atualizada
  const { name, description, isInDiet } = req.body;

  try {
    // Verifica se a refeição existe
    const existingMeal = await prisma.meal.findUnique({
      where: { id: mealId },
      select: { user_id: true } // Inclui o campo user_id na consulta
    });
    if (!existingMeal) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }

    // Verifica se o usuário autenticado é o mesmo que está atualizando a refeição
    if (req.user.userId !== existingMeal.user_id) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    // Atualiza a refeição no banco de dados
    const updatedMeal = await prisma.meal.update({
      where: { id: mealId },
      data: {
        name,
        description,
        isInDiet
      }
    });

    return res.status(200).json(updatedMeal);
  } catch (error) {
    console.error('Erro ao atualizar refeição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função para excluir uma refeição
async function deleteMeal(req, res) {
  const mealId = req.params.id; // Id da refeição a ser excluída

  try {
    // Verifica se a refeição existe
    const existingMeal = await prisma.meal.findUnique({
      where: { id: mealId },
      select: { user_id: true } // Inclui o campo user_id na consulta
    });
    if (!existingMeal) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }

    // Verifica se o usuário autenticado é o mesmo que está excluindo a refeição
    if (req.user.userId !== existingMeal.user_id) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    // Exclui a refeição do banco de dados
    await prisma.meal.delete({
      where: { id: mealId }
    });

    return res.status(200).json({ message: 'Refeição excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir refeição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função para listar todas as refeições de um usuário
async function listMealsByUser(req, res) {
    const userId = req.params.userId; // Id do usuário
  
    try {
      // Verifica se o usuário existe
      const existingUser = await prisma.user.findUnique({
        where: { id: userId }
      });
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Verifica se o usuário autenticado é o mesmo que está visualizando as refeições
      if (req.user.userId !== userId) {
        return res.status(403).json({ error: 'Não autorizado' });
      }
  
      // Lista as refeições do usuário do banco de dados
      const userMeals = await prisma.meal.findMany({
        where: { user_id: userId }
      });
  
      return res.status(200).json(userMeals);
    } catch (error) {
      console.error('Erro ao listar refeições do usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Função para visualizar uma única refeição
async function getMealById(req, res) {
  const mealId = req.params.id; // Id da refeição

  try {
    // Busca a refeição pelo Id
    const meal = await prisma.meal.findUnique({
      where: { id: mealId },
      include: { user: true } // Inclui informações do usuário associado à refeição
    });
    if (!meal) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }

    // Verifica se o usuário autenticado é o mesmo que está visualizando a refeição
    if (req.user.userId !== meal.user_id) {
      return res.status(403).json({ error: 'Não autorizado' });
    }

    return res.status(200).json(meal);
  } catch (error) {
    console.error('Erro ao buscar refeição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função para recuperar as métricas de um usuário
async function getUserMetrics(req, res) {
  const userId = req.params.userId;

  try {
      // Verifica se o usuário autenticado é o mesmo que está solicitando as métricas
      if (req.user.userId !== userId) {
          return res.status(403).json({ error: 'Não autorizado' });
      }

      // Recupera as métricas do usuário
      const totalMeals = await prisma.meal.count({
          where: { user_id: userId }
      });
      const dietMeals = await prisma.meal.count({
          where: { user_id: userId, isInDiet: true }
      });
      const nonDietMeals = totalMeals - dietMeals;

      return res.status(200).json({
          totalMeals,
          dietMeals,
          nonDietMeals,
      });
  } catch (error) {
      console.error('Erro ao recuperar métricas do usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = { createMeal, updateMeal, deleteMeal, listMealsByUser, getMealById, getUserMetrics };