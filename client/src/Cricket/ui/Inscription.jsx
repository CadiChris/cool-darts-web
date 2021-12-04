import { useState } from "react";
import "./Inscription.css";

export function Inscription({ onInscription, joueurs, onDemarrerPartie }) {
  const [nom, setNom] = useState("");

  return (
    <div className="inscription">
      <h1>Cool Darts </h1>

      <div className="inscrit">
        <input
          type="text"
          value={nom}
          placeholder="Joueur"
          onChange={(e) => setNom(e.target.value)}
        />
        <button
          onClick={() => {
            onInscription(nom);
            setNom("");
          }}
        >
          Ajouter
        </button>
      </div>

      <div className="joueurs">
        {joueurs.map(({ nom }) => (
            <div key={nom}>{nom}</div>
        ))}
      </div>

      <div className="inscrire">
        <button onClick={onDemarrerPartie}>Démarrer</button>
      </div>
    </div>
  );
}
