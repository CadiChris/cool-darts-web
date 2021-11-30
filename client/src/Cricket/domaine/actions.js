export const DEMARRER_CRICKET = "CRICKET/DEMARRER";
export const demarrerCricket = (joueurs) => ({
  type: DEMARRER_CRICKET,
  joueurs,
});

export const VISITER = "CRICKET/VISITER";
export const visiter = (joueur, chiffresTouches) => ({
  type: VISITER,
  joueur,
  chiffresTouches,
});
