import { Link, Outlet } from "react-router-dom";
import { CHECK_ISADMIN } from "../graphql/auth.query";
import { useLazyQuery, useQuery } from "@apollo/client";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

import "../style/navbar.css";

import {
  CaretCircleDown,
  UserCircle,
  ShoppingCartSimple,
} from "@phosphor-icons/react";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";

export default function Accueil(): JSX.Element {
  // gestion login admin
  const { data, refetch } = useQuery(CHECK_ISADMIN);
  const { userInfos, logout } = useAuth();

  useEffect(() => {
    refetch();
  }, [userInfos, refetch]);
  console.log("userinfos", userInfos);

  // gestion menu burger
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // récupérer la liste des categories

  const [categoriesList, setCategoriesList] = useState([]);

  const [getList, { data: subMenu }] = useLazyQuery(LIST_CATEGORIES, {
    onCompleted(subMenu) {
      setCategoriesList(subMenu.categories);
    },
    onError(error) {
      console.error(error);
    },
  });

  useEffect(() => {
    getList();
  }, []);

  // gestion affichage categories et sous-categories
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  return (
    <div>
      <nav className="navigation">
        <div className={`hamburger ${showMenu && "open"}`} onClick={toggleMenu}>
          <div className="burger burgerline1"></div>
          <div className="burger burgerline2"></div>
          <div className="burger burgerline3"></div>
        </div>

        <h1>
          <Link to="/">WILDRENT</Link>
        </h1>

        <ul className={`${showMenu ? "open" : "desktop"}`}>
          <li className="dropdown">
            <div
              className={`toggleCategories ${showCategories ? "openCat" : ""}`}
              onClick={toggleCategories}
            >
              <CaretCircleDown size={32} />
              {window.innerWidth < 768 ? (
                <p>Catégories</p>
              ) : (
                <Link to="/all-categories">Catégories</Link>
              )}
            </div>

            <div
              className={`dropdown-content ${showCategories ? "openCat" : ""}`}
            >
              {categoriesList &&
                categoriesList.map((submenu: any) => {
                  return (
                    <Link
                      className="navlink"
                      to={`/all-categories/${submenu.label}`}
                      onClick={closeMenu}
                    >
                      {submenu.label}
                    </Link>
                  );
                })}
            </div>
          </li>
          <li className="navlink mobile info-user">
            {userInfos.email && (
              <li>
                <p>{userInfos.email}</p>
              </li>
            )}
            <Link to="/compte/" onClick={closeMenu}>
              <UserCircle size={32} />
              <span>Profil</span>
            </Link>
          </li>
          <li className="navlink mobile">
            <Link to="/panier" onClick={closeMenu}>
              <ShoppingCartSimple size={32} />
              <span>Panier</span>
            </Link>
          </li>
          {data?.checkAdmin && (
            <li className="navlink backoffice">
              <Link to={"/back-office/"} onClick={closeMenu}>
                BackOffice
              </Link>
            </li>
          )}
          <li>
            {userInfos?.email && (
              <button className="secondary" onClick={logout}>
                Déconnexion
              </button>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
