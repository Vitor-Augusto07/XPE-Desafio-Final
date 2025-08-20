const { Op } = require('sequelize');
const Cliente = require('../models/Cliente');

async function listarTodos() {
  return Cliente.findAll();
}

async function buscarPorId(id) {
  return Cliente.findByPk(Number(id));
}

async function buscarPorNome(nome) {
  return Cliente.findAll({
    where: {
      nome: { [Op.like]: `%${nome}%` }
    }
  });
}

async function salvar(payload) {
  return Cliente.create(payload);
}

async function atualizar(id, payload) {
  const cliente = await Cliente.findByPk(Number(id));
  if (!cliente) return null;
  return cliente.update(payload);
}

async function deletar(id) {
  return (await Cliente.destroy({ where: { id: Number(id) } })) > 0;
}

async function contar() {
  return Cliente.count();
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorNome,
  salvar,
  atualizar,
  deletar,
  contar
};

