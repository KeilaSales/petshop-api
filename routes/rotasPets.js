
const { Router } = require('express');
const {
  getPets,
  addPet,
  updatePet,
  deletePet,
  getPetPorCodigo
} = require('../controllers/petController');

const rotasPets = new Router();

rotasPets.route('/pet')
  .get(getPets)
  .post(addPet)
  .put(updatePet);

rotasPets.route('/pet/:codigo')
  .get(getPetPorCodigo)
  .delete(deletePet);

module.exports = { rotasPets };