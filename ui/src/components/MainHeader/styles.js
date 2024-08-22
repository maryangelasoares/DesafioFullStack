import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;
    color: #3D978F;
    background-color: #F2F2F2;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 3px solid  #3D978F;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 5px;
    }
`;

export const MenuItem = styled.li`
    list-style-type: none;
    padding: 2px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #F2F2F2;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

export const CardPerfil = styled.div`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Profile = styled.div`
    padding-top: 4rem;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        padding-top: 2rem;
    }
`;

export const LogoInst = styled.img`
    height: 60px;
    padding-right: 1300px;
    position: relative;

    @media (max-width: 768px) {
        padding-right: 0;
        height: 50px;
    }
`;

export const RelativeContainer = styled.div`
    position: relative;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const UserImg = styled.img`
    margin-bottom: 4rem;
    margin-right: 16px;
    height: 2rem; 
    width: 2rem; 
    object-fit: cover;
    cursor: pointer;

    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }
`;

export const Menu = styled.div`
    border-radius: 10px;
    background-color: #FFFFFF;
    padding: 1rem;
    width: 10rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: -8rem;
    top: 3.3rem;
    z-index: 1000;

    @media (max-width: 768px) {
        left: 0;
        top: 2.5rem;
        width: 8rem;
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-width: 80%;
    width: 500px;

    @media (max-width: 768px) {
        width: 90%;
        max-width: none;
    }
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
    }
    > label {
        font-size: 1.1rem;
        font-weight: bold;

        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }
    > input {
        padding: 0.5rem;
        border: 1px solid #3D978F;
        border-radius: 5px;

        @media (max-width: 768px) {
            padding: 0.4rem;
        }
    }
    > button  {
        padding: 0.5rem;
        width: 100%;
        color: #3D978F;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        @media (max-width: 768px) {
            padding: 0.4rem;
        }
    }
`;

export const ModalTitle = styled.h2`
    margin-bottom: 5px;
    color: #3D978F;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

export const ModalCloseButton = styled.button`
    margin-top: 5px;
    padding: 4px 8px;
    background-color: #fff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #333;
    }

    @media (max-width: 768px) {
        padding: 3px 6px;
    }
`;
