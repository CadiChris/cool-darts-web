import { useState } from "react";
import "./Inscription.css";

export function Inscription({ onInscription, joueurs, onDemarrerPartie }) {
  const [nom, setNom] = useState("");
  const aucunJoueur = joueurs.length === 0;

  return (
    <div className="inscription">
      <h1 className="font-epaisse">Cool Darts </h1>

      <div className="inscrit">
        <input
          type="text"
          value={nom}
          placeholder="Joueur"
          onChange={(e) => setNom(e.target.value)}
        />
        <button
          className="bouton-principal"
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
        <button
          className="bouton-principal"
          onClick={onDemarrerPartie}
          disabled={aucunJoueur}
        >
          Démarrer
        </button>
      </div>
    </div>
  );
}
