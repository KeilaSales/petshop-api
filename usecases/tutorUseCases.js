const { pool } = require('../config');
const Tutor = require('../entities/tutor');

const getTutoresDB = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM tutores ORDER BY nome');
    return rows.map((tutor) => new Tutor(tutor.codigo, tutor.nome, tutor.telefone, tutor.email));
  } catch (err) {
    throw "Erro ao recuperar tutores: " + err;
  }
};

const addTutorDB = async (body) => {
  try {
    const { nome, telefone, email } = body;
    const results = await pool.query(
      `INSERT INTO tutores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING codigo, nome, telefone, email`,
      [nome, telefone, email]
    );
    const tutor = results.rows[0];
    return new Tutor(tutor.codigo, tutor.nome, tutor.telefone, tutor.email);
  } catch (err) {
    throw "Erro ao inserir o tutor: " + err;
  }
};

const updateTutorDB = async (body) => {
  try {
    const { codigo, nome, telefone, email } = body;
    const results = await pool.query(
      `UPDATE tutores SET nome = $2, telefone = $3, email = $4 WHERE codigo = $1 RETURNING codigo, nome, telefone, email`,
      [codigo, nome, telefone, email]
    );
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const tutor = results.rows[0];
    return new Tutor(tutor.codigo, tutor.nome, tutor.telefone, tutor.email);
  } catch (err) {
    throw "Erro ao alterar o tutor: " + err;
  }
};

const deleteTutorDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM tutores WHERE codigo = $1`, [codigo]);
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Tutor removido com sucesso!";
    }
  } catch (err) {
    // Código de erro 23503 no PostgreSQL = Foreign Key Violation (Chave Estrangeira)
    if (err.code === '23503') {
      throw "Este tutor não pode ser excluído pois possui Pets vinculados a ele. Remova os Pets primeiro!";
    }
    throw "Erro ao remover o tutor: " + err;
  }
};

const getTutorPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(`SELECT * FROM tutores WHERE codigo = $1`, [codigo]);
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const tutor = results.rows[0];
      return new Tutor(tutor.codigo, tutor.nome, tutor.telefone, tutor.email);
    }
  } catch (err) {
    throw "Erro ao recuperar o tutor: " + err;
  }
};

module.exports = {
  getTutoresDB,
  addTutorDB,
  updateTutorDB,
  deleteTutorDB,
  getTutorPorCodigoDB
};