const express = require('express');
const {
  listarNotificacoes,
  obterNotificacaoPorId,
  criarNotificacao,
  atualizarNotificacao,
  deletarNotificacao
} = require('../controller/notificacaoController');

const notificacaoRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notificação
 *   description: Endpoints relacionados às notificações
 */

/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Lista todas as notificações
 *     tags: [Notificação]
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro ao listar notificações
 */
notificacaoRoute.get('/', listarNotificacoes);

/**
 * @swagger
 * /notificacoes/{id}:
 *   get:
 *     summary: Obtém uma notificação pelo ID
 *     tags: [Notificação]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da notificação
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro ao obter notificação
 */
notificacaoRoute.get('/:id', obterNotificacaoPorId);

/**
 * @swagger
 * /notificacoes:
 *   post:
 *     summary: Cria uma nova notificação
 *     tags: [Notificação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_projetoacao:
 *                 type: integer
 *               mensagem:
 *                 type: string
 *               destinatario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notificação criada com sucesso
 *       400:
 *         description: Erro ao criar notificação
 *       500:
 *         description: Erro ao criar notificação
 */
notificacaoRoute.post('/', criarNotificacao);

/**
 * @swagger
 * /notificacoes/{id}:
 *   put:
 *     summary: Atualiza uma notificação pelo ID
 *     tags: [Notificação]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da notificação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensagem:
 *                 type: string
 *               destinatario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificação atualizada com sucesso
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro ao atualizar notificação
 */
notificacaoRoute.put('/:id', atualizarNotificacao);

/**
 * @swagger
 * /notificacoes/{id}:
 *   delete:
 *     summary: Deleta uma notificação pelo ID
 *     tags: [Notificação]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da notificação
 *     responses:
 *       200:
 *         description: Notificação deletada com sucesso
 *       404:
 *         description: Notificação não encontrada
 *       500:
 *         description: Erro ao deletar notificação
 */
notificacaoRoute.delete('/:id', deletarNotificacao);

module.exports = notificacaoRoute;
