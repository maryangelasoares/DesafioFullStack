import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { FormContainer, FormTitle, Form, FormField, Label, Input, Checkbox, CloseButton, Select, ErrorMessage, SubmitButton,
  DisplayData } from './styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormularioInscricao = ({ closeModal }) => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const { userId } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const onSubmit = async (data) => {
    try {
      // Construir FormData para enviar arquivos E dados do projeto
      const formData = new FormData();
      formData.append('descricao_proposta', data.descricao_proposta[0]);
      for (let i = 0; i < data.fotos_imagens.length; i++) {
        formData.append('fotos_imagens', data.fotos_imagens[i]);
      }
      formData.append('id_usuario', userId); // Adicionar ID do usuário
      formData.append('nome_projetoacao', data.nome_projetoacao);
      formData.append('linguagem_artistica', data.linguagem_artistica);
      formData.append('duvidas', data.duvidas || ''); // Permitir que seja vazio
      formData.append('nome_espaco', data.nome_espaco);
      formData.append('termo', data.termo);
      formData.append('status', 'Em análise');
      formData.append('data_criacao', new Date().toISOString());

      // Enviar todos os dados em uma única requisição
      await axios.post('http://localhost:3000/api/projetosAcoes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Projeto cadastrado com sucesso!', {
        onClose: () => {
          closeModal(); // Fechar o modal
          reset();      // Limpar os campos do formulário
          window.location.reload(); // Recarregar a página
        }
      });

    } catch (error) {
      // Tratar erros de requisição
      if (error.response) {
        console.error('Erro de validação:', error.response.data);
        toast.error('Erro ao cadastrar projeto: ' + error.response.data.error);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
        toast.error('Erro ao cadastrar projeto. Verifique sua conexão com a internet.');
      } else {
        console.error('Erro ao configurar a requisição:', error.message);
        toast.error('Erro ao cadastrar projeto. Por favor, tente novamente mais tarde.');
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>FORMULÁRIO DE SOLICITAÇÃO</FormTitle>
      <CloseButton type="button" onClick={closeModal}>X</CloseButton>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <div>
            <Label>Nome Completo:</Label>
            <DisplayData>{userData?.nome_completo}</DisplayData>
          </div>
          <div>
            <Label>Cidade/Estado:</Label>
            <DisplayData>{userData ? `${userData.cidade} - ${userData.estado}` : ''}</DisplayData>
          </div>
          <div>
            <Label>Telefone:</Label>
            <DisplayData>{userData?.telefone}</DisplayData>
          </div>
          <div>
            <Label>Email:</Label>
            <DisplayData>{userData?.email}</DisplayData>
          </div>
          <div>
            <Label>Gênero - Raça/Etnia:</Label>
            <DisplayData>{userData ? `${userData.genero} - ${userData.raca_etnia}` : ''}</DisplayData>
          </div>
        </FormField>

        <FormField>
          <div>
            <Label htmlFor="nome_projetoacao">Nome do Projeto/Proposta:</Label>
            <Input
              type="text"
              id="nome_projetoacao"
              {...register("nome_projetoacao", { required: true })}
              placeholder="Digite o Nome do Projeto"
            />
            {errors.nome_projetoacao && <ErrorMessage>Nome do projeto é obrigatório.</ErrorMessage>}
          </div>
          <div>
            <Label htmlFor="linguagem_artistica">Linguagem artística da proposta:</Label>
            <Select {...register("linguagem_artistica", { required: true })} id="linguagem_artistica">
              <option value="">Selecione...</option>
              <option value="Artes Cênicas">Artes Cênicas</option>
              <option value="Cinema">Cinema</option>
              <option value="Exposição">Exposição</option>
              <option value="Música">Música</option>
              <option value="Inovação">Inovação</option>
              <option value="Outros">Outros</option>
            </Select>
            {errors.linguagem_artistica && <ErrorMessage>Linguagem artística é obrigatória.</ErrorMessage>}
            {watch("linguagem_artistica") === "Outros" && (
              <div>
                <Label>Especifique:</Label>
                <Input type="text" {...register("outrolinguagem_artistica")} id="outrolinguagem_artistica" />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="nome_espaco">Espaço Cultural do Instituto Energisa:</Label>
            <Select {...register("nome_espaco", { required: true })} id="nome_espaco">
              <option value="">Selecione...</option>
              <option value="Cataguases, MG">Cataguases, MG</option>
              <option value="João Pessoa, PB">João Pessoa, PB</option>
              <option value="Nova Friburgo, RJ">Nova Friburgo, RJ</option>
            </Select>
            {errors.nome_espaco && <ErrorMessage>Seleção de espaço é obrigatória.</ErrorMessage>}
          </div>
          <div>
            <Label htmlFor="duvidas">Dúvidas e observações:</Label>
            <Input
              type="text"
              id="duvidas"
              {...register("duvidas")}
              placeholder="Digite suas dúvidas e observações"
            />
          </div>
        </FormField>

        <FormField>
          <div>
            <Label htmlFor="descricao_proposta">
              Descrição da proposta com projeto, currículo, ficha técnica e cronograma (PDF):
            </Label>
            <Input
              type="file"
              id="descricao_proposta"
              accept=".pdf, .docx"
              {...register("descricao_proposta", { required: true })}
            />
            {errors.descricao_proposta && <ErrorMessage>Arquivo é obrigatório.</ErrorMessage>}
          </div>
          <div>
            <Label htmlFor="fotos_imagens">
              Fotos, imagens e comprovantes de atuação do grupo, artista ou espetáculo:
            </Label>
            <Input
              type="file"
              id="fotos_imagens"
              accept=".pdf, .docx"
              {...register("fotos_imagens", { required: true })}
            />
            {errors.fotos_imagens && <ErrorMessage>Arquivo é obrigatório.</ErrorMessage>}
          </div>
        </FormField>

        <FormField>
          <Label htmlFor="termo">
            <strong>AVISO DE PRIVACIDADE E TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS.</strong>
            <br />
            <p>
              Para que você possa participar do Edital de Seleção de Projetos Culturais 2024 para Cessão Gratuita dos espaços culturais
              do Instituto Energisa (IE), ao qual este Aviso de Privacidade se refere,  o IE poderá coletar determinados Dados Pessoais,
              como: nome, sobrenome, nome social, RG, CPF/CNPJ, data de nascimento, etnia/raça, gênero, telefone, e-mail, cidade e estado.
              O IE observa as leis vigentes sobre segurança e proteção de Dados Pessoais (“Leis de Proteção de Dados Aplicáveis”), em especial a Lei Federal nº
              13.709/2018, Lei Geral de Proteção de Dados (“LGPD”).
            </p>
            <Checkbox
              type="checkbox"
              id="termo"
              {...register("termo", { required: true })}
            />
            Estou ciente e de Acordo.
            {errors.termo && <ErrorMessage>Você deve concordar com os termos.</ErrorMessage>}
          </Label>
        </FormField>

        <SubmitButton type="submit">ENVIAR</SubmitButton>
      </Form>
      <ToastContainer 
        position="top-center" // Exibe a notificação no topo central
        autoClose={3000}      // Fecha automaticamente após 5 segundos
      />
    </FormContainer>
  );
};

export default FormularioInscricao;
