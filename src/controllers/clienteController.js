const Joi = require('joi');
const service = require('../services/clienteService');

const schema = Joi.object({
  nome: Joi.string().min(2).required(),
  email: Joi.string().email().required()
});

async function listarTodos(req, res) {
  res.json(service.listarTodos());
}

async function buscarPorId(req, res) {
  const cli = service.buscarPorId(req.params.id);
  if (!cli) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(cli);
}

async function buscarPorNome(req, res) {
  const { nome } = req.query;
  if (!nome) return res.status(400).json({ message: 'Parâmetro nome é obrigatório' });
  res.json(service.buscarPorNome(nome));
}

async function contar(req, res) {
  res.json({ total: service.contar() });
}

async function criar(req, res) {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const novo = service.salvar(value);
  res.status(201).json(novo);
}

async function atualizar(req, res) {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const atualizado = service.atualizar(req.params.id, value);
  if (!atualizado) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(atualizado);
}

async function deletar(req, res) {
  const ok = service.deletar(req.params.id);
  if (!ok) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.status(204).send();
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorNome,
  contar,
  criar,
  atualizar,
  deletar
};
