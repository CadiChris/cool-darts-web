import { Inscription } from "./Inscription";
import { PHASES } from "../domaine/reducer";
import { useDispatch } from "react-redux";
import { demarrerCricket } from "../domaine/actions";

const { INSCRIPTION, EN_COURS } = PHASES;

export function Cricket({ phase, joueurs, onInscription }) {
  const dispatch = useDispatch()
  return (
    <div>
      {phase === INSCRIPTION && (
        <Inscription
          onInscription={onInscription}
          joueurs={joueurs}
          onDemarrerPartie={() => dispatch(demarrerCricket())}
        />
      )}

      {phase === EN_COURS && <div>GAME ON</div>}
    </div>
  );
}
