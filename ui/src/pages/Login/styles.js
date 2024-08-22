import styled from "styled-components";
import backgroundImage from '../../assets/Foto1.jpg';

export const Body = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const ImageContainer = styled.div`
  margin-top: 70px;
  margin-left: 20px;
`;

export const Container = styled.div`
  background-color: #F2F2F2;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22), 0 2px 20px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 100%;
  min-height: 400px;
  margin: 0 auto;
  margin-top: 60px;
`;

export const CadastroContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  overflow-y: auto;

  ${props => props.isLogin !== true ? `
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;`
    : null}
`;

export const LoginContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;

  ${props => (props.isLogin !== true ? `
  transform: translateX(100%);`
    : null)}
`;

export const Form = styled.form`
  background-color: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  overflow-y: auto;
`;

export const FormCadastro = styled.form`
  background-color: #F2F2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  text-align: center;
  overflow-y: auto;
`;

export const Select = styled.select`
  background: #EBEBEB;
  border-radius: 50px;
  padding: 12px 15px;
  margin: 5px 0;
  width: 100%;
`;

export const Title = styled.div`
  color: #545454;
  font-size: 18px;
  padding: 10PX
`;

export const TitleTwo = styled.div`
  color: #EBEBEB;
  margin-top: 10px;
  font-size: 13px;
`;

export const SubTitle = styled.div`
  letter-spacing: 1px;
  font-size: 26px; 
  margin-top: 25px; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  color: #3D987F; 
  text-align: center; 
`;

export const SubTitleNoMargin = styled(SubTitle)`
  margin-top: 0; /* Remove a margem superior do segundo SubTitle */
`;

export const Input = styled.input`
  background: #EBEBEB;
  border-radius: 50px;
  padding: 12px 15px;
  margin: 5px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  background: linear-gradient(90deg, #009CC4, #006A2B);
  color: #F2F2F2;
  font-size: 12px;
  font-weight: bold;
  margin-top: 26px;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active{
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const LeftButton = styled(Button)`
  background-color: transparent;
`;

export const Anchor = styled.a`
  color: #545454;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${props => props.isLogin !== true ? `
  transform: translateX(-100%);`
    : null}
`;

export const Overlay = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0; 
  color: #F2F2F2;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${props => (props.isLogin !== true ? `
  transform: translateX(50%);`
    : null)}
`;

export const Painel = styled.div` 
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const EsquerdoPainel = styled(Painel)`
  transform: translateX(-20%);

  ${props => props.isLogin !== true ? `
  transform: translateX(0);`
    : null}
`;

export const DireitoPainel = styled(Painel)`
  right: 0;
  transform: translateX(0);

  ${props => props.isLogin !== true ? `
  transform: translateX(20%);`
    : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  letter-spacing: 0.5px;
`;
