import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 429px;
  height: 65px;
  border-radius: 6px;
  margin-bottom: 13px;
  font-size: 27px;
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

export const FirstInput = styled.input`
  margin-top: 355px;

  width: 429px;
  height: 65px;
  border-radius: 6px;
  margin-bottom: 13px;
  font-size: 27px;
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
