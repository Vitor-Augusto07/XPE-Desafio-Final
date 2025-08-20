const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Cliente extends Model {}

Cliente.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;
