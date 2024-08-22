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
     height: 100%;

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
`;

export const CardPerfil = styled.div`
    display: flex;
`;

export const Profile = styled.div`
     padding-top: 4rem; 
     display: flex;
     align-items: center;
`;

export const LogoInst = styled.img`
    height: 60px;
    padding-right: 1300px;
`;

export const RelativeContainer = styled.div`
    position: relative;
    display: flex;
`;

export const UserImg = styled.img`
    margin-bottom: 4rem;
    margin-right: 16px;
    height: 2rem; 
    width: 2rem; 
    object-fit: cover;
    cursor: pointer;
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
`;

