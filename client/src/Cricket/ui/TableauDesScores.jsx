import { useDispatch, useSelector } from "react-redux";
import { laSection, selectScores } from "../domaine/reducer";
import "./TableauDesScores.css";
import { visiter } from "../domaine/actions";
import { split } from "../../utils/tableau";

export function TableauDesScores() {
  const scores = useSelector(selectScores);

  const { premier, second } = split(scores);

  return (
    <div className="tableau-des-scores">
      {premier.map((s) => (
        <ColonneJoueur key={s.joueur} score={s} />
      ))}

      <ColonneDesChiffres />

      {second.map((s) => (
        <ColonneJoueur key={s.joueur} score={s} />
      ))}
    </div>
  );
}

function ColonneJoueur({ score }) {
  const dispatch = useDispatch();

  return (
    <div className="colonne colonne-joueur">
      <h3>{score.joueur}</h3>
      {[20, 19, 18, 17, 16, 15, 25].map((chiffre) => (
        <div
          className="cellule"
          key={chiffre}
          onClick={() => dispatch(visiter(score.joueur, [chiffre]))}
        >
          <Touches section={laSection(chiffre, score)} />
        </div>
      ))}
      <div className="cellule">{score.penalite}</div>
    </div>
  );
}

function Touches({ section }) {
  return (
      <div>
        {section.touches === 1 && <span>X</span>}
        {section.touches === 2 && <span>XX</span>}
        {section.touches === 3 && <span>XXX</span>}
      </div>
  );
}

function ColonneDesChiffres() {
  return (
    <div className="colonne colonne-des-chiffres">
      <h3>&nbsp;</h3>
      {[20, 19, 18, 17, 16, 15, "Bull"].map((chiffre) => (
        <div key={chiffre} className="cellule">
          {chiffre}
        </div>
      ))}
      <div className="cellule" />
    </div>
  );
}
