
import plantModel from "../model/plantModel.js";

const getAll = async (req, res) => {
  const { nome } = req.query;

  if (nome) {
    const plants = await plantModel.searchByName(nome);
    return res.json(plants);
  }

  const plants = await plantModel.getAll();
  res.json(plants);
};

const search = async (req, res) => {
  const { nome } = req.query;

  if (!nome || !nome.trim()) {
    const plants = await plantModel.getAll();
    return res.json(plants);
  }

  const plants = await plantModel.searchByName(nome.trim());
  res.json(plants);
};

const create = async (req, res) => {
  const { nome, preco, quantidade, id_tipos } = req.body;

  if (!nome || !preco || !quantidade || !id_tipos) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
    });
  }

  const newPlant = await plantModel.create(
    nome,
    preco,
    quantidade,
    id_tipos
  );

  res.status(201).json(newPlant);
};

const remove = async (req, res) => {
  const deletedPlant = await plantModel.remove(req.params.id);

  if (!deletedPlant) {
    return res.status(404).json({
      message: "Planta não encontrada",
    });
  }

  res.status(200).json({
    message: "Planta deletada com sucesso",
    deletedPlant,
  });
};

const getById = async (req, res) => {
  const plant = await plantModel.getById(req.params.id);

  if (!plant) {
    return res.status(404).json({
      message: "Planta não encontrada",
    });
  }

  res.status(200).json(plant);
};

const update = async (req, res) => {
  const { nome, preco, quantidade, id_tipos } = req.body;

  if (!nome || !preco || !quantidade || !id_tipos) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
    });
  }

  const updatedPlant = await plantModel.update(
    req.params.id,
    nome,
    preco,
    quantidade,
    id_tipos
  );

  if (!updatedPlant) {
    return res.status(404).json({
      message: "Planta não encontrada",
    });
  }

  res.status(200).json(updatedPlant);
};

export default {
  getAll,
  search,
  create,
  remove,
  getById,
  update,
};
