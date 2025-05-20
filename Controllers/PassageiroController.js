const Passageiro = require('../Models/Passageiro');
const Voo = require('../Models/Voo');
const {validarCPF} = require('../Services/ValidacaoService');

exports.criarPassageiro = async (req, res) => {
    try {
        const { nome, cpf, vooId} = req.body;

        if(!validarCPF(cpf)) {
            return res.status(400).json({ message: 'CPF invalido' });
        }

        const passageiro = new Passageiro({ nome, cpf, vooId});
        await passageiro.save();
        res.status(201).json(passageiro);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'CPF já cadastrado' });
        } else {
            res.status(400).json({ erro: error.message });
        }
    }
};
exports.listarPassageiros = async (req, res) => {
    try {
        const passageiros = await Passageiro.find().populate('vooId');
        res.json(passageiros);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
exports.obterPassageiro = async (req, res) => {
    try {
        const passageiro = await Passageiro.findById(req.params.id).populate('vooId');
        if (!passageiro) {
            return res.status(404).json({ erro: 'Passageiro não encontrado' });
        }
        res.json(passageiro);
    }catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.atualizarPassageiro = async (req, res) =>{
    try{
        const { nome, cpf, vooId} = req.body;
        if(cpf && !validarCPF(cpf)) {
            return res.status(400).json({ message: 'CPF invalido' });
        }
        const passageiro = await Passageiro.findByIdAndUpadate(
            req.params.id,
            {nome, cpf, vooId},
            {new: true, runValidators: true});
        if(!passageiro){
            return res.status(404).json({ erro: 'Passageiro não encontrado' });
        }
        res.json(passageiro);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'CPF já cadastrado' });
        } else {
            res.status(400).json({ erro: error.message });
        }
    }
};
exports.deletarPassageiro = async (req,res) => {
    try{
        const passageiro = await Passageiro.findByIdAndDelete(req.params.id);
        if(!passageiro){
            return res.status(404).json({ erro: 'Passageiro não encontrado' });
        }
        res.json({ message: 'Passageiro deletado com sucesso' });
    }catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
exports.fazerCheckIn = async (req, res) => {
    try{
        const passageiro = await Passageiro.findById(req.params.id).populate('vooId');
        if(!passageiros){
            return res.status(400).json({ erro: 'Passageiro não encontrado' });
        }
        if(passageiro.vooId.status !== 'embarque'){
            return res.status(400).json({ erro: 'Check-in não permitido, o voo não está em embarque' });
    }
    passageiro.statusCheckIn = 'realizado';
    await passageiro.save();

    res.json({ message: 'Check-in realizado com sucesso' });

    }catch (error) {
        res.status(500).json({ erro: error.message });
    }

};