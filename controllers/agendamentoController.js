const {
  getAgendamentosDB,
  addAgendamentoDB,
  updateAgendamentoDB,
  deleteAgendamentoDB,
  getAgendamentoPorCodigoDB
} = require('../usecases/agendamentoUseCases');

const getAgendamentos = async (request, response) => {
  await getAgendamentosDB()
    .then((data) => response.status(200).json(data))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const addAgendamento = async (request, response) => {
  await addAgendamentoDB(request.body)
    .then((data) => response.status(200).json({ status: 'success', message: 'Agendamento criado', objeto: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const updateAgendamento = async (request, response) => {
  await updateAgendamentoDB(request.body)
    .then((data) => response.status(200).json({ status: 'success', message: 'Agendamento alterado', objeto: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const deleteAgendamento = async (request, response) => {
  await deleteAgendamentoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json({ status: 'success', message: data }))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

const getAgendamentoPorCodigo = async (request, response) => {
  await getAgendamentoPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) => response.status(400).json({ status: 'error', message: err }));
};

module.exports = {
  getAgendamentos,
  addAgendamento,
  updateAgendamento,
  deleteAgendamento,
  getAgendamentoPorCodigo
};