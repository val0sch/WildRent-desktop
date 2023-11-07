import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useLoginLazyQuery } from "../generated";
import Inscription from "../pages/Inscription";
import * as Yup from "yup";

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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "L'adresse e-mail est invalide")
      .required("L'adresse e-mail est obligatoire.")
      .email("Veuillez entrer une adresse e-mail valide."),
    password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum 8 caractères, au moins une majuscule, une minuscule, un chiffre et un caractère spécial parmi @$!%*?&"
    )
      .required("Le mot de passe est obligatoire.")
      .min(8, "Le mot de passe doit avoir au minimum 8 caractères."),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(state, { abortEarly: false });

      if (state.email && state.password) {
        login({
          variables: {
            infos: { ...state },
          },
        });
      }
    } catch (err:any) {
      const yupErrors: Record<string, string> = {};
      err.inner.forEach((validationError: { path: string | number; message: any; }) => {
        yupErrors[validationError.path] = validationError.message;
      });
      setErrors(yupErrors);
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
            {errors.email && <p className="login-error-message">{errors.email}</p>}
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Mot de passe"
            />
            {errors.password && <p className="login-error-message">{errors.password}</p>}
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
