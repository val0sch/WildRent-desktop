import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useLoginLazyQuery } from "../generated";
import Inscription from "../pages/Inscription";

import "../style/login.css";
import { CaretLeft, UserCircle } from "@phosphor-icons/react";

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
    <div className="login-register-container">
      <button className="navy back-home">
        <Link to={"/"}>
          <CaretLeft size={28} color="white" />
          <p>Retour</p>
        </Link>
      </button>
      <div className="login-register">
        <section className="login-container">
          {error && error.message}
          <form onSubmit={handleSubmit} className="login-form">
            <UserCircle size={32} />
            <p>Connexion</p>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Mot de passe"
            />
            <button disabled={loading} type="submit" name="login">
              Se connecter
            </button>
          </form>
        </section>
        <Inscription />
      </div>
    </div>
  );
}
