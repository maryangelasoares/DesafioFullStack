// models/index.js
const { sequelize } = require("../config/database");
const Usuario = require("./usuarioModel");
const ProjetoAcao = require("./projetoAcaoModel");
const Notificacao = require("./notificacaoModel");

// Relacionamentos
Usuario.hasMany(ProjetoAcao, { foreignKey: "id_usuario" });
ProjetoAcao.belongsTo(Usuario, { foreignKey: "id_usuario" });


ProjetoAcao.hasMany(Notificacao, { foreignKey: "id_projetoacao" });
Notificacao.belongsTo(ProjetoAcao, { foreignKey: "id_projetoacao" });

module.exports = {
  sequelize,
  Usuario,
  ProjetoAcao,
  Notificacao,
};
