import styled from 'styled-components';


export const Container = styled.div`
    grid-area: AS;
    color: #F2F2F2;
    background-color: #3D978F;
    padding-left: 22px;
`;

export const MenuContainer = styled.nav `
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    `;

export const MenuItemLink= styled.a `
    color: #F2F2F2;
    text-decoration: none;
    margin: 3px 0;
    display: flex;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    };

    > svg {
    font-size: 22px;
    margin-right: 10px;
    }
`;

