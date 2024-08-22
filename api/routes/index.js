const express = require('express');
const usuarioRoutes = require('./usuarioRoute');
const projetoAcaoRoutes = require('./projetoAcaoRoute');
const notificacaoRoutes = require('./notificacaoRoute');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/projetosAcoes', projetoAcaoRoutes);
router.use('/notificacoes', notificacaoRoutes);

module.exports = router;
