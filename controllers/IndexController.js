const router = require("../routes/rotasIndex");
const models = require('../models')
const fs = require('fs');
const path = require('path');

const IndexController = {
    AcessoHome: (req, res) => {
        if (!req.session.usuario) {
            res.redirect('login');
        } else {
            res.render('index', { usuario: req.session.usuario });
        }

    },

    verEntradas: (req, res) => {
        res.render('entradas');
    },

    verObjetivos: (req, res) => {
        res.render("objetivos_v1");
    },

    verConfiguracoes: async (req, res) => {        
        let { id } = req.session.usuario
        let usuario = await models.usuarios.findOne({
            where: {id}
        })
        res.render('configuracoes', { usuario });
    },

    editarUsuarios: async (req, res) => {
        const { id } = req.params
        console.log(req.params)
        const { nome, sobrenome, telefone } = req.body;
        console.log("Body", req.body)
        const usuario = await models.usuarios.update({ 
            nome, 
            sobrenome, 
            telefone 
        },
        {
            where: {
                id
            }
        });        
        console.log(usuario)
        /* let usuarioAtualizado = await models.usuarios.findByPk(id) */
        res.render('configuracoes', /* usuarioAtualizado */{ usuario: {nome, sobrenome, telefone} })
            
    },

    

    salvarForm: (req, res) => {

    },

    verEntradas: async (req, res) => {
        let entradasExistentes = await models.entrada.findAll({});
        res.render('entradas', { entradasExistentes })
    },

    cadastrarEntradas: async (req, res) => {
        let { nome, valor, data } = req.body
        const inserir = await models.entrada.create({
            nome,
            valor,
            data,
        });
        res.redirect('entradas')
    },

}


module.exports = IndexController
