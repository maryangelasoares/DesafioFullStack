const express = require('express');
const {
  listarUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
  logoutUsuario
} = require('../controller/usuarioController');

const usuarioRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro ao listar usuários
 */
usuarioRoute.get('/', listarUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter usuário
 */
usuarioRoute.get('/:id', obterUsuarioPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *               genero:
 *                 type: string
 *                 enum: [masculino, feminino, outro]
 *               raca_etnia:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               comprovante_residencia:
 *                 type: string
 *                 format: binary
 *               documento_identificacao:
 *                 type: string
 *                 format: binary
 *               documento_rne:
 *                 type: string
 *                 format: binary
 *             required:
 *               - nome_completo
 *               - email
 *               - senha
 *               - telefone
 *               - genero
 *               - raca_etnia
 *               - cidade
 *               - estado
 *               - comprovante_residencia
 *               - documento_identificacao
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário - Verifique os campos obrigatórios e o formato dos dados
 *       500:
 *         description: Erro interno ao criar usuário
 */
usuarioRoute.post('/', criarUsuario);



/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: 
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'  # Referência ao esquema do objeto Usuario
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'  # Retorna o usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */

usuarioRoute.put('/:id', atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
usuarioRoute.delete('/:id', deletarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao fazer login
 */
usuarioRoute.post('/login', loginUsuario);
/**
 * @swagger
 * /usuarios/logout:
 *   post:
 *     summary: Realiza logout de um usuário
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       500:
 *         description: Erro ao fazer logout
 */
usuarioRoute.post('/logout', logoutUsuario);



module.exports = usuarioRoute;
