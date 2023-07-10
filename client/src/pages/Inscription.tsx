import { UserCirclePlus } from '@phosphor-icons/react';
import AddUserMutation from '../components/AddUserMutation';

function Inscription(): JSX.Element {
/////
//  useEffect
/////

/////
//  useState
/////

/////
//  Code
/////

/////
//  Return
/////
  return (
    <section className="register-container">
      <UserCirclePlus size={32} />
      <p>Pas encore inscrit ?</p>
      <AddUserMutation />
    </section>
  );
}

export default Inscription;