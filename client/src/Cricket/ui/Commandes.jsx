export function Commandes({ touches, onReset, onSubmit }) {
  const aucuneTouche = touches.touches.length === 0;
  return (
    <div className="commandes">
      <button className="bouton-principal" onClick={onReset}>
        ❌
      </button>

      <div className="resume">
        {touches.touches.map((t) => (
          <div key={t.chiffre}>
            <span>{t.nombre}</span> &nbsp;
            <span className="font-legere">x</span> &nbsp;
            <span className="font-epaisse">
              {t.chiffre === 25 ? "BULL" : t.chiffre}
            </span>
          </div>
        ))}
      </div>

      <button
        className="bouton-principal"
        disabled={aucuneTouche}
        onClick={onSubmit}
      >
        ✅
      </button>
    </div>
  );
}
