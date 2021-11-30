export const scoreVierge = (joueur) => ({
  joueur,
  penalite: 0,
  cible: {
    15: { touches: 0, ferme: false },
    16: { touches: 0, ferme: false },
    17: { touches: 0, ferme: false },
    18: { touches: 0, ferme: false },
    19: { touches: 0, ferme: false },
    20: { touches: 0, ferme: false },
    25: { touches: 0, ferme: false },
  },
});

const LIMITE = 3;

export function toucher(chiffre, touches, score) {
  const touchesActuelles = score.cible[chiffre].touches;
  const nouvellesTouches = Math.min(touchesActuelles + touches, LIMITE);

  return {
    ...score,
    cible: {
      ...score.cible,
      [chiffre]: {
        touches: nouvellesTouches,
        ferme: nouvellesTouches >= LIMITE,
      },
    },
  };
}

export const penaliser = (pointsDePenalite, score) => ({
  ...score,
  penalite: score.penalite + pointsDePenalite,
});

export const chiffreEstFerme = (chiffre, score) => score.cible[chiffre].ferme;
