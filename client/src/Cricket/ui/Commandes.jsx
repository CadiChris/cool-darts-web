export function Commandes({ touches, onReset, onSubmit, onUndo, onRedo }) {
  const aucuneTouche = touches.touches.length === 0;
  return (
    <>
      <div className="commandes">
        <div className="la-visite">
          <button className="bouton-principal" onClick={onReset}>
            ❌
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
            OK
          </button>
        </div>
        <div className="navigation">
          <button className="bouton-principal" onClick={onUndo}>
            En arrière
          </button>
          <button className="bouton-principal" onClick={onRedo}>
            En avant
          </button>
        </div>
      </div>
    </>
  );
}

function Visite({ chiffre, nombre }) {
  return (
    <div>
      <span>{nombre}</span> &nbsp;
      <span className="font-legere">x</span> &nbsp;
      <span className="font-epaisse">{chiffre === 25 ? "BULL" : chiffre}</span>
    </div>
  );
}
