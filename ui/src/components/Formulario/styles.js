import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const FormTitle = styled.h3`
  color: #444;
  text-align: center;
  margin-bottom: 15px;
  letter-spacing: 1px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormField = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  width: 100%;

  & > div {
    flex: 1;
    min-width: 200px;
    margin: 10px;
    margin-bottom: 10px;
  }

  strong {
    color: #333;
    font-size: 1rem;
  }
  .paragrafo {
    margin-top: 5px;
    margin: auto ;
    font-size: 0.875rem;
    color : #737373;
    text-align: justify;
  }

  a {
    color: #3d987f;
    text-decoration: none;
  }
`;

export const Label = styled.label`
  color: #444;
  display: block;
  margin-left: 10px;
  margin-right: 15px;

`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #444;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const RadioButton = styled.input`
  margin-right: 10px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #3d978e;
  margin: auto;
  width: 10%;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  letter-spacing: 1px;

  &:hover {
    background-color: #3d978f;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #444;
  height: 30px;
  width: 30px;
  border-radius: 50px;
  border: none;
  color: #F2F2F2;
  font-size: 14px;
  cursor: pointer;
`;

// Em styles.js
export const DisplayData = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  color: #444;
  background-color: #f2f2f2;
  margin-top: 5px;
`;
