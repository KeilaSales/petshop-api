const { Router } = require('express');
const {
  getAgendamentos,
  addAgendamento,
  updateAgendamento,
  deleteAgendamento,
  getAgendamentoPorCodigo
} = require('../controllers/agendamentoController');

const rotasAgendamentos = new Router();

rotasAgendamentos.route('/agendamento')
  .get(getAgendamentos)
  .post(addAgendamento)
  .put(updateAgendamento);

rotasAgendamentos.route('/agendamento/:codigo')
  .get(getAgendamentoPorCodigo)
  .delete(deleteAgendamento);

module.exports = { rotasAgendamentos };