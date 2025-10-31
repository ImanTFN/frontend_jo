import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import "./style/Auth.css";
import { API_URL } from "../config.js";

export default function Connexion() {
  const [testData, setTestData] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", motdepasse: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  /* useEffect(() => {
    fetch(`${API_URL}test`)
      .then(res => res.json())
      .then(data => {
        console.log("Données backend :", data);
        setTestData(data);
      })
      .catch(err => console.error("Erreur fetch backend :", err));
  }, []);*/

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}api/utilisateurs/connexion`, form);
      setMessage("Vous etes bien connecté!");

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token); // sauvegarde du token
      navigate("offres");
    } catch (err) {
      setMessage(" Erreur : " + (err.response?.data?.error || "Serveur indisponible"));
    }
  };

  return (
    <div className="auth-container">
      <h2>Connecter vous pour <br/> réserver un billet</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="motdepasse" placeholder="Mot de passe" value={form.motdepasse} onChange={handleChange} required />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p className="message">{message}</p>}
      {token && <p className="token">Token: {token.slice(0, 20)}...</p>}
    </div>
  );
}
