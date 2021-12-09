import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRedo, faTrashAlt, faUndo } from '@fortawesome/free-solid-svg-icons'

export function Commandes({ touches, onReset, onSubmit, onUndo, onRedo }) {
  const aucuneTouche = touches.touches.length === 0;
  return (
    <>
      <div className="commandes">
        <div className="la-visite">
          <button className="bouton-principal" onClick={onReset}>
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
            onClick={onSubmit}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
        <div className="navigation">
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
