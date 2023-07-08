import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_USER } from "../graphql/user.mutation";
import { NavigateFunction, useNavigate } from "react-router-dom";
import React from "react";


function AddUserMutation() {
/////
//  useEffect
/////

/////
//  useState
/////
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

/////
//  Code
/////
  const navigate: NavigateFunction = useNavigate();
 
  const [addUserInDb, { data }] = useMutation(ADD_USER, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "add User", data);
      navigate('/compte/infos');
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    setState(e.target.value);
  };

  const handleChangeField = (field: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, setState);
    };
  };

  const handleAddUser = () => {
    addUserInDb({
      variables: {
        infos: {
          email,
          password
        }
      },
    });
  };

/////
//  Return
/////
  return (
    <div className="register-form">
      <input placeholder="Saisissez votre adresse email" onChange={handleChangeField('email', setEmail)}/>
      <input placeholder="Choisissez un mot de passe" type="password" onChange={handleChangeField('password', setPassword)}/>
      <input placeholder="Répétez votre mot de passe" type="password" onChange={handleChangeField('password', setPassword)}/>
      <button data-button="register" onClick={handleAddUser}>S'inscrire</button>
    </div>
  );
}

export default AddUserMutation;