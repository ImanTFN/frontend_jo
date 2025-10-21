import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { estConnecte, deconnecte, deconnecteAdmin } from "../utils/auth";
import "./Navbar.css";

export default function Navbar() {
  const navigation = useNavigate();
  const localisation = useLocation();

  const gererDeconnexion = () => {
    deconnecte();
    navigation("/connexion");
  };

  const gererCliqueOffre = () => {
    if (estConnecte()) {
      navigation("/offres");
    } else {
      navigation("/connexion");
    }
  };
  const gererDeconnexionAdmin = () =>{
    deconnecteAdmin();
    navigation("/");
  }

  const cacherBoutonOffre = localisation.pathname === "/connexion" || localisation.pathname === "/inscription";
  const estAdminRoute = localisation.pathname.startsWith("/admin") &&
    localisation.pathname !== "/admin/connexion";

  if (estAdminRoute) {
    // Navbar spécifique au Dashboard 
    return (
      <nav className="navbar admin-navbar">
        <div className="navbar-logo">Dashboard</div>
        <div className="navbar-links">
          <button type="button" onClick={gererDeconnexionAdmin} className="logout-btn">
            Déconnexion
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
      Jeux Olympiques France
    </Link>

      <div className="navbar-links">
        
        {!cacherBoutonOffre && (
          <button onClick={gererCliqueOffre} className="nav-btn">
            Consultation des offres
          </button>
        )}
        {!estConnecte() ? (
          <>
            <Link to="connexion">Connexion</Link>
            <Link to="inscription">Inscription</Link>
            <Link to="panier">Panier</Link>
            <Link to="admin/connexion">Admin</Link>
          </>
        ) : (
          <button onClick={gererDeconnexion} className="logout-btn">
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}
