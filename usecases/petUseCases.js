const { pool } = require('../config');
const Pet = require('../entities/pet');

const getPetsDB = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT p.codigo, p.nome, p.especie, p.raca, p.tutor, t.nome as tutor_nome 
       FROM pets p 
       JOIN tutores t ON p.tutor = t.codigo 
       ORDER BY p.codigo`
    );
    return rows.map((p) => new Pet(p.codigo, p.nome, p.especie, p.raca, p.tutor, p.tutor_nome));
  } catch (err) {
    throw "Erro ao recuperar pets: " + err;
  }
};

const addPetDB = async (body) => {
  try {
    const { nome, especie, raca, tutor } = body;
    const results = await pool.query(
      `INSERT INTO pets (nome, especie, raca, tutor) 
       VALUES ($1, $2, $3, $4) 
       RETURNING codigo, nome, especie, raca, tutor`,
      [nome, especie, raca, tutor]
    );
    const pet = results.rows[0];
    return new Pet(pet.codigo, pet.nome, pet.especie, pet.raca, pet.tutor, null);
  } catch (err) {
    throw "Erro ao inserir o pet: " + err;
  }
};

const updatePetDB = async (body) => {
  try {
    const { codigo, nome, especie, raca, tutor } = body;
    const results = await pool.query(
      `UPDATE pets SET nome = $2, especie = $3, raca = $4, tutor = $5 
       WHERE codigo = $1 
       RETURNING codigo, nome, especie, raca, tutor`,
      [codigo, nome, especie, raca, tutor]
    );
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const pet = results.rows[0];
    return new Pet(pet.codigo, pet.nome, pet.especie, pet.raca, pet.tutor, null);
  } catch (err) {
    throw "Erro ao alterar o pet: " + err;
  }
};

const deletePetDB = async (codigo) => {
  try {
    const results = await pool.query(`DELETE FROM pets WHERE codigo = $1`, [codigo]);
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Pet removido com sucesso!";
    }
  } catch (err) {
    throw "Erro ao remover o pet: " + err;
  }
};

const getPetPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `SELECT p.codigo, p.nome, p.especie, p.raca, p.tutor, t.nome as tutor_nome 
       FROM pets p 
       JOIN tutores t ON p.tutor = t.codigo 
       WHERE p.codigo = $1`,
      [codigo]
    );
    if (results.rowCount === 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const p = results.rows[0];
      return new Pet(p.codigo, p.nome, p.especie, p.raca, p.tutor, p.tutor_nome);
    }
  } catch (err) {
    throw "Erro ao recuperar o pet: " + err;
  }
};

module.exports = {
  getPetsDB,
  addPetDB,
  updatePetDB,
  deletePetDB,
  getPetPorCodigoDB
};