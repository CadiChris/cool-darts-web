import { useSelector } from "react-redux";
import { selectScores } from "../domaine/reducer";
import "./TableauDesScores.css";

export function TableauDesScores() {
  const scores = useSelector(selectScores);

  return (
    <div className="tableau-des-scores">
      {scores.map((s) => (
        <div key={s.joueur} className="colonne-joueur">
          <h3>{s.joueur}</h3>
        </div>
      ))}
    </div>
  );
}
