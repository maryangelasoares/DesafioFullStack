import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Container, Profile, LogoInst, RelativeContainer, UserImg, Menu, MenuItem, CardPerfil, Modal, ModalContent, ModalTitle, ModalCloseButton } from "./styles";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import photoProfile from "../../assets/mode-portrait.svg";
import logo from "../../assets/logoInstituto.png";

const MainHeader = () => {
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { userId, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
                const userData = response.data;
                setUserData(userData);
                setUserName(userData.nome_completo);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                toast.error('Erro ao buscar dados do usuário');
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target) && imgRef.current && !imgRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        reset(); // Limpa o formulário ao fechar o modal
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/usuarios/${userId}`, data);
            console.log('Dados do usuário atualizados com sucesso:', response.data);
            setUserData(response.data);
            setShowModal(false);
            toast.success('Dados do usuário atualizados com sucesso');
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            toast.error('Erro ao atualizar dados do usuário');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/logout');
            console.log('Logout realizado com sucesso:', response.data);

            // Limpa o localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');

            // Chama a função logout do useAuth para atualizar o estado de autenticação
            logout();

            // Redireciona para a tela de login
            navigate('/login');
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
            toast.error('Erro ao realizar logout');
        }
    };

    const Menus = ['Meus Dados', 'Sair'];
    const menuRef = useRef();
    const imgRef = useRef();

    return (
        <Container>
            <ToastContainer />
            <LogoInst src={logo} alt="Logo Instituto Energisa" />

            <Profile>
                <RelativeContainer>
                    <CardPerfil>

                        
                        <UserImg
                            ref={imgRef}
                            onClick={() => setOpen(!open)}
                            src={photoProfile}
                            alt="Foto de Perfil"
                        />
                    </CardPerfil>
                    {open && (
                        <Menu ref={menuRef}>
                            <ul>
                                <div>{userName}</div>
                                {Menus.map((menu) => (
                                    <MenuItem
                                        onClick={() => {
                                            if (menu === 'Meus Dados') {
                                                handleOpenModal();
                                            } else if (menu === 'Sair') {
                                                handleLogout();
                                            }
                                            setOpen(false);
                                        }}
                                        key={menu}
                                    >
                                        {menu}
                                    </MenuItem>
                                ))}
                            </ul>
                        </Menu>
                    )}
                </RelativeContainer>
            </Profile>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <ModalTitle>Meus Dados</ModalTitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Nome Completo:</label>
                            <input
                                {...register("nome_completo")}
                                defaultValue={userData?.nome_completo}
                                style={{ marginBottom: "8px", fontSize: "1rem", borderBottom: "1px solid #3D978F" }}
                            />
                            <label>Email:</label>
                            <input
                                {...register("email")}
                                defaultValue={userData?.email}
                                style={{ marginBottom: "8px", fontSize: "1rem", borderBottom: "1px solid #3D978F" }}
                            />
                            <label>Telefone:</label>
                            <input
                                {...register("telefone")}
                                defaultValue={userData?.telefone}
                                style={{ marginBottom: "8px", fontSize: "1rem", borderBottom: "1px solid #3D978F" }}
                            />
                            <label>Gênero:</label>
                            <input
                                {...register("genero")}
                                defaultValue={userData?.genero}
                                style={{ marginBottom: "8px", fontSize: "1rem", borderBottom: "1px solid #3D978F" }}
                            />
                            <label>Senha:</label>
                            <input
                                {...register("senha")}
                                type="password"
                                style={{ marginBottom: "8px", fontSize: "1rem", borderBottom: "1px solid #3D978F" }}
                            />
                            <button type="submit" style={{ backgroundColor: "#3D978F", color: "white", padding: "5px", borderRadius: "5px", border: "none" }}>Salvar</button>
                        </form>
                        <ModalCloseButton onClick={handleCloseModal}>Fechar</ModalCloseButton>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

export default MainHeader;
