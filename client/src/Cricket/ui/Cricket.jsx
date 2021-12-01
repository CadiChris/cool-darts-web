import { Inscription } from "./Inscription";

export function Cricket({ joueurs, onInscription }) {
  return (
    <div>
      <Inscription onInscription={onInscription} joueurs={joueurs} />
    </div>
  );
}

