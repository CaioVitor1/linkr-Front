import styled from "styled-components";

export const AuthScreen = styled.div`
  display: flex;
`;

export const AuthLogo = styled.div`
  background-color: #151515;
  height: 100vh;
  width: 60%;
`;

export const InfosLogo = styled.div`
  margin-top: 335px;
  margin-left: 144px;

  h1 {
    font-family: "Passion One", cursive;
    font-size: 106px;
    font-weight: 700;
    color: #fff;
  }
  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
    color: #fff;
    width: 442px;
  }
`;

export const AuthInputs = styled.div`
  display: flex;
  justify-content: center;

  border-left: 4px solid rgba(0, 0, 0, 0.1);
  background-color: #333333;
  height: 100vh;
  width: 40%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 355px;
`;

export const Input = styled.input`
  width: 429px;
  height: 65px;
  border-radius: 6px;
  margin-bottom: 13px;
  font-size: 22px;
  color: black;
  padding-left: 17px;
  background-color: #fff;
  border: none;

  &::placeholder {
    font-family: "Oswald", sans-serif;
    opacity: 1;
    color: #9f9f9f;
    font-size: 27px;
    font-weight: 700;
  }
`;

export const InvalidForm = styled.p`
  cursor: default;
  display: flex;
  margin-bottom: 5px;

  font-family: "Lato", sans-serif;

  font-size: 17px;
  font-weight: 700;
  color: #fff;
`;

export const AuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 65px;
  width: 429px;

  font-family: "Oswald", sans-serif;
  font-size: 27px;
  font-weight: 700;
  color: #fff;

  border-radius: 6px;
  border: none;
  background-color: #1877f2;

  svg {
    height: 1rem;
  }
`;

export const GoTo = styled.p`
  cursor: pointer;
  margin: 0 auto;
  margin-top: 22px;

  font-family: "Lato", sans-serif;
  text-decoration: underline;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
`;