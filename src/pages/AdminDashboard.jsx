import { useEffect, useState } from "react";
import axios from "axios";
import "./style/Admin.css";
import { API_URL } from "../config.js";

export default function AdminDashboard() {
  const [testData, setTestData] = useState(null);
  const [data, setData] = useState({ utilisateurs: [], offres: [], commandes: [] });
  const [loading, setLoading] = useState(true);
  const [newOffre, setNewOffre] = useState({ type: "", description: "", prix: "" });
  const token = localStorage.getItem("adminToken");


 useEffect(() => {
    fetch(`${API_URL}test`)
      .then(res => res.json())
      .then(data => {
        console.log("Données backend :", data);
        setTestData(data);
      })
      .catch(err => console.error("Erreur fetch backend :", err));
  }, []);


  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log("Token:" , token);
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_URL}api/admin/dashboard`, axiosConfig);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur Dashboard:", err.response?.data || err.message);
      setLoading(false);
    }
  };

  const createOffre = async () => {
    try {
      await axios.post(`${API_URL}api/admin/offres`, newOffre, axiosConfig);
      setNewOffre({ type: "", description: "", prix: "" });
      fetchDashboard();
    } catch (err) {
      console.error("Erreur création offre:", err.response?.data || err.message);
    }
  };

  const updateOffre = async (id, updatedData) => {
  try {
    // Conversion du prix en float
    const prixFloat = parseFloat(updatedData.prix);

    // Validation des champs
    if (!updatedData.type || !updatedData.description || isNaN(prixFloat) || prixFloat <= 0) {
      alert("Veuillez remplir tous les champs correctement !");
      return;
    }

    // Préparer les données à envoyer
    const dataToSend = {
      type: updatedData.type,
      description: updatedData.description,
      prix: prixFloat
    };

    // Appel API
    await axios.put(`${API_URL}api/admin/offres/${id}`, dataToSend, axiosConfig);

    // Rafraîchir le dashboard
    fetchDashboard();
  } catch (err) {
    console.error("Erreur mise à jour offre:", err.response?.data || err.message);
    alert("Erreur lors de la mise à jour de l'offre.");
  }
};


  
  const deleteOffre = async (id) => {
    if (!window.confirm("Supprimer cette offre ?")) return;
    try {
      await axios.delete(`${API_URL}api/admin/offres/${id}`, axiosConfig);
      fetchDashboard();
    } catch (err) {
      console.error("Erreur suppression offre:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
  if (!token) {
    console.warn("Aucun token admin trouvé !");
    setLoading(false);
    return;
  }
  fetchDashboard();
}, [token]);



  if (loading) return <p>Chargement du Dashboard...</p>;

  return (
    
      <div className="admin-dashboard">
      <h2>Dashboard Admin</h2>

      <div className="dashboard-stats">
        <div className="stat">
          <h4>Utilisateurs</h4>
          <p>{data.utilisateurs.length}</p>
        </div>
        <div className="stat">
          <h4>Offres</h4>
          <p>{data.offres.length}</p>
        </div>
        <div className="stat">
          <h4>Commandes</h4>
          <p>{data.commandes.length}</p>
        </div>
      </div>

      <section>
        <h3>Utilisateurs</h3>
        <ul>
          {data.utilisateurs.map((u) => (
            <li key={u.id}>
        <p><strong>Nom:</strong> {u.nom}</p>
        <p><strong>Email:</strong> {u.email}</p>
      </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Offres</h3>
        <div className="add-offre-form">
          <input
            placeholder="Type"
            value={newOffre.type}
            onChange={(e) => setNewOffre({ ...newOffre, type: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newOffre.description}
            onChange={(e) => setNewOffre({ ...newOffre, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Prix"
            value={newOffre.prix}
            onChange={(e) => setNewOffre({ ...newOffre, prix: parseFloat(e.target.value) })}
          />
          <button onClick={createOffre}>Créer</button>
        </div>

        <ul>
          {data.offres.map((o) => (
            <li key={o.id}>
              <strong>{o.type}</strong> - {o.prix}€
              <button onClick={() => deleteOffre(o.id)}>Supprimer</button>
              <button onClick={() => {
                const type = prompt("Nouveau type", o.type);
                const description = prompt("Nouvelle description", o.description);
                const prix = prompt("Nouveau prix", o.prix);
                updateOffre(o.id, { type, description, prix });
              }}>Modifier</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Commandes</h3>
        <ul>
        {data.commandes.map((c) => (
          <li key={c.id}>
            <p><strong>Utilisateur:</strong> {c.utilisateur.nom}</p>
            <p><strong>Offre:</strong> {c.offre.type}</p>
            <p><strong>Statut:</strong> {c.statut}</p>
            <p><strong>Billet:</strong> {c.billet?.cleAchat || "N/A"}</p>
          </li>
        ))}
        </ul>
      </section>
    </div>
    
  );
}
