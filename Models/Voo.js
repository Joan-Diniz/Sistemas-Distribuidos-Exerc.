const mongoose = require('mongoose');

const vooSchema = new mongoose.Schema({
    numeroVoo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    origem: {
        type: String,
        required: true,
        trim: true
    },
    destino: {
        type: String,
        required: true,
        trim: true
    },
    dataHoraPartida: {
        type: Date,
        required: true
    },
    portaoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portao'
    },
    status: {
        type: String,
        enum: ['programado', 'embraque', 'concluido'],
        default: 'programado'

    }
});

module.exports = mongoose.model('Voo', vooSchema);