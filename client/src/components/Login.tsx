import { useState } from "react";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom"
import { useLoginLazyQuery } from "../generated";

export default function Login() {
  const navigate = useNavigate();

  const { setUserData } = useAuth();

  const [login, { error, loading }] = useLoginLazyQuery({
    onCompleted(data) {
      setUserData(data.login);
      navigate("/");
    },
  });

  const [state, setState] = useState({
    email: "",
    password: "",
  });

//   console.log(state);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.email && state.password) {
      login({
        variables: {
          infos: {
            ...state,
          },
        },
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
    {error && error.message}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="email" type="text" placeholder="Email" />
        <input onChange={handleChange} name="password" type="password" placeholder="Password" />
        <button disabled={loading} type="submit" name="login">Je me connecte</button>
      </form>
    </>
  );
}


