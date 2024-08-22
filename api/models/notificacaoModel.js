const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Notificacao = sequelize.define('Notificacao', {
  id_notificacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  data_envio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('enviada', 'lida', 'arquivada'),
    defaultValue: 'enviada',
  },
  id_projetoacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  modelName: 'Notificacao',
  timestamps: false,
});

module.exports = Notificacao;
