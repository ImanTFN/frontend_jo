import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/Home.css";
import { API_URL } from "../config.js";

export default function Home() {
  const [testData, setTestData] = useState(null);
  const [info, setInfo] = useState(null);
     useEffect(() => {
    fetch(`${API_URL}api/test`)
      .then(res => res.json())
      .then(data => {
        console.log("Données backend :", data);
        setTestData(data);
      })
      .catch(err => console.error("Erreur fetch backend :", err));
  }, []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || `${API_URL}`;
    axios
      .get(`${apiUrl}api/info`)
      .then((res) => setInfo(res.data))
      .catch((err) => console.error("Erreur:", err));
  }, []);

  if (!info) return <div className="loading">Chargement...</div>;

  return (
    <div className="home">
      <div className="hero">
        <img src={"https://images.unsplash.com/photo-1743193189243-a79a3e02c268?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amV1eCUyMG9seW1waXF1ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500"} alt="Jeux Olympiques" className="hero-image" />
        <div className="hero-text">
          <h1>{info.title}</h1>
          <h3>{info.subtitle}</h3>
          <p>{info.description}</p>
        </div>
      </div>

      <section className="about">
        <h2>À propos</h2>
        <p>
          Les Jeux Olympiques de France 2024 promettent d’être un événement
          exceptionnel. Réservez vos billets dès maintenant, ça passe vite!!.
        </p>
      </section>
    </div>
  );
}
