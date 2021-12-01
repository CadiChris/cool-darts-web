export const INSCRIRE_CRICKET = "CRICKET/INSCRIRE_CRICKET";
export const inscrireCricket = (joueur) => ({ type: INSCRIRE_CRICKET, joueur });

export const DEMARRER_CRICKET = "CRICKET/DEMARRER";
export const demarrerCricket = () => ({ type: DEMARRER_CRICKET });

export const VISITER = "CRICKET/VISITER";
export const visiter = (joueur, chiffresTouches) => ({
  type: VISITER,
  joueur,
  chiffresTouches,
});
