import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT; //Informando qual a posição no grid área;
    background-color: #F2F2F2; //Cor do Painel;
`;

export const Title = styled.h4`
    padding: 30px; 
    color: #3D978F;
`;

export const PainelContainer = styled.div`
    height: 500px; //Altura do Painel Container;
    width: 1200px; //Largura do Painel Container;
    background-color: #EBEBEB;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin-left: 44px;
    padding: 15px;
    display: flex;
    flex-direction: column;
`;

export const Painel = styled.div`
    background-color: #EBEBEB;
    border-radius: 15px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;


export const PainelCard = styled.div`
    margin-top: 15px;
`;

export const PainelHeader = styled.div`
    margin-left: 30px;

    color: #3D978F;

`;

export const PainelButton = styled.div`
    display: flex;
    align-items: center;


    > button {
        background-color: #3D978F;
        padding: 8px 16px;
        border-radius: 5px;
        color: #F2F2F2;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #3D978FCC; /* Mais escuro para efeito de hover */
        }
    }        
`;

export const Modal = styled.div`
  max-width: 90%; /* Responsividade */
  width: 600px; /* Largura máxima */
  margin: 0 auto; /* Centralização */
  position: relative;
  padding: 10px;
  display: flex; /* Layout flexível para alinhar conteúdo */
  flex-direction: column; 

  h3 {
    margin-bottom: 15px;
  }

  button { /* Estilização do botão de fechar */
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #3D978F;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #3D978FCC;
    }
  }

  div { /* Estilização do contêiner do input e resultados */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px; /* Espaçamento entre input e cards */
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;  
  margin-right: 32px;
  text-align: center;
  letter-spacing: 0.5px;
  

  &:focus { 
    outline: none;
    border-color: #3D978F;
    box-shadow: 0 0 5px #3D978F;
  }
`;