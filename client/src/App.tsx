import "./App.css";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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




function App(): JSX.Element {
  return (
    <div className="App">      
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Accueil />} />
          <Route path="Inscription" element={<Inscription />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="ConditionsGenerales" element={<ConditionsGenerales />} />
          <Route path="MentionsLegales" element={<MentionsLegales />} />
          <Route path="Panier" element={<Panier />} />
          <Route path="MonCompte">
            <Route path="" element={<MonCompte />} />
            <Route path="MesInfos" element={<MesInfos />} />
            <Route path="MesReservations" element={<MesReservations />} />
            <Route path="MesFactures" element={<MesFactures />} />
            <Route path="MesFavoris" element={<MesFavoris />} />
          </Route>
          <Route path="BackOffice">
            <Route path="" element={<BackOffice />} />
            <Route path="Categories" element={<Categories />} />
            <Route path="Produits" element={<Produits />} />
          </Route>
          <Route path="errors">
            <Route path="404" element={<NotFound />} />
            <Route path="500" element={<InternalError />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
