//usecases = Contêm as funções assíncronas 
// (async/await) que executam as queries SQL nativas 
// (SELECT, INSERT, UPDATE, DELETE) 
// no banco de dados usando o pool.query()


class Agendamento {
  constructor(codigo, servico, data_agendamento, valor, pet, pet_nome) {
    this.codigo = codigo;
    this.servico = servico;
    this.data_agendamento = data_agendamento;
    this.valor = valor;
    this.pet = pet;
    this.pet_nome = pet_nome;
  }
}

module.exports = Agendamento;