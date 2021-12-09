import { Inscription } from "./Inscription";
import { PHASES, selectInscrits, selectPhase } from "../domaine/reducer";
import { useDispatch } from "react-redux";
import { demarrerCricket, inscrireCricket } from "../domaine/actions";
import { TableauDesScores } from "./TableauDesScores";
import { useCricket } from "../../store/store";

const { INSCRIPTION, EN_COURS } = PHASES;

export function Cricket() {
  const dispatch = useDispatch();
  const onInscription = (joueur) => dispatch(inscrireCricket(joueur));
  const phase = useCricket(selectPhase);
  const joueurs = useCricket(selectInscrits);

  return (
    <div>
      {phase === INSCRIPTION && (
        <Inscription
          onInscription={onInscription}
          joueurs={joueurs}
          onDemarrerPartie={() => dispatch(demarrerCricket())}
        />
      )}

      {phase === EN_COURS && <TableauDesScores/>}
    </div>
  );
}
