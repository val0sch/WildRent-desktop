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
      console.log("list users" + data);
    },
    onError(error) {
      console.error(error);
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
      {data.users && data.users.map((user: any, index: number) => (
        <div key={index}>
          <h1>
            { user.detailsUser.firstname && user.detailsUser.lastname
            ?
              user.detailsUser.firstname + " " + user.detailsUser.lastname
            :
              user.email
            }
            </h1>
          <p>
            { user.detailsUser.firstname && user.detailsUser.lastname
            ?
              user.email
            :
              ""
            }
            </p>
          <p>{user.detailsUser.address? "Adresse : " + user.detailsUser.address:""} </p>
          <p>{user.detailsUser.birthday? "Anniversaire : " + user.detailsUser.birthday: ""} </p>
          <p>Admin : {user.isAdmin? "oui" : "non"} </p>
        </div>
      ))}
    </div>
  );
}

export default ListUsersQuery;
