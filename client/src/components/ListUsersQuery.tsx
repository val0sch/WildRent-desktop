import { useLazyQuery } from "@apollo/client";
import { LIST_USERS } from "../graphql/listUsers.query";

function ListUsersQuery() {
/////
//  useEffect
/////

/////
//  useState
/////

/////
//  Code
/////
  const [getList, { data }] = useLazyQuery(LIST_USERS, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },

  });

  const handleClick = () => {
    getList();
  };
/////
//  Return
/////
  return (
    <div>
      <button onClick={handleClick}>Afficher la liste des Utilisateurs</button>
      {data && data.users && data.users.map((b: any, index: number) => (
        <div key={index}>
          <h1>
            { b.detailsUser.firstname && b.detailsUser.lastname
            ?
              b.detailsUser.firstname + " " + b.detailsUser.lastname
            :
              b.email
            }
            </h1>
          <p>
            { b.detailsUser.firstname && b.detailsUser.lastname
            ?
              b.email
            :
              ""
            }
            </p>
          <p>{b.detailsUser.address? "Adresse : " + b.detailsUser.address:""} </p>
          <p>{b.detailsUser.birthday? "Anniversaire : " + b.detailsUser.birthday: ""} </p>
          <p>Admin : {b.isAdmin? "oui" : "non"} </p>
        </div>
      ))}
    </div>
  );
}

export default ListUsersQuery;