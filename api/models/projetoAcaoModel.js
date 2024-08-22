const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProjetoAcao = sequelize.define('ProjetoAcao', {
  id_projetoacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome_projetoacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao_proposta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fotos_imagens: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  linguagem_artistica: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duvidas: {
    type: DataTypes.TEXT, 
    allowNull: true, 
  },
  termo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  nome_espaco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Em Análise',
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  modelName: 'ProjetoAcao',
  timestamps: false,
});

module.exports = ProjetoAcao;
