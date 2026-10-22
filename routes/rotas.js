//Routes = Contêm as rotas da API, que chamam as 
// funções do controller e retornam o resultado para o frontend.
//Mapeia os métodos (GET, POST, PUT, DELETE) 
// para as funções correspondentes no controller.


const { Router } = require('express');
const { rotasTutores } = require('./rotasTutores');
const { rotasPets } = require('./rotasPets');
const { rotasAgendamentos } = require('./rotasAgendamentos');

const rotas = new Router();

rotas.use(rotasTutores);
rotas.use(rotasPets);
rotas.use(rotasAgendamentos);

module.exports = rotas;