const ProjetoAcao = require('../models/projetoAcaoModel');
const upload = require('../config/multerConfig'); // Assumindo que você tenha um arquivo de configuração para o multer

// Função para listar todos os projetos
const listarProjetos = async (req, res) => {
  try {
    const projetos = await ProjetoAcao.findAll();
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar projetos', error: error.message });
  }
};

// Função para obter um projeto pelo ID
const obterProjetoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const projeto = await ProjetoAcao.findByPk(id);
    if (!projeto) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json(projeto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter projeto', error: error.message });
  }
};

// Função para listar projetos de um usuário específico
const listarProjetosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const projetos = await ProjetoAcao.findAll({ where: { id_usuario } });
    res.status(200).json(projetos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar projetos do usuário', error: error.message });
  }
};

const criarProjeto = async (req, res) => {
  try {
    const descricao_proposta_url = req.files['descricao_proposta'][0]?.location;
    const fotos_imagens_urls = req.files['fotos_imagens']?.map(file => file.location) || [];

    const { id_usuario, nome_projetoacao, linguagem_artistica, duvidas, termo, nome_espaco } = req.body;

    const novoProjeto = await ProjetoAcao.create({
      id_usuario,
      nome_projetoacao,
      linguagem_artistica,
      duvidas,
      termo: termo === 'true',
      nome_espaco,
      descricao_proposta: descricao_proposta_url,
      fotos_imagens: fotos_imagens_urls.join(','),
    });

    // Retornar as URLs dos arquivos na resposta
    res.status(201).json({
      message: 'Projeto criado com sucesso.',
      descricao_proposta: descricao_proposta_url,
      fotos_imagens: fotos_imagens_urls,
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ message: 'Erro ao criar projeto', error: error.message });
  }
};

// Função para atualizar um projeto pelo ID
const atualizarProjeto = async (req, res) => {
  const { id } = req.params;
  try {
    const [projetoAtualizado] = await ProjetoAcao.update(req.body, { where: { id_projetoacao: id } });
    if (!projetoAtualizado) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json({ message: 'Projeto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ message: 'Erro ao atualizar projeto', error: error.message });
  }
};

// Função para deletar um projeto pelo ID
const deletarProjeto = async (req, res) => {
  const { id } = req.params;
  try {
    const projetoDeletado = await ProjetoAcao.destroy({ where: { id_projetoacao: id } });
    if (!projetoDeletado) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ message: 'Erro ao deletar projeto', error: error.message });
  }
};

module.exports = {
  listarProjetos,
  obterProjetoPorId,
  listarProjetosPorUsuario,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
};
