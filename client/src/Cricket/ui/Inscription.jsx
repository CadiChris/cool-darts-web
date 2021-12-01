import { useState } from "react";

export function Inscription({ onInscription, joueurs, onDemarrerPartie }) {
  const [nom, setNom] = useState("");
  return (
    <div>
      <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      <button
        onClick={() => {
          onInscription(nom);
          setNom("");
        }}
      >
        Ajouter
      </button>

      {joueurs.map(({ nom }) => (
        <div key={nom}>{nom}</div>
      ))}

      <button onClick={onDemarrerPartie}>Démarrer</button>
    </div>
  );
}