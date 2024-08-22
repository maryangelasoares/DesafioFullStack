/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import LayoutAdmin from "../../components/LayoutAdmin";
import ContentAdmin from "../../components/ContentAdmin";
import PieChartComponent from '../../components/AreaChart/PieChart';
import BarChartComponent from '../../components/AreaChart/BarChart';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ContentLoader from 'react-content-loader';

import { ContainerHeader, Title, Button, ChartsAll, ButtonContainer, ChartsRow, Card, FormDataCard, CardTitle } from "./styles";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
    const [formData, setFormData] = useState(null); // Estado para armazenar os dados do formulário
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);

    const exportPDF = () => {
        const input = document.getElementById('chartsContainer');
        
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save("relatorio.pdf");
            });
    };

    useEffect(() => {
        // Simula o carregamento inicial dos dados do formulário
        fetchFormDataFromDB()
            .then(data => {
                setFormData(data);
                setIsLoading(false); // Marca o carregamento como completo
            })
            .catch(error => {
                console.error('Erro ao buscar dados do formulário:', error);
                setIsLoading(false); // Em caso de erro, marca o carregamento como completo
            });
    }, []);

    // Função para simular a busca de dados do banco de dados
    const fetchFormDataFromDB = () => {
        // Simula uma requisição assíncrona para buscar os dados do banco de dados
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockFormData = {
                    "Cataguases, MG": 10,
                    "Nova Friburgo, RJ": 15,
                    "João Pessoa, PB": 8,
                };
                resolve(mockFormData);
            }, 2000); // Simula um tempo de resposta de 2 segundos
        });
    };

    return (
        <LayoutAdmin>
            <ContentAdmin>
                <ContainerHeader>
                    <Title>Dashboard</Title>
                    <ButtonContainer>
                        <Button onClick={exportPDF}>Exportar Relatórios</Button>
                    </ButtonContainer>
                </ContainerHeader>
                <ChartsAll id="chartsContainer">
                    <ChartsRow>
                        <FormDataCard>
                            {isLoading ? (
                                <ContentLoader 
                                    speed={2}
                                    width={400}
                                    height={200}
                                    viewBox="0 0 400 200"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                >
                                    <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
                                </ContentLoader>
                            ) : (
                                <div>
                                    <CardTitle>Contador de Formulários Enviados</CardTitle>
                                    {Object.keys(formData).map((key) => (
                                        <p key={key}>{key}: {formData[key]}</p>
                                    ))}
                                </div>
                            )}
                        </FormDataCard>
                        <Card>
                            <div ref={pieChartRef}>
                                <PieChartComponent />
                            </div>
                        </Card>
                    </ChartsRow>
                    <Card>
                        <div ref={barChartRef}>
                            <BarChartComponent />
                        </div>
                    </Card>
                </ChartsAll>
            </ContentAdmin>
        </LayoutAdmin>
    );
};

export default Dashboard;
