const {
  getPetsDB,
  addPetDB,
  updatePetDB,
  deletePetDB,
  getPetPorCodigoDB
} = require('../usecases/petUseCases');

const getPets = async (request, response) => {
  await getPetsDB()
    .then((data) => response.status(200).json(data))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const addPet = async (request, response) => {
  await addPetDB(request.body)
    .then((data) => response.status(200).json({ status: 'success', message: 'Pet criado', objeto: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const updatePet = async (request, response) => {
  await updatePetDB(request.body)
    .then((data) => response.status(200).json({ status: 'success', message: 'Pet alterado', objeto: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const deletePet = async (request, response) => {
  await deletePetDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json({ status: 'success', message: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const getPetPorCodigo = async (request, response) => {
  await getPetPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

module.exports = {
  getPets,
  addPet,
  updatePet,
  deletePet,
  getPetPorCodigo
};