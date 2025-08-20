const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data.sqlite', // arquivo que será criado na raiz do projeto
  logging: false
});

module.exports = sequelize;
