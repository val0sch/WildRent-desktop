import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_USER } from "../graphql/user.mutation";
import { NavigateFunction, useNavigate } from "react-router-dom";


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
      console.log("%c⧭", "color: #0088cc", data);
      navigate('/MonCompte/MesInfos');
    },
    onError(error) {
      console.log("%c⧭", "color: #917399", error);
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

  const addUser = () => {
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
    <div>
      <input placeholder="Votre Email" onChange={handleChangeField('email', setEmail)}/>
      <input placeholder="Votre mot de passe" type="password" onChange={handleChangeField('password', setPassword)}/>
      <button onClick={addUser}>S'inscrire</button>
    </div>
  );
}

export default AddUserMutation;