import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image from '../../assets/logoInstituto.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, MenuItem } from '@mui/material'; 
import { Container, CadastroContainer, Form, FormCadastro, Title, LoginContainer, Anchor, OverlayContainer, Overlay,
    EsquerdoPainel, DireitoPainel, Paragraph, LeftButton, SubTitle, SubTitleNoMargin, ImageContainer, Body, TitleTwo, Button } from "./styles";
import { useAuth } from "../../hooks/useAuth";

const FormLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({
    nome_completo: '',
    email: '',
    senha: '',
    telefone: '',
    genero: '',
    raca_etnia: '',
    cidade: '',
    estado: '',
    comprovante_residencia: '',
    documento_identificacao: '',
    documento_rne: ''
  });

  const navigate = useNavigate();
  const { login, logged, role } = useAuth();

  useEffect(() => {
    if (logged) {
      if (role === 'admin') {
        navigate('/homeadmin');
      } else {
        navigate('/home');
      }
    }
  }, [logged, role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', {
        email: userData.email,
        senha: userData.senha
      });

      if (response.status === 200) {
        const { token, role, userId } = response.data;
        login(token, role, userId); // Atualiza o estado de autenticação no hook
        console.log('Login bem-sucedido. Redirecionando...');
      } else {
        toast.error('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    }
  };
    
    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nome_completo', userData.nome_completo);
            formData.append('email', userData.email);
            formData.append('senha', userData.senha);
            formData.append('telefone', userData.telefone);
            formData.append('genero', userData.genero);
            formData.append('raca_etnia', userData.raca_etnia);
            formData.append('cidade', userData.cidade);
            formData.append('estado', userData.estado);
            formData.append('comprovante_residencia', userData.comprovante_residencia);
            formData.append('documento_identificacao', userData.documento_identificacao);
            formData.append('documento_rne', userData.documento_rne);

            const response = await axios.post('http://localhost:3000/api/usuarios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

           
            if (response.status === 201) {
                toast.success(
                    `Cadastro realizado com sucesso! Seja bem-vindo(a), ${response.data.nome_completo}!`,
                    { position: 'top-left', autoClose: 4000 }
                );
                setTimeout(() => navigate('/login'), 4000);
            } else {
                toast.error(response.data.message || 'Erro ao cadastrar usuário. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Erro ao cadastrar usuário. Tente novamente.');
            } else if (error.request) {
                toast.error('Sem resposta do servidor. Verifique sua conexão e tente novamente.');
            } else {
                toast.error('Erro ao enviar a requisição. Tente novamente mais tarde.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const toggleLogin = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };
    return (
        <>
            <ToastContainer />
            <Body>
                <SubTitle>Bem-vindo ao Formulário de Inscrição</SubTitle>
                <SubTitleNoMargin><h4>Instituto Energisa</h4></SubTitleNoMargin>
                <Container>
                    <CadastroContainer isLogin={isLogin}>
                        <FormCadastro onSubmit={handleCadastro}>
                            <Title>Dados do Usuário</Title><br />
                            <TextField
                                label="Nome Completo"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="nome_completo"
                                value={userData.nome_completo}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Senha"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="senha"
                                type="password"
                                value={userData.senha}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Telefone"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="telefone"
                                value={userData.telefone}
                                onChange={handleInputChange}
                            />
                            <TextField
                                select
                                label="Gênero"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="genero"
                                value={userData.genero}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o Gênero</MenuItem>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Raça/Etnia"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="raca_etnia"
                                value={userData.raca_etnia}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione a Raça/Etnia</MenuItem>
                                <MenuItem value="Branco">Branco</MenuItem>
                                <MenuItem value="Negro">Negro</MenuItem>
                                <MenuItem value="Pardo">Pardo</MenuItem>
                                <MenuItem value="Amarelo">Amarelo</MenuItem>
                                <MenuItem value="Indígena">Indígena</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                            </TextField>
                            <TextField
                                label="Cidade"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="cidade"
                                value={userData.cidade}
                                onChange={handleInputChange}
                            />
                            <TextField
                                select
                                label="Estado"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="estado"
                                value={userData.estado}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="" disabled>Selecione o Estado</MenuItem>
                                <MenuItem value="AC">Acre</MenuItem>
                                <MenuItem value="AL">Alagoas</MenuItem>
                                <MenuItem value="AP">Amapá</MenuItem>
                                <MenuItem value="AM">Amazonas</MenuItem>
                                <MenuItem value="BA">Bahia</MenuItem>
                                <MenuItem value="CE">Ceará</MenuItem>
                                <MenuItem value="DF">Distrito Federal</MenuItem>
                                <MenuItem value="ES">Espírito Santo</MenuItem>
                                <MenuItem value="GO">Goiás</MenuItem>
                                <MenuItem value="MA">Maranhão</MenuItem>
                                <MenuItem value="MT">Mato Grosso</MenuItem>
                                <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                                <MenuItem value="MG">Minas Gerais</MenuItem>
                                <MenuItem value="PA">Pará</MenuItem>
                                <MenuItem value="PB">Paraíba</MenuItem>
                                <MenuItem value="PR">Paraná</MenuItem>
                                <MenuItem value="PE">Pernambuco</MenuItem>
                                <MenuItem value="PI">Piauí</MenuItem>
                                <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                                <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                                <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                                <MenuItem value="RO">Rondônia</MenuItem>
                                <MenuItem value="RR">Roraima</MenuItem>
                                <MenuItem value="SC">Santa Catarina</MenuItem>
                                <MenuItem value="SP">São Paulo</MenuItem>
                                <MenuItem value="SE">Sergipe</MenuItem>
                                <MenuItem value="TO">Tocantins</MenuItem>
                            </TextField>
                            <TextField
                                label="Comprovante de Residência"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="comprovante_residencia"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Documento de Identificação"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="documento_identificacao"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Documento RNE"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="documento_rne"
                                type="file"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                            />
                            <Button type="submit">Cadastre-se</Button>
                        </FormCadastro>
                    </CadastroContainer>
                    <LoginContainer isLogin={isLogin}>
                        <Form onSubmit={handleLogin}>
                            <Title>Olá! Faça seu Login.</Title>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="email"
                                type="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Senha"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="senha"
                                type="password"
                                value={userData.senha}
                                onChange={handleInputChange}
                            />
                            <Anchor href="#">Esqueceu sua Senha?</Anchor>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '16px' }}
                            >
                                Entrar
                            </Button>
                        </Form>
                    </LoginContainer>
                    <OverlayContainer isLogin={isLogin}>
                        <Overlay isLogin={isLogin}>
                            <EsquerdoPainel isLogin={isLogin}>
                                <LeftButton onClick={toggleLogin}>Entrar</LeftButton>
                                <TitleTwo>Já Possui Cadastro?</TitleTwo>
                            </EsquerdoPainel>
                            <DireitoPainel isLogin={isLogin}>
                                <Paragraph>Ainda não possui uma Conta?</Paragraph>
                                <LeftButton onClick={toggleLogin}>CADASTRAR-SE</LeftButton>
                            </DireitoPainel>
                        </Overlay>
                    </OverlayContainer>
                </Container>
                <ImageContainer>
                    <img src={Image} alt="Logo Instituto Energisa" style={{ width: '50%', maxWidth: '200px' }} />
                </ImageContainer>
            </Body>
        </>
    );
}

export default FormLogin;
