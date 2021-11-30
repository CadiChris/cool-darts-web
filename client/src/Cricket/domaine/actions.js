export const INSCRIRE_CRICKET = "CRICKET/INSCRIRE_CRICKET";
export const inscrireCricket = (joueur) => ({ type: INSCRIRE_CRICKET, joueur });

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
