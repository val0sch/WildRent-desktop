import { Routes, Route } from "react-router-dom";
import Wrapper from "./Utils/wrapper";

import NavBar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Contact from "./pages/Contact";
import ConditionsGenerales from "./pages/ConditionsGenerales";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/errors/NotFound";
import InternalError from "./pages/errors/InternalError";
import Panier from "./pages/Panier";
import MonCompte from "./pages/MonCompte/MonCompte";
import Produits from "./pages/BackOffice/Produits";
import Categories from "./pages/BackOffice/Categories";
import Messaging from "./pages/BackOffice/Messaging";
import BackOffice from "./pages/BackOffice";
import Footer from "./components/Footer";
import ProtectedArea from "./components/ProtectedArea";
import CategorieList from "./pages/CategorieList";
import ProductsList from "./pages/ProductsList";
import Product from "./pages/ProductSheet";

function App(): JSX.Element {
  return (
    <>
      <div className="App">
        <Wrapper>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Accueil />} />
              <Route path="contact" element={<Contact />} />
              <Route path="all-categories" element={<CategorieList />} />
              <Route
                path="/all-categories/:category"
                element={<ProductsList />}
              />
              <Route
                path="/all-categories/:category/:productId"
                element={<Product />}
              />
              <Route
                path="conditions-generales"
                element={<ConditionsGenerales />}
              />

              <Route path="mentions-legales" element={<MentionsLegales />} />
              <Route path="panier" element={<Panier />} />
              <Route path="compte">
                <Route path="" element={<MonCompte />} />
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
                <Route
                  path="messagerie"
                  element={
                    <ProtectedArea role={"admin"}>
                      <Messaging />
                    </ProtectedArea>
                  }
                />
              </Route>
              <Route path="errors">
                <Route path="404" element={<NotFound />} />
                <Route path="500" element={<InternalError />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
}

export default App;
