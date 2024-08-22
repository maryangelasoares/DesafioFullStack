import React, { useState, useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Container, Title, PainelContainer, PainelHeader, PainelButton, PainelCard, Painel, SearchInput } from './styles';
import SoliciteCard from '../SoliciteCard';
import { useAuth } from '../../hooks/useAuth'; // Importe o hook useAuth
import { set } from 'react-hook-form';

// Define o elemento raiz da aplicação para acessibilidade
Modal.setAppElement('#root');

const Content = () => {
    const { userId } = useAuth(); // Obtenha o userId do contexto de autenticação
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState(null);
    const [solicitations, setSolicitations] = useState([]);
    const [filteredSolicitations, setFilteredSolicitations] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchSolicitations();
        }
    }, [userId]);

    useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  }, [userId]);
  console.log(userData, setUserData);

    const fetchSolicitations = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/projetosAcoes/usuario/${userId}`); // Endpoint do seu backend para listar projetos/solicitações por ID de usuário
            setSolicitations(response.data);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
        }
    };

    useEffect(() => {
        setFilteredSolicitations(
            solicitations.filter(solicitation =>
                solicitation.nome_projetoacao.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [solicitations, searchTerm]);

    return (
        <Container>
            <Title>
                <h4>Olá, Seja bem vindo!</h4>
            </Title>

            <PainelContainer>
                <Painel>
                    <PainelHeader>
                        Suas Solicitações
                    </PainelHeader>

                    <PainelButton>
                        <SearchInput
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </PainelButton>
                </Painel>

                <PainelCard>
                    {filteredSolicitations.map((solicitation, index) => (
                        <SoliciteCard
                            key={index}
                            cardTitle={solicitation.nome_projetoacao}
                            subTitle={solicitation.linguagem_artistica}
                            cidadeTitle={solicitation.nome_espaco}
                            status={solicitation.status}
                            data={new Date(solicitation.data_criacao).toLocaleDateString()}
                            statusColor={
                                solicitation.status === 'Em Análise' ? '#d2c339' :
                                solicitation.status === 'Aprovado' ? '#3D978F' :
                                solicitation.status === 'Reprovado' ? '#a13532' :
                                solicitation.status === 'Reenviar' ? '#3c77e4' :
                                '#3D978F'
                            }
                        />
                    ))}
                </PainelCard>
            </PainelContainer>
        </Container>
    );
}

export default Content;
