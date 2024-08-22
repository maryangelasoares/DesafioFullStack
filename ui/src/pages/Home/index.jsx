import React from 'react';
import Content from "../../components/Content";
import { Container } from "./styles";
import Layout from '../../components/Layout';

const Home = () => {
    return (
        <Layout>
            <Container>
                <Content />
            </Container>
        </Layout>
    );
};

export default Home;
