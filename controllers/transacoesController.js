const models = require('../models')
// const config = require('../config/database')
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;


const transacoesController = {

    CadastrarTransacaoSequelize: async (req, res) => {
        let { loja, data_transacao, meio_pagamento, valor, categorias } = req.body;
        const inserir = await models.transacoe.create({
                    loja,
                    data_transacao,
                    valor,
                    meio_pagamento,
                    fk_categoria_id: categorias
                })

                return res.redirect('transacoes')
    },

    verTransacoes: async (req, res) => {
        let transacoesexistente = await models.transacoe.findAll({ 
            limit: 7,
            order: [['data_transacao', 'DESC']]
        });
        let categoriasTransacoes = await models.categoria.findAll({});
        res.render('transacoes', {transacoesexistente, categoriasTransacoes});
    },
}

module.exports = transacoesController
