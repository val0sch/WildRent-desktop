import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { ADD_CART } from "../src/graphql/cart.mutation";
import { useMutation } from "@apollo/client";
import Wrapper from "./Utils/wrapper";

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
              <Route path="inscription" element={<Inscription />} />
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
