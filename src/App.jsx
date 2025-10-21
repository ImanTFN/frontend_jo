import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import RoutePrive from "./components/RoutePrive";
import Offres from "./pages/Offres";
import Panier from "./pages/Panier";
import Succes from "./pages/Succes";
import AdminConnexion from "./pages/AdminConnexion";
import AdminDashboard from "./pages/AdminDashboard";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="offres" element={<RoutePrive><Offres /></RoutePrive>} />
        <Route path="panier" element={<RoutePrive><Panier /></RoutePrive>} />
        <Route path="succes" element={<RoutePrive><Succes /></RoutePrive>} />
        <Route path="admin/connexion" element={<AdminConnexion />} />
  <Route path="admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
