import { useState } from "react";

export function Cricket({joueurs, onInscription}) {
  return (
    <div>
      <Inscription onInscription={onInscription} />

      {joueurs.map((j) => (
        <div key={j}>{j}</div>
      ))}
    </div>
  );
}

function Inscription({ onInscription }) {
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
    </div>
  );
}
