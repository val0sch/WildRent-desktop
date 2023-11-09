import { ChangeEvent, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { UPDATE_USERDETAILS } from "../../graphql/userDetails.mutation";

interface DetailsUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  birthday?: string;
}
function MesInfos({
  content,
  updatedUser,
}: {
  content: DetailsUser;
  updatedUser: () => void;
}): JSX.Element {
  const [isInputName, setIsInputName] = useState(false);
  const [isInputAddress, setIsInputAddress] = useState(false);
  const [isInputBirthday, setIsInputBirthday] = useState(false);
  const [detailsUser, setDetailsUser] = useState<DetailsUser>({
    ...content,
  });

  useEffect(() => {
    // Obliger de setter dans le useEffect car sinon il ne se set pas automatiquement dans le state plus haut.
    setDetailsUser({ ...content });
  }, [content]);

  const [updateUserDetails] = useMutation(UPDATE_USERDETAILS, {
    onCompleted(dataUserDetails) {
      console.log("Details du user", dataUserDetails);
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleUpdateDetails = () => {
    updateUserDetails({
      variables: {
        updateDetailsUserId: content.id,
        infos: {
          birthday: detailsUser.birthday,
          address: detailsUser.address,
          firstname: detailsUser.firstname,
          lastname: detailsUser.lastname,
        },
      },
    })
      .then((response) => {
        console.log(
          "Détails de l'utilisateur mis à jour avec succès :",
          response.data.updateDetailsUser
        );
      })

      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour des détails de l'utilisateur :",
          error
        );
      });
  };
  const handleClick = (prop: string) => {
    switch (prop) {
      case "name":
        setIsInputName(!isInputName);
        break;
      case "birthday":
        setIsInputBirthday(!isInputBirthday);
        break;
      case "address":
        setIsInputAddress(!isInputAddress);
        break;
      default:
        break;
    }
  };
  const handleChangeField = (fieldName: keyof DetailsUser) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setDetailsUser((prevState) => ({
        ...prevState,
        [fieldName]: e.target.value,
      }));
    };
  };

  const handleDateFormat = (date: any) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("fr-FR");
    return formattedDate;
  };

  /////
  //  Return
  /////
  return (
    <>
      <h1>Mon Profil</h1>
      <div className="userInfosContent">
        <div className="userInfosRow">
          <div>
            <h2>Prénom et nom</h2>
            {isInputName ? (
              <>
                <>
                  <>
                    <input
                      type="text"
                      placeholder={detailsUser.firstname}
                      onChange={handleChangeField("firstname")}
                    />
                    <input
                      type="text"
                      placeholder={detailsUser.lastname}
                      onChange={handleChangeField("lastname")}
                    />
                  </>
                  <button
                    className="btn-modify"
                    onClick={() => {
                      handleUpdateDetails();
                      handleClick("name");
                    }}
                  >
                    Valider
                  </button>
                </>
              </>
            ) : (
              <>
                <p>
                  {detailsUser.firstname} {detailsUser.lastname}
                </p>
                <button
                  className="btn-modify"
                  onClick={() => handleClick("name")}
                >
                  Modifier
                </button>
              </>
            )}
          </div>
        </div>
        <div className="userInfosRow">
          <div>
            <h2>Date de naissance</h2>
            {isInputBirthday ? (
              <>
                <input type="date" placeholder={content.birthday} />
                <button
                  className="btn-modify"
                  onClick={() => {
                    handleUpdateDetails();
                    handleClick("birthday");
                  }}
                >
                  Valider
                </button>
              </>
            ) : (
              <>
                <p>{handleDateFormat(content.birthday)}</p>
                <button
                  className="btn-modify"
                  onClick={() => handleClick("birthday")}
                >
                  Modifier
                </button>
              </>
            )}
          </div>
        </div>
        <div className="userInfosRow">
          <div>
            <h2>Adresse Postale</h2>
            {isInputAddress ? (
              <>
                <input type="text" />
                <button
                  className="btn-modify"
                  onClick={() => {
                    handleClick("address");
                    handleUpdateDetails();
                  }}
                >
                  Valider
                </button>
              </>
            ) : (
              <>
                <p>{content.address}</p>{" "}
                <button
                  className="btn-modify"
                  onClick={() => handleClick("address")}
                >
                  Modifier
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MesInfos;
