import React, { useState, useEffect, useMemo } from 'react';
import LayoutAdmin from "../../components/LayoutAdmin";
import ContentAdmin from "../../components/ContentAdmin";
import SoliciteCard from '../../components/SoliciteCard';
import Modal from 'react-modal';
import axios from 'axios';
import { Container, Title, PainelContainer, PainelButton, PainelCard, Painel, SearchInput } from './styles';
import { toast, ToastContainer } from 'react-toastify';

Modal.setAppElement('#root');

const Request = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [solicitations, setSolicitations] = useState([]);
    const [selectedSolicitation, setSelectedSolicitation] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchSolicitations();
    }, []);

    const fetchSolicitations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/projetosAcoes');
            setSolicitations(response.data);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
            setSelectedUser(response.data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do usuário:', error);
        }
    };

    const filteredSolicitations = useMemo(() => {
        return solicitations.filter(solicitation =>
            solicitation.nome_projetoacao.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, solicitations]);

    const filteredByDateSolicitations = useMemo(() => {
        if (!filterDate) return filteredSolicitations;
        return filteredSolicitations.filter(solicitation => solicitation.data_criacao === filterDate);
    }, [filterDate, filteredSolicitations]);

    const sortedSolicitations = useMemo(() => {
        const pending = filteredByDateSolicitations.filter((solicitation => solicitation.status === 'Em Análise' || solicitation.status === 'Em Análise' || solicitation.status === 'Pendente'));
        const approved = filteredByDateSolicitations.filter(solicitation => solicitation.status === 'Aprovado');
        const reenviado = filteredByDateSolicitations.filter(solicitation => solicitation.status === 'Reenviar');
        return [...pending, ...approved, ...reenviado];
    }, [filteredByDateSolicitations]);

    const openModal = async (solicitation) => {
        console.log('Abrindo modal para a solicitação:', solicitation);
        setSelectedSolicitation(solicitation);
        setModalIsOpen(true);

        await fetchUserDetails(solicitation.id_usuario);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedSolicitation(null);
        setSelectedUser(null);
    };

    const handleApprove = async () => {
        try {
            await axios.put(`http://localhost:3000/api/projetosAcoes/${selectedSolicitation.id_projetoacao}`, { status: 'Aprovado' });
    
            await axios.post('http://localhost:3000/api/notificacoes/enviar', {
                id_usuario: selectedSolicitation.id_usuario,
                id_projetoacao: selectedSolicitation.id_projetoacao,
                status: 'Aprovado'
            });
    
            const updatedSolicitations = solicitations.map(solicitation => {
                if (solicitation.id_projetoacao === selectedSolicitation.id_projetoacao) {
                    return { ...solicitation, status: 'Aprovado' };
                }
                return solicitation;
            });
    
            setSolicitations(updatedSolicitations);
            closeModal();
            toast.success('Projeto aprovado com sucesso');
        } catch (error) {
            console.error('Erro ao aprovar projeto:', error);
            closeModal();
        }
    };

    const handleReject = async () => {
        try {
            await axios.put(`http://localhost:3000/api/projetosAcoes/${selectedSolicitation.id_projetoacao}`, { status: 'Reprovado' });

            await axios.post('http://localhost:3000/api/notificacoes/enviar', {
                id_usuario: selectedSolicitation.id_usuario,
                id_projetoacao: selectedSolicitation.id_projetoacao,
                status: 'Reprovado'
            });

            setSelectedSolicitation(prevState => ({
                ...prevState,
                status: 'Reprovado'
            }));
            toast.success('Projeto reprovado com sucesso');
            closeModal();
        } catch (error) {
            console.error('Erro ao rejeitar projeto:', error);
            closeModal();
        }
    };

    const handleResend = async () => {
        try {
            await axios.put(`http://localhost:3000/api/projetosAcoes/${selectedSolicitation.id_projetoacao}`, { status: 'Reenviar' });

            await axios.post('http://localhost:3000/api/notificacoes/enviar', {
                id_usuario: selectedSolicitation.id_usuario,
                id_projetoacao: selectedSolicitation.id_projetoacao,
                status: 'Reenviar'
            });

            setSelectedSolicitation(prevState => ({
                ...prevState,
                status: 'Reenviar'
            }));
            toast.success('Projeto reenviado com sucesso');
            closeModal();
        } catch (error) {
            console.error('Erro ao reenviar projeto:', error);
            closeModal();
        }
    };

    return (
        <LayoutAdmin>
            <ContentAdmin>
                <ToastContainer />
                <Container>
                    <Title>
                        Todas Solicitações
                    </Title>
                    <PainelButton>
                        <SearchInput
                            type="text"
                            placeholder="Pesquisar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </PainelButton>
                </Container>

                <PainelContainer>
                    <PainelCard>
                        {sortedSolicitations.map((solicitation, index) => (
                            <SoliciteCard
                                key={index}
                                cardTitle={solicitation.nome_projetoacao}
                                subTitle={solicitation.linguagem_artistica}
                                cidadeTitle={solicitation.nome_espaco}
                                status={solicitation.status}
                                data={new Date(solicitation.data_criacao).toLocaleDateString()}
                                onClick={() => openModal(solicitation)}
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

                {selectedSolicitation && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Detalhes da Solicitação"
                        style={{
                            content: {
                                color: '#3D987F',
                                backgroundColor: '#F2F2F2',
                                top: '50%',
                                borderRadius: '15px',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                transform: 'translate(-50%, -50%)',
                                width: '50%',
                                maxHeight: '80%',
                                overflow: 'auto',
                                padding: '15px',
                               
                            }
                        }}
                    >
                        <div  style={{ margin: 4 }}>
                            <h3 style= {{color: '#3d978F'}}>Detalhes do Projeto</h3>
                            <button
                                onClick={closeModal}
                                style={{
                                    position: 'absolute',
                                    color: '#F2F2F2',
                                    backgroundColor: '#3D978F',
                                    borderRadius: '50px',
                                    width: '25px',
                                    height: '25px',
                                    marginLeft: '94%',
                                    transform: 'translate(-50%, -50%)',
                                }}>
                                X
                            </button>
                        </div>
                        <div  style={{ margin: 4 }}>
                        <div style={{ marginBottom: '20px', color: '#474747'}}>
                            <p><strong>Nome do Projeto:</strong> {selectedSolicitation.nome_projetoacao}</p>
                            <p><strong>Linguagem Artística:</strong> {selectedSolicitation.linguagem_artistica}</p>
                            <p><strong>Nome do Espaço:</strong> {selectedSolicitation.nome_espaco}</p>
                            <p><strong>Status:</strong> {selectedSolicitation.status}</p>
                            <p><strong>Data de Criação:</strong> {new Date(selectedSolicitation.data_criacao).toLocaleDateString()}</p>
                            <p><strong>Descrição:</strong>
                                <a href={selectedSolicitation.descricao_proposta} download>
                                    <button style={{
                                        backgroundColor: '#3D987F',
                                        color: 'white',
                                        padding: '2px 10px',
                                        marginLeft: '8px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                    }}>
                                        Download Descrição
                                    </button>
                                </a>
                            </p>
                            </div>
                            {selectedUser && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h3 style={{ margin: 4, color:'#3D987F' }}>Dados do Usuário</h3>
                                    <div style= {{color: '#474747'}}>
                                    <p><strong>Nome Completo:</strong> {selectedUser.nome_completo}</p>
                                    <p><strong>Email:</strong> {selectedUser.email}</p>
                                    <p><strong>Telefone:</strong> {selectedUser.telefone}</p>
                                    <p><strong>Gênero:</strong> {selectedUser.genero}</p>
                                    <p><strong>Raça/Etnia:</strong> {selectedUser.raca_etnia}</p>
                                    <p><strong>Cidade:</strong> {selectedUser.cidade}</p>
                                    <p><strong>Estado:</strong> {selectedUser.estado}</p>
                                    <p><strong>Documento de Identificação:</strong>
                                        <a href={selectedUser.documento_identificacao} download target='blank'>
                                            <button style={{
                                                backgroundColor: '#3D987F',
                                                color: 'white',
                                                padding: '2px 10px',
                                                marginLeft: '8px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                            }}>
                                                Download
                                            </button>
                                        </a>
                                    </p>
                                    <p><strong>RNE:</strong>
                                        <a href={selectedUser.documento_rne} download target='blank'>
                                            <button style={{
                                                backgroundColor: '#3D987F',
                                                color: 'white',
                                                padding: '2px 10px',
                                                marginLeft: '8px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                            }}>
                                                Download
                                            </button>
                                        </a>
                                    </p>
                                    <p><strong>Comprovante de Residência:</strong>
                                        <a href={selectedUser.comprovante_residencia} download target='blank'>
                                            <button style={{
                                                backgroundColor: '#3D987F',
                                                color: 'white',
                                                padding: '2px 10px',
                                                marginLeft: '8px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                            }}>
                                                Download
                                            </button>
                                        </a>
                                    </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {(selectedSolicitation.status === 'Em Análise' || selectedSolicitation.status === 'Pendente' || selectedSolicitation.status === 'Em análise') && (
                            <Painel>
                                <PainelButton onClick={handleApprove} style={{ backgroundColor: '#3D978F', color: '#F2F2F2', borderRadius: '50px', padding: '6px 16px' }}>
                                    APROVAR
                                </PainelButton>
                                <PainelButton onClick={handleReject} style={{ backgroundColor: '#de5353', color: '#F2F2F2', borderRadius: '50px', padding: '6px 16px' }}>
                                    REPROVAR
                                </PainelButton>
                                <PainelButton onClick={handleResend} style={{ backgroundColor: '#5c6fc4', color: '#F2F2F2', borderRadius: '50px', padding: '6px 16px' }}>
                                    REENVIAR
                                </PainelButton>
                            </Painel>
                        )}
                    </Modal>
                )}
            </ContentAdmin>
        </LayoutAdmin>
    );
};

export default Request;
