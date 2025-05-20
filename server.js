require('dotenv').config();
const app = require('express')();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/aeroporto')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Aeroporto';

// Conecta ao MongoDB
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log('Conectado ao MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Erro ao conectar ao MongoDB:', err);
//     process.exit(1);
//   });