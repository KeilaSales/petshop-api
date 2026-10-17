const { pool } = require('../config');
const Agendamento = require('../entities/agendamento');

const getAgendamentosDB = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT a.codigo, a.servico, to_char(a.data_agendamento, 'YYYY-MM-DD') as data_agendamento, 
              a.valor, a.pet, p.nome as pet_nome 
       FROM agendamentos a 
       JOIN pets p ON a.pet = p.codigo 
       ORDER BY a.codigo`
    );
    return rows.map((a) => new Agendamento(a.codigo, a.servico, a.data_agendamento, a.valor, a.pet, a.pet_nome));
  } catch (err) {
    throw "Erro ao recuperar agendamentos: " + err;
  }
};

const addAgendamentoDB = async (body) => {
  try {
    const { servico, data_agendamento, valor, pet } = body;
    const results = await pool.query(
      `INSERT INTO agendamentos (servico, data_agendamento, valor, pet) 
       VALUES ($1, $2, $3, $4) 
       RETURNING codigo, servico, to_char(data_agendamento, 'YYYY-MM-DD') as data_agendamento, valor, pet`,
      [servico, data_agendamento, valor, pet]
    );
    const a = results.rows[0];
    return new Agendamento(a.codigo, a.servico, a.data_agendamento, a.valor, a.pet, null);
  } catch (err) {
    throw "Erro ao inserir o agendamento: " + err;
  }
};

const updateAgendamentoDB = async (body) => {
  try {
    const { codigo, servico, data_agendamento, valor, pet } = body;
    const results = await pool.query(
      `UPDATE agendamentos SET servico = $2, data_agendamento = $3, valor = $4, pet = $5 
       WHERE codigo = $1 
       RETURNING codigo, servico, to_char(data_agendamento, 'YYYY-MM-DD') as data_agendamento, valor, pet`,
      [codigo, servico, data_agendamento, valor, pet]
    );
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const a = results.rows[0];
    return new Agendamento(a.codigo, a.servico, a.data_agendamento, a.valor, a.pet, null);
  } catch (err) {
    throw "Erro ao alterar o agendamento: " + err;
  }
};

const deleteAgendamentoDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM agendamentos WHERE codigo = $1`, [codigo]);
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Agendamento removido com sucesso!";
    }
  } catch (err) {
    throw "Erro ao remover o agendamento: " + err;
  }
};

const getAgendamentoPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `SELECT a.codigo, a.servico, to_char(a.data_agendamento, 'YYYY-MM-DD') as data_agendamento, 
              a.valor, a.pet, p.nome as pet_nome 
       FROM agendamentos a 
       JOIN pets p ON a.pet = p.codigo 
       WHERE a.codigo = $1`,
      [codigo]
    );
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const a = results.rows[0];
      return new Agendamento(a.codigo, a.servico, a.data_agendamento, a.valor, a.pet, a.pet_nome);
    }
  } catch (err) {
    throw "Erro ao recuperar o agendamento: " + err;
  }
};

module.exports = {
  getAgendamentosDB,
  addAgendamentoDB,
  updateAgendamentoDB,
  deleteAgendamentoDB,
  getAgendamentoPorCodigoDB
};