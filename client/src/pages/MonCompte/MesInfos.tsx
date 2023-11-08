interface MesInfosProps {
  content: ContentProps;
}
interface ContentProps {
  email: string;
  name?: string;
  adress?: string;
  phoneNumber?: string;
}
function MesInfos({ content }: MesInfosProps): JSX.Element {
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
    <>
      <h1>Mon Profil</h1>
      <div className="userInfosContent">
        <div>{content.email}</div>
      </div>
    </>
  );
}

export default MesInfos;
