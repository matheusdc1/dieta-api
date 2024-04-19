const jwt = require('jsonwebtoken');

// Função para verificar o token JWT
function authenticateToken(req, res, next) {
  // Obtém o token de autenticação dos cabeçalhos da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    return res.sendStatus(401); // Retorna 401 se o token não for fornecido
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Retorna 403 se o token for inválido
    }
    req.user = user; // Define o usuário no objeto de requisição para uso posterior
    next(); // Chama a próxima função de middleware
  });
}

module.exports = { authenticateToken };