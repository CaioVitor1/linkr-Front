import styled from "styled-components";
import Header from "../../components/Header";
import jwt from "jwt-decode";

export default function Timeline() {
  const localToken = localStorage.getItem("token");
  const userData = jwt(localToken);

  return (
    <>
      <Header />
      <Container></Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #333333;
`;
