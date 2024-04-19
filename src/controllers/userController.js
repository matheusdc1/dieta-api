const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para criar um novo usuário
async function createUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função para fazer login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função para listar todos os usuários
async function listUsers(req, res) {
  try {
    // Consulta os usuários no banco de dados e seleciona apenas os campos ID e nome
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = { createUser, login, listUsers };