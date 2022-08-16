import {
  AuthScreen,
  AuthLogo,
  InfosLogo,
  AuthInputs,
  Form,
  Input,
  InvalidForm,
  AuthButton,
  GoTo,
} from "../../components/authComponents";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";

import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState("Sign Up");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [disable, setDisable] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      const promise = await axios.post("http://localhost:4000/signin", body);
      console.log(promise.data);
      setToken(promise.data.token);
      localStorage.setItem("token", promise.data.token);

      setDisable(true);
      setLoader(<ThreeDots color="white" />);
      navigate("/timeline");
    } catch (error) {
      console.log(error.response.status);
      setLoader(<ThreeDots color="white" />);
      setDisable(true);
      setTimeout(() => setDisable(false), 500);
      setTimeout(() => setLoader("Sign In"), 500);

      if (error.response.status) {
        setInvalidEmail(true);
      }
    }
  };

  return (
    <AuthScreen>
      <AuthLogo>
        <InfosLogo>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </InfosLogo>
      </AuthLogo>
      <AuthInputs>
        <Form onSubmit={signIn}>
          {invalidEmail && (
            <InvalidForm>⛔ Email ou senha incorretos!</InvalidForm>
          )}
          <Input
            disabled={disable}
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            disabled={disable}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <AuthButton disabled={disable} type="submit">
            {loader}
          </AuthButton>
          <GoTo onClick={() => navigate("/signup")}>
            First time? Create an account!
          </GoTo>
        </Form>
      </AuthInputs>
    </AuthScreen>
  );
}
