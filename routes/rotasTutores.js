const { Router } = require('express');
const {
  getTutores,
  addTutor,
  updateTutor,
  deleteTutor,
  getTutorPorCodigo
} = require('../controllers/tutorController');

const rotasTutores = new Router();

rotasTutores.route('/tutor')
  .get(getTutores)
  .post(addTutor)
  .put(updateTutor);

rotasTutores.route('/tutor/:codigo')
  .get(getTutorPorCodigo)
  .delete(deleteTutor);

module.exports = { rotasTutores };