import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Inscription from "./pages/Inscription";
import MesInfos from "./pages/MonCompte/MesInfos";
import Contact from "./pages/Contact";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/errors/NotFound";
import InternalError from "./pages/errors/InternalError";
import Panier from "./pages/Panier";
import MonCompte from "./pages/MonCompte";
import MesReservations from "./pages/MonCompte/MesReservations";
import MesFactures from "./pages/MonCompte/MesFactures";
import MesFavoris from "./pages/MonCompte/MesFavoris";
import Produits from "./pages/BackOffice/Produits";
import Categories from "./pages/BackOffice/Categories";
import BackOffice from "./pages/BackOffice";
import Footer from "./components/Footer";
import ProtectedArea from "./components/ProtectedArea";

function App(): JSX.Element {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Accueil />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="conditions-generales"
            element={<ConditionsGenerales />}
          />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="panier" element={<Panier />} />
          <Route path="compte">
            <Route path="" element={<MonCompte />} />
            <Route path="infos" element={<MesInfos />} />
            <Route path="reservations" element={<MesReservations />} />
            <Route path="factures" element={<MesFactures />} />
            <Route path="favoris" element={<MesFavoris />} />
          </Route>
          <Route path="back-office">
            <Route
              path=""
              element={
                <ProtectedArea role={"admin"}>
                  <BackOffice />
                </ProtectedArea>
              }
            />
            <Route
              path="categories"
              element={
                <ProtectedArea role={"admin"}>
                  <Categories />
                </ProtectedArea>
              }
            />
            <Route
              path="produits"
              element={
                <ProtectedArea role={"admin"}>
                  <Produits />
                </ProtectedArea>
              }
            />
          </Route>
          <Route path="errors">
            <Route path="404" element={<NotFound />} />
            <Route path="500" element={<InternalError />} />
          </Route>
        </Route>
      </Routes>
    </div>
      <Footer />
      </>
  );
}

export default App;
