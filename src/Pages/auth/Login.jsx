import styled from "styled-components";
import { FirstInput, Form, Input } from "../../components/Global";

export default function SignIn() {
  return (
    <Container>
      <AuthScreen>
        <AuthLogo>
          <div className="titulo">
            <h1>linkr</h1>
            <h2>save, share and discover the best links on the web</h2>
          </div>
        </AuthLogo>
        <AuthInputs>
          <Form>
            <FirstInput placeholder="e-mail" />
            <Input placeholder="password" />
            <AuthButton type="submit">Log In</AuthButton>
            <GoToCadastre>First time? Create an account!</GoToCadastre>
          </Form>
        </AuthInputs>
      </AuthScreen>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

const AuthScreen = styled.div`
  display: flex;
`;

const AuthLogo = styled.div`
  background-color: #151515;
  height: 100vh;
  width: 60%;

  .titulo {
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
  }
`;

const AuthInputs = styled.div`
  display: flex;
  justify-content: center;

  border-left: 4px solid rgba(0, 0, 0, 0.1);
  background-color: #333333;
  height: 100vh;
  width: 40%;
`;

const AuthButton = styled.button`
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
`;

const GoToCadastre = styled.p`
  cursor: pointer;
  margin: 0 auto;
  margin-top: 22px;

  font-family: "Lato", sans-serif;
  text-decoration: underline;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
`;
