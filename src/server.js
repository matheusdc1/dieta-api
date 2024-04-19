require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');

const app = express();

app.use(express.json());

// Rotas de usuários
app.use('/api', userRoutes);
// Rotas de refeições
app.use('/api', mealRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
