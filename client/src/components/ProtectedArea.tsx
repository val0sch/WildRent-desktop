import { useQuery } from "@apollo/client";
import { CHECK_ISADMIN, CHECK_TOKEN } from "../graphql/auth.query";

function ProtectedArea({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "admin";
}) {
  const { data, loading } = useQuery(
    role === "admin" ? CHECK_ISADMIN : CHECK_TOKEN
  );
  if (loading) return <div>Chargement en cours</div>;
  if (role === "admin") {
    if (data?.checkAdmin) {
      return children;
    } else {
      return <div>Vous n'avez le droit d'être là</div>;
    }
  } else {
    if (data?.checkToken) {
      return children;
    } else {
      return <div>Vous n'avez le droit d'être là</div>;
    }
  }
}

export default ProtectedArea;
