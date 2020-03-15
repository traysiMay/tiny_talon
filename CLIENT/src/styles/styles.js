import styled from "styled-components";

export const ScanContainer = styled.div`
  margin: 10% auto;
  background: white;
  border: 1px solid black;
  color: black;
  padding: 19px;
  font-family: Arial;
  font-weight: bold;
  font-size: 2.4rem;
  box-shadow: 13px 16px #ff0909;
  height: 3rem;
`;

export const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 88%;
  max-width: 900px;
  margin: 3% auto;
  border: 1px solid black;
  div {
    margin: 1% auto;
    /* border-bottom: 4px dotted black; */
    padding: 3%;
    width: 80%;
  }

  input,
  button {
    margin: 7% auto 7%;
    align-self: center;
    padding: 0;
  }

  @media only screen and (min-width: 700px) {
    justify-content: flex-start;
  }
`;

export const Input = styled.input`
  text-align: center;
  font-family: Arial;
  border: 2px black solid;
  height: 56px;
  box-shadow: 9px 10px black;
  width: 79%;
  max-width: 430px;
  font-size: 1rem;
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

export const SquareButton = styled.button`
  background: white;
  color: black;
  border: 2px solid white;
  margin: 4px;
`;

export const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
`;
