import {
  AuthScreen,
  AuthLogo,
  InfosLogo,
  AuthInputs,
  Form,
  Input,
  AuthButton,
  GoTo,
} from "../../components/authComponents";

export default function SignIn() {
  return (
    <AuthScreen>
      <AuthLogo>
        <InfosLogo>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </InfosLogo>
      </AuthLogo>
      <AuthInputs>
        <Form>
          <Input placeholder="e-mail" />
          <Input placeholder="password" />
          <AuthButton type="submit">Log In</AuthButton>
          <GoTo>First time? Create an account!</GoTo>
        </Form>
      </AuthInputs>
    </AuthScreen>
  );
}
