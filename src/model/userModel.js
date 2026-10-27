import pool from '../config/db.js';

// Criar usuário
const create = async (email, password) => {
  const result = await pool.query(
    `INSERT INTO usuarios (email, password)
     VALUES ($1, $2)
     RETURNING id_usuarios, email, role`,
    [email, password]
  );

  return result.rows[0];
};

// Buscar usuário pelo e-mail
const findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );

  return result.rows[0];
};

// Atualizar usuário
const update = async (id, email, password) => {
  const result = await pool.query(
    `UPDATE usuarios
     SET email = $1,
         password = $2
     WHERE id_usuarios = $3
     RETURNING id_usuarios, email`,
    [email, password, id]
  );

  return result.rows[0];
};

// Deletar usuário
const remove = async (id) => {
  const result = await pool.query(
    `DELETE FROM usuarios
     WHERE id_usuarios = $1
     RETURNING id_usuarios, email`,
    [id]
  );

  return result.rows[0];
};

export default {
  create,
  findByEmail,
  update,
  remove
};