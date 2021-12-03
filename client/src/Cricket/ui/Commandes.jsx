export function Commandes({ touches, onReset , onSubmit}) {
  return (
    <div className="commandes">
      <button onClick={onReset}>X</button>
      <div className="resume">
        {touches.touches.map((t) => (
          <div key={t.chiffre}>
            {t.nombre} x {t.chiffre === 25 ? "BULL" : t.chiffre}
          </div>
        ))}
      </div>
      <button onClick={onSubmit} >✅</button>
    </div>
  );
}
