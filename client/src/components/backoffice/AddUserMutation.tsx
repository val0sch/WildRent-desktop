import { useMutation } from "@apollo/client";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { ADD_USER } from "../../graphql/user.mutation";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React from "react";
import useAuth from "../../hooks/useAuth";

import * as Yup from "yup";
import { useLoginLazyQuery } from "../../generated";

function AddUserMutation() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "L'adresse e-mail est invalide"
      )
      .required("L'adresse e-mail est obligatoire.")
      .email("Veuillez entrer une adresse e-mail valide."),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Minimum 8 caractères, au moins une majuscule, une minuscule et un chiffre"
      )
      .required("Le mot de passe est obligatoire.")
      .min(8, "Le mot de passe doit avoir au minimum 8 caractères."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
      .required("La confirmation du mot de passe est obligatoire."),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const { setUserData } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const [addUserInDb, { data }] = useMutation(ADD_USER, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "add User", data);
      login({
        variables: {
          infos: { email, password },
        },
      });
    },
    onError(error) {
      if (error.message.includes("Cet email est déjà pris")) {
        setErrors({ email: "Cet email est déjà pris" });
      } else {
        console.error("%c⧭", "color: #917399", error);
      }
    },
  });

  const [login, { error, loading }] = useLoginLazyQuery({
    onCompleted(data) {
      setUserData(data.login);
      navigate("/compte/infos");
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<React.SetStateAction<any>>
  ) => {
    setState(e.target.value);
  };

  const handleChangeField = (
    field: string,
    setState: Dispatch<React.SetStateAction<any>>
  ) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e, setState);
    };
  };

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { email, password, passwordConfirmation },
        { abortEarly: false }
      );
      await addUserInDb({
        variables: {
          infos: {
            email,
            password,
          },
        },
      });
    } catch (err: any) {
      if (Yup.ValidationError.isError(err)) {
        const yupErrors: Record<string, string> = {};
        err.inner.forEach((validationError: any) => {
          if (validationError.path) {
            yupErrors[validationError.path] = validationError.message;
          }
        });
        setErrors(yupErrors);
      } else if (err.message === "Cet email est déjà pris") {
        setErrors({ email: "Cet email est déjà pris" });
      }
    }
  };

  return (
    <form onSubmit={handleAddUser} className="register-form">
      <input
        name="email"
        placeholder="Saisissez votre adresse email"
        onChange={handleChangeField("email", setEmail)}
      />
      {errors.email && <p className="register-error-message">{errors.email}</p>}
      <input
        name="password"
        placeholder="Choisissez un mot de passe"
        type="password"
        onChange={handleChangeField("password", setPassword)}
      />
      {errors.password && (
        <p className="register-error-message">{errors.password}</p>
      )}

      <input
        name="passwordConfirmation"
        placeholder="Répétez votre mot de passe"
        type="password"
        onChange={handleChangeField(
          "passwordConfirmation",
          setPasswordConfirmation
        )}
      />
      {errors.passwordConfirmation && (
        <p className="register-error-message">{errors.passwordConfirmation}</p>
      )}

      <button type="submit" data-button="register">
        S'inscrire
      </button>
    </form>
  );
}

export default AddUserMutation;
