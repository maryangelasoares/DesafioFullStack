import styled from "styled-components";

// Layout:
//MH = Main Header;
//AS = Aside;
//CT = Content;

export const Grid= styled.div`
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 60px auto;
    grid-template-areas: 
    'MH  MH'
    'AS CT';
    height: 100vh;
    overflow: hidden;   
`;