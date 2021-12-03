import { useReducer } from "react";
import { laSection, selectScores } from "../domaine/reducer";
import "./TableauDesScores.css";
import { split } from "../../utils/tableau";
import { useSelector } from "react-redux";
import { Commandes } from "./Commandes";
import {
  commandesReducer,
  reset,
  STATE_INITIAL,
  uneTouche,
} from "./commandes.reducer";

export function TableauDesScores() {
  const scores = useSelector(selectScores);

  const { premier, second } = split(scores);

  const [stateTouches, dispatchTouches] = useReducer(
    commandesReducer,
    STATE_INITIAL
  );

  return (
    <div className="tableau-des-scores">
      <div>
        {premier.map((s) => (
          <ColonneJoueur
            key={s.joueur}
            score={s}
            onTouche={(chiffre) =>
              dispatchTouches(uneTouche(s.joueur, chiffre))
            }
          />
        ))}

        <ColonneDesChiffres />

        {second.map((s) => (
          <ColonneJoueur
            key={s.joueur}
            score={s}
            onTouche={(chiffre) =>
              dispatchTouches(uneTouche(s.joueur, chiffre))
            }
          />
        ))}
      </div>
      <Commandes
        touches={stateTouches}
        onReset={() => dispatchTouches(reset())}
      />
    </div>
  );
}

function ColonneJoueur({ score, onTouche }) {
  return (
    <div className="colonne colonne-joueur">
      <h3 className="cellule">{score.joueur}</h3>
      {[20, 19, 18, 17, 16, 15, 25].map((chiffre) => (
        <div
          className="cellule"
          key={chiffre}
          onClick={() => onTouche(chiffre)}
        >
          <Touches section={laSection(chiffre, score)} />
        </div>
      ))}
      <div className="cellule penalite">{score.penalite}</div>
    </div>
  );
}

function Touches({ section }) {
  return (
    <div className={`touches ${section.ferme ? "fermee" : ""}`}>
      {section.touches === 1 && <span>X</span>}
      {section.touches === 2 && <span>XX</span>}
      {section.touches === 3 && <span>XXX</span>}
    </div>
  );
}

function ColonneDesChiffres() {
  return (
    <div className="colonne colonne-des-chiffres">
      <h3 className="cellule">&nbsp;</h3>
      {[20, 19, 18, 17, 16, 15, "Bull"].map((chiffre) => (
        <div key={chiffre} className="cellule">
          {chiffre}
        </div>
      ))}
      <div className="cellule penalite">&nbsp;</div>
    </div>
  );
}
