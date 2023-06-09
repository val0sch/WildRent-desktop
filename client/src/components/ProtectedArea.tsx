import checkIsAdmin from "../Utils/utils";

function ProtectedArea({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token") as string;
  checkIsAdmin(token);
}

export default ProtectedArea;
