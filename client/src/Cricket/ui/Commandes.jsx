import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHome,
  faRedo,
  faTrashAlt,
  faTrophy,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

export function Commandes({
  touches,
  onResetVisite,
  onSubmitVisite,
  onUndo,
  onRedo,
  onEndGame,
  vainqueurs,
}) {
  const aucuneTouche = touches.touches.length === 0;
  return (
    <>
      <div className="commandes">
        {vainqueurs.length === 0 ? (
          <div className="la-visite">
            <button className="bouton-principal" onClick={onResetVisite}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>

            <div className="resume">
              {touches.touches.map((t) => (
                <Visite key={t.chiffre} chiffre={t.chiffre} nombre={t.nombre} />
              ))}
            </div>

            <button
              className="bouton-principal"
              disabled={aucuneTouche}
              onClick={onSubmitVisite}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
        ) : (
          <Vainqueurs vainqueurs={vainqueurs} />
        )}
        <div className="navigation">
          <button className="bouton-principal" onClick={onEndGame}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button className="bouton-principal" onClick={onUndo}>
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button className="bouton-principal" onClick={onRedo}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </div>
    </>
  );
}

function Visite({ chiffre, nombre }) {
  return (
    <div className="chiffre-visite">
      <div className="font-epaisse">{chiffre === 25 ? "BULL" : chiffre}</div>
      <div>x {nombre}</div>
    </div>
  );
}

function Vainqueurs({ vainqueurs }) {
  return (
    <div className="vainqueurs">
      <button className="bouton-principal">
        <FontAwesomeIcon icon={faTrophy} className="icone" />
        {vainqueurs.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </button>
    </div>
  );
}
