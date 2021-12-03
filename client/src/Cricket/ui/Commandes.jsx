export function Commandes({ touches }) {
  return (
    <div className="commandes">
      {touches.touches.map((t) => (
        <div key={t.chiffre}>
          {t.nombre} x {t.chiffre === 25 ? "BULL" : t.chiffre}
        </div>
      ))}
    </div>
  );
}
