import React from "react";
import { Navigate } from "react-router-dom";
import { estConnecte } from "../utils/auth";

export default function RoutePrive({ children }) {
  return estConnecte() ? children : <Navigate to="/connexion" />;
}
