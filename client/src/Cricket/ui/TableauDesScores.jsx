import { useEffect, useReducer, useState } from "react";
import { laSection, selectScores } from "../domaine/reducer";
import "./TableauDesScores.css";
import { split } from "../../utils/tableau";
import { useDispatch, useSelector } from "react-redux";
import { Commandes } from "./Commandes";
import {
  commandesReducer,
  enVisite,
  reset,
  STATE_INITIAL,
  uneTouche,
} from "./commandes.reducer";

export function TableauDesScores() {
  const dispatch = useDispatch();
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
        onSubmit={() => {
          dispatch(enVisite(stateTouches));
          dispatchTouches(reset());
        }}
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
      <Penalite valeur={score.penalite} />
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

function Penalite({ valeur }) {
  const [valeurAnimee, setValeurAnimee] = useState(valeur);

  useEffect(() => {
    const interval = setInterval(() => {
      setValeurAnimee((precendente) => {
        if (precendente < valeur) return precendente + 1;
        else {
          clearInterval(interval);
          return precendente;
        }
      });
    }, 25);

    return () => clearInterval(interval);
  }, [valeur]);

  return <div className="cellule penalite">{valeurAnimee}</div>;
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
