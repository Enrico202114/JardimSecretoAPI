import pool from '../config/db.js';

const getAll = async () => {

  const result = await pool.query(
    'SELECT * FROM plantas'
  );
  return result.rows;
};

const create = async (nome, preco, quantidade, id_tipos) => {

  const result = await pool.query(
    'INSERT INTO plantas (nome, preco, quantidade, id_tipos) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, preco, quantidade, id_tipos]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM plantas WHERE id_plantas = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

// Buscar planta pelo ID
const getById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM plantas WHERE id_plants = $1',
    [id]
  );

  return result.rows[0];
};

// Atualizar uma planta
const update = async (id, nome, preco, quantidade, id_tipos) => {

  const result = await pool.query(
    `UPDATE plantas
     SET nome = $1,
         preco = $2,
         quantidade = $3,
         id_tipos = $4
     WHERE id_plants = $5
     RETURNING *`,
    [nome, preco, quantidade, id_tipos, id]
  );

  return result.rows[0];
};

const searchByName = async (nome) => {
  const result = await pool.query(
    'SELECT * FROM plantas WHERE nome ILIKE $1',
    [`%${nome}%`]
  );

  return result.rows;
};

export default {
  getAll,
  create,
  remove,
  getById,
  update,
  searchByName
};