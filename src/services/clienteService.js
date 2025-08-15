const Cliente = require('../models/Cliente');

let nextId = 1;
const clientes = []; // armazenamento dos clientes em memoria

function listarTodos() {
  return clientes;
}

function buscarPorId(id) {
  return clientes.find(c => c.id === Number(id)) || null;
}

function buscarPorNome(nome) {
  const termo = String(nome).toLowerCase();
  return clientes.filter(c => c.nome.toLowerCase().includes(termo));
}

function salvar({ nome, email }) {
  const novo = new Cliente({ id: nextId++, nome, email });
  clientes.push(novo);
  return novo;
}

function atualizar(id, { nome, email }) {
  const idx = clientes.findIndex(c => c.id === Number(id));
  if (idx === -1) return null;
  clientes[idx] = { ...clientes[idx], nome, email };
  return clientes[idx];
}

function deletar(id) {
  const idx = clientes.findIndex(c => c.id === Number(id));
  if (idx === -1) return false;
  clientes.splice(idx, 1);
  return true;
}

function contar() {
  return clientes.length;
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
