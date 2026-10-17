const {
  getTutoresDB,
  addTutorDB,
  updateTutorDB,
  deleteTutorDB,
  getTutorPorCodigoDB
} = require('../usecases/tutorUseCases');

const getTutores = async (request, response) => {
  await getTutoresDB()
    .then((data) => response.status(200).json(data))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const addTutor = async (request, response) => {
  await addTutorDB(request.body)
    .then((data) => response.status(200).json({ status: 'success', message: 'Tutor criado', objeto: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const updateTutor = async (request, response) => {
  await updateTutorDB(request.body)
    .then((data) => response.status(200).json({ status: 'success', message: 'Tutor alterado', objeto: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const deleteTutor = async (request, response) => {
  await deleteTutorDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json({ status: 'success', message: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const getTutorPorCodigo = async (request, response) => {
  await getTutorPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

module.exports = {
  getTutores,
  addTutor,
  updateTutor,
  deleteTutor,
  getTutorPorCodigo
};