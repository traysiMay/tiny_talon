import styled from "styled-components";

export const ScanContainer = styled.div`
  margin: 10% auto;
  background: white;
  border: 1px solid black;
  color: black;
  padding: 8%;
  font-family: Arial;
  font-weight: bold;
  font-size: 2.4rem;
  box-shadow: 13px 16px #ff0909;
  height: 3rem;
`;

export const ButtonContainer = styled.div`
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  * {
    margin: 7% 0;
  }
`;
export const Input = styled.input`
  text-align: center;
  font-size: 22px;
  font-family: Arial;
  border: 2px black solid;
  height: 56px;
  box-shadow: 9px 10px black;
  width: 79%;
  max-width: 430px;
`;

export const Button = styled.button`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 2px solid #000000;
  font-size: 1.6rem;
  cursor: pointer;
  background: white;
  box-shadow: -5px 3px black;
  line-height: 122px;
`;

export const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
`;
