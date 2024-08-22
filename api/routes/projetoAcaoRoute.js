const express = require('express');
const router = express.Router();
const projetoAcaoController = require('../controller/projetoAcaoController'); // Certifique-se de ter este controlador
const upload = require('../config/multerConfig'); // Configurações do Multer para upload de arquivos

/**
 * @swagger
 * tags:
 *   name: Projetos e Ações
 *   description: Endpoints para gerenciar projetos e ações culturais
 */

/**
 * @swagger
 * /projetosAcoes:
 *   get:
 *     summary: Lista todos os projetos e ações
 *     tags: [Projetos e Ações]
 *     responses:
 *       200:
 *         description: Lista de projetos e ações
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', projetoAcaoController.listarProjetos);

/**
 * @swagger
 * /projetosAcoes/usuario/{id_usuario}:
 *   get:
 *     summary: Lista os projetos e ações de um usuário específico
 *     tags: [Projetos e Ações]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de projetos e ações do usuário
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/usuario/:id_usuario', projetoAcaoController.listarProjetosPorUsuario);

/**
 * @swagger
 * /projetosAcoes/{id}:
 *   get:
 *     summary: Obtém um projeto ou ação pelo ID
 *     tags: [Projetos e Ações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do projeto ou ação
 *     responses:
 *       200:
 *         description: Projeto ou ação encontrado
 *       404:
 *         description: Projeto ou ação não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', projetoAcaoController.obterProjetoPorId);

/**
 * @swagger
 * /projetosAcoes:
 *   post:
 *     summary: Cria um novo projeto ou ação
 *     tags: [Projetos e Ações]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               nome_projetoacao:
 *                 type: string
 *               descricao_proposta:
 *                 type: string
 *                 format: binary
 *               fotos_imagens:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               linguagem_artistica:
 *                 type: string
 *               duvidas:
 *                 type: string 
 *               termo:
 *                 type: boolean
 *               nome_espaco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Projeto ou ação criado
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', upload.fields([
  { name: 'descricao_proposta', maxCount: 1 },
  { name: 'fotos_imagens', maxCount: 5 }
]), projetoAcaoController.criarProjeto);



/**
 * @swagger
 * /projetosAcoes/{id}:
 *   put:
 *     summary: Atualiza um projeto ou ação existente
 *     tags: [Projetos e Ações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do projeto ou ação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: 
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               nome_projetoacao:
 *                 type: string
 *               descricao_proposta:
 *                 type: string
 *               fotos_imagens:
 *                 type: array
 *                 items:
 *                   type: string
 *               linguagem_artistica:
 *                 type: string
 *               duvidas:
 *                 type: string
 *               termo:
 *                 type: boolean
 *               nome_espaco:
 *                 type: string
 *               endereco_espaco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Projeto ou ação atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Projeto ou ação não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', projetoAcaoController.atualizarProjeto);

/**
 * @swagger
 * /projetosAcoes/{id}:
 *   delete:
 *     summary: Exclui um projeto ou ação
 *     tags: [Projetos e Ações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do projeto ou ação
 *     responses:
 *       204:
 *         description: Projeto ou ação excluído
 *       404:
 *         description: Projeto ou ação não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', projetoAcaoController.deletarProjeto);

module.exports = router;
