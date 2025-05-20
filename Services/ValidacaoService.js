// Importa o módulo 'cpf-check' para validação de CPF
const cpfCheck = require('cpf-check');

// Exporta a função 'validarCPF' que valida um CPF usando o módulo 'cpf-check'
exports.validarCPF = (cpf) => {
    // Retorna true se o CPF for válido, caso contrário false
    return cpfCheck.validate(cpf);
};

// Exporta a função 'validarDaraHora' que verifica se a data/hora fornecida é futura
exports.validarDataHora = (dataHora) => {
    // Retorna true se a data/hora for maior que a data/hora atual
    return new Date(dataHora) > new Date();
};