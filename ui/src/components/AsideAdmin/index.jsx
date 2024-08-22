import React from "react";
import { useNavigate } from "react-router-dom";

// Biblioteca React de Icons
import {
    MdHome,
    MdDashboard,
    MdArticle
} from "react-icons/md";

// Importando estilizações do CSS
import { 
    Container, 
    MenuContainer, 
    MenuItemLink 
} from "./styles";

const AsideAdm = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/homeadmin'); // Navegue para a página Dashboard
    }

    const handleDashboardClick = () => {
        navigate('/dashboard'); // Navegue para a página Dashboard
    }

    return (
        <Container>
            <MenuContainer>
                <MenuItemLink onClick={handleHomeClick}>
                    <MdHome />
                    Início
                </MenuItemLink>

                <MenuItemLink onClick={handleDashboardClick}>
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
            </MenuContainer>
        </Container>
    );
}

export default AsideAdm;
