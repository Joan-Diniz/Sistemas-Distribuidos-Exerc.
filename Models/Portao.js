const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aeroporto';

const PortaoSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    disponivel:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Portao', PortaoSchema);