import { useDispatch, useSelector } from "react-redux";
import { laSection, selectScores } from "../domaine/reducer";
import "./TableauDesScores.css";
import { visiter } from "../domaine/actions";

export function TableauDesScores() {
  const scores = useSelector(selectScores);

  return (
    <div className="tableau-des-scores">
      {scores.map((s) => (
        <ColonneJoueur key={s.joueur} score={s} />
      ))}
    </div>
  );
}

function ColonneJoueur({ score }) {
  const dispatch = useDispatch();

  return (
    <div className="colonne-joueur">
      <h3>{score.joueur}</h3>
      {[20, 19, 18, 17, 16, 15, 25].map((chiffre) => (
        <div
          key={chiffre}
          onClick={() => dispatch(visiter(score.joueur, [chiffre]))}
        >
          {chiffre}: {laSection(chiffre, score).touches}
        </div>
      ))}
      <div>{score.penalite}</div>
    </div>
  );
}
