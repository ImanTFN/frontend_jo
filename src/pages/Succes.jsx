import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as QRCode from "qrcode.react";
import { getToken } from "../utils/auth";
import { useState } from "react";
import "./style/Succes.css";
import { API_URL } from "../config.js";

export default function Succes() {
  const [testData, setTestData] = useState(null);
  const localisation = useLocation();
   useEffect(() => {
    fetch(`${API_URL}/test`)
      .then(res => res.json())
      .then(data => {
        console.log("Données backend :", data);
        setTestData(data);
      })
      .catch(err => console.error("Erreur fetch backend :", err));
  }, []);
  const params = new URLSearchParams(localisation.search);
  const cleAchat = params.get("cleAchat");

  const [billet, setBillet] = useState("");
  const [message, setMessage] = useState("Traitement du paiement...");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const chercherBillet = async () => {
      const token = getToken();
      if (!token) {
        setMessage("Veuillez vous connecter pour voir votre billet.");
        return;
      }

      try {
        console.log("Token envoyé:", token);
        console.log("Clé achat:", cleAchat);
        const res = await axios.post(
          `${API_URL}/api/commande/confirme`,
          { cleAchat },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Récupérer la clé du billet et l'url du qr code
        const { cleBillet } = res.data;
        setBillet(res.data);
        setQrCodeUrl(res.data.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?data=${cleBillet}&size=256x256`);


        setMessage(`Paiement confirmé ! Vous recevrez le billet sur votre email. Clé billet : ${res.data.cleBillet}`);
        localStorage.removeItem("panier");
      } catch (err) {
        console.error(err);
        setMessage("Impossible de récupérer le billet.");
      }
    };

    if(cleAchat) chercherBillet();
  }, [cleAchat]);

  if(message && !billet) return <p>{message}</p>
  if(!billet) return <p>Chargement du billet...</p>

  return (
    <div className="billet-container">
      <h2>Merci d'avoir réservé. Voici votre billet !</h2>
      <p className="billet-info">Nom: <span>{billet.utilisateur.nom}</span> </p>
      <p className="billet-info">Offre: <span>{billet.offre.type}</span></p>
      <p className="billet-info">Date d'achat: <span>{new Date(billet.dateAchat).toLocaleString()}</span></p>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR code du billet" className="qr-code" />}
      <p className="billet-message">Si vous ne visualiser pas votre billet, vous pouvez le trouver dans votre boite mail.</p>
    </div>
  );
}
