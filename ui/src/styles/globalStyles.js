import { createGlobalStyle } from 'styled-components';

// ESTILIZANDO DE FORMA GLOBAL TODA NOSSA APLICAÇÃO;

export default createGlobalStyle`
    * {
        margin: 0; //espaçamento interno;
        padding: 0; //espaçamento externo;
        box-sizing: border-box; //Não alterar borda mantendo o tamanho do elemento;
    }

    html, body, #root {
        height: 100%
    }

    *, button, input {
        border: 0;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }
`;

