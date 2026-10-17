const { Router } = require('express');
const { rotasTutores } = require('./rotasTutores');
const { rotasPets } = require('./rotasPets');
const { rotasAgendamentos } = require('./rotasAgendamentos');

const rotas = new Router();

rotas.use(rotasTutores);
rotas.use(rotasPets);
rotas.use(rotasAgendamentos);

module.exports = rotas;