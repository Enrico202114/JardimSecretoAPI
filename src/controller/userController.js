import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../model/userModel.js';

// Cadastrar usuário
const register = async (req, res) => {

  const { email, password } = req.body;

  // Verifica se os campos foram preenchidos
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  // Verifica se o email já está cadastrado
  const userExists = await userModel.findByEmail(email);

  if (userExists) {
    return res.status(400).json({
      message: 'Email já cadastrado'
    });
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o usuário
  const user = await userModel.create(
    email,
    hashedPassword
  );

  res.status(201).json(user);
};


// Login
const login = async (req, res) => {

  const { email, password } = req.body;

  // Busca o usuário pelo email
  const user = await userModel.findByEmail(email);

  // Verifica se o usuário existe
  if (!user) {
    return res.status(401).json({
      message: 'Credenciais inválidas'
    });
  }

  // Compara a senha informada com a senha criptografada
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  // Verifica se a senha está correta
  if (!validPassword) {
    return res.status(401).json({
      message: 'Credenciais inválidas'
    });
  }

  // Cria o token JWT
  const token = jwt.sign(
    { id: user.id_usuarios,
    role: user.role
    },
    'minha-chave-secreta',
    { expiresIn: '1h' }
  );

  res.json({
    token
  });
};


// Atualizar usuário
const update = async (req, res) => {

  const { email, password } = req.body;

  const id = req.params.id;

  // Verifica se os campos foram preenchidos
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email e senha são obrigatórios'
    });
  }

  // Criptografa a nova senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Atualiza o usuário
  const updatedUser = await userModel.update(
    id,
    email,
    hashedPassword
  );

  // Verifica se o usuário existe
  if (!updatedUser) {
    return res.status(404).json({
      message: 'Usuário não encontrado'
    });
  }

  res.status(200).json({
    message: 'Usuário atualizado com sucesso',
    user: updatedUser
  });
};


// Deletar usuário
const remove = async (req, res) => {

  const id = req.params.id;

  // Deleta o usuário
  const deletedUser = await userModel.remove(id);

  // Verifica se o usuário existe
  if (!deletedUser) {
    return res.status(404).json({
      message: 'Usuário não encontrado'
    });
  }

  res.status(200).json({
    message: 'Usuário deletado com sucesso',
    user: deletedUser
  });
};


export default {
  register,
  login,
  update,
  remove
};