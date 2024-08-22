import styled from "styled-components";

export const ChartsAll = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column; 
  width: 100%;
  margin-top: 2rem; 
`;

export const ChartsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2rem;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  position: relative; 
  margin-top: 10px;
`;

export const Button = styled.a`
  color: #f2f2f2;
  background-color: #3d987f;
  cursor: pointer;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  margin-right: 20px;
  `;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px; 
`;

export const Title = styled.h3`
  margin-left: 20px;
  color: #3d978f;
`;

export const Card = styled.div`
  height: 30vh;
  background-color: #F2F2F2;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px; /* Espaçamento entre os cards */
  flex: 1; /* Distribui igualmente o espaço entre os cards */
`;

export const FormDataCard = styled(Card)`
  min-width: 300px; /* Largura mínima para garantir consistência */
`;

export const CardTitle = styled.h2`

  display: flex;
  height: 15vh;
  margin-bottom: 1rem;
  color: #3d978f;
`;

export const PieChartCard = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PieChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;

export const LegendItem = styled.span`
  color: #333;
  font-size: 14px;
  margin-bottom: 0.5rem;
`;