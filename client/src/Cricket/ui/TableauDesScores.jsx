import { useDispatch, useSelector } from "react-redux";
import { lesTouchesDansLe, selectScores } from "../domaine/reducer";
import "./TableauDesScores.css";
import { visiter } from "../domaine/actions";

export function TableauDesScores() {
  const dispatch = useDispatch();
  const scores = useSelector(selectScores);

  return (
    <div className="tableau-des-scores">
      {scores.map((s) => (
        <div key={s.joueur} className="colonne-joueur">
          <h3>{s.joueur}</h3>
          {[20, 19, 18, 17, 16, 15, 25].map((c) => (
            <div key={c} onClick={() => dispatch(visiter(s.joueur, [c]))}>
              {c}: {lesTouchesDansLe(c, s.joueur, scores).touches}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
