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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPicture, setInvalidPicture] = useState(false);
  const [loader, setLoader] = useState("Sign Up");

  const [disable, setDisable] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();

    const body = {
      name,
      email,
      password,
      image: picture,
    };

    try {
      const promise = await axios.post("http://localhost:4000/signup", body);
      console.log(promise.data);
      setDisable(true);
      setLoader(<ThreeDots color="white" />);
      navigate("/signin");
    } catch (error) {
      if (error.response.data[0].includes("image")) {
        setLoader(<ThreeDots color="white" />);
        setInvalidPicture(true);
        setDisable(true);
        setTimeout(() => setDisable(false), 500);
        setTimeout(() => setLoader("Sign Up"), 500);
      }
      if (error.response.status === 409) {
        setLoader(<ThreeDots color="white" />);
        setInvalidEmail(true);
        setInvalidPicture(false);
        setDisable(true);
        setTimeout(() => setDisable(false), 500);
        setTimeout(() => setLoader("Sign Up"), 500);
      }

      console.log(error.response);
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
        <Form onSubmit={signUp}>
          {invalidEmail && (
            <InvalidForm>⛔ Use um e-mail válido para continuar!</InvalidForm>
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
          <Input
            disabled={disable}
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {invalidPicture && (
            <InvalidForm>⛔ Use um URL de imagem válido!</InvalidForm>
          )}

          <Input
            type="text"
            disabled={disable}
            placeholder="picture url"
            value={picture}
            onChange={(e) => {
              setPicture(e.target.value);
            }}
            required
          />

          <AuthButton disabled={disable} type="submit">
            {loader}
          </AuthButton>
          <GoTo onClick={() => navigate("/signin")}>Switch back to log in</GoTo>
        </Form>
      </AuthInputs>
    </AuthScreen>
  );
}
