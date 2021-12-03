export function Commandes({ touches }) {
  return (
    <div className="commandes">
      <button>X</button>
      <div className="resume">
        {touches.touches.map((t) => (
          <div key={t.chiffre}>
            {t.nombre} x {t.chiffre === 25 ? "BULL" : t.chiffre}
          </div>
        ))}
      </div>
      <button>✅</button>
    </div>
  );
}
