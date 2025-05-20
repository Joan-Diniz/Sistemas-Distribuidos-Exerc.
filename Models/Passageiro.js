const mongoose = require('mongoose');

const PassageiroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function(v) {
            return v.length === 11;
        },
        message: props => `${props.value} não é um CPF válido!`
    }
  },
  vooId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voo',
    required: true
  },
  statusCheckIn: {
    type: String,
    enum: ['pendente', 'realizado'],
    default: 'pendente'
  }
});

module.exports = mongoose.model('Passageiro', PassageiroSchema);