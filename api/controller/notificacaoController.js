const Notificacao = require('../models/notificacaoModel');
const ProjetoAcao = require('../models/projetoacaoModel');
const Usuario = require('../models/usuarioModel');
const { sendEmail } = require('../config/email');

const listarNotificacoes = async (req, res) => {
  try {
    const notificacoes = await Notificacao.findAll();
    res.status(200).json(notificacoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar notificações', error });
  }
};

const obterNotificacaoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const notificacao = await Notificacao.findByPk(id);
    if (!notificacao) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json(notificacao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter notificação', error });
  }
};

const criarNotificacao = async (req, res) => {
  const { destinatario, mensagem, id_projetoacao } = req.body;
  console.log('Corpo da requisição:', req.body);

  try {
    const usuario = await Usuario.findOne({ where: { email: destinatario } });
    console.log('Usuário encontrado:', usuario);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const novaNotificacao = await Notificacao.create({
      mensagem,
      id_projetoacao,
      data_envio: new Date(),
      status: 'enviada'
    });

    await sendEmail(usuario.email, 'Nova Notificação', `Você recebeu uma nova notificação: ${novaNotificacao.mensagem}`);

    res.status(201).json(novaNotificacao);
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({ message: 'Erro ao criar notificação', error });
  }
};

const atualizarNotificacao = async (req, res) => {
  const { id } = req.params;
  try {
    const [notificacaoAtualizada] = await Notificacao.update(req.body, { where: { id_notificacao: id } });
    if (notificacaoAtualizada === 0) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json({ message: 'Notificação atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar notificação', error });
  }
};

const deletarNotificacao = async (req, res) => {
  const { id } = req.params;
  try {
    const notificacaoDeletada = await Notificacao.destroy({ where: { id_notificacao: id } });
    if (!notificacaoDeletada) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json({ message: 'Notificação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar notificação', error });
  }
};

module.exports = {
  listarNotificacoes,
  obterNotificacaoPorId,
  criarNotificacao,
  atualizarNotificacao,
  deletarNotificacao
};
