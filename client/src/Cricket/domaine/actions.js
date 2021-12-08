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

export const CATCH_UP_ON_ROOM = "CATCH_UP_ON_ROOM";
export const catchUpOnRoom = () => asLocalOnly({ type: CATCH_UP_ON_ROOM });

export function asLocalOnly(actionOriginale) {
  return { ...actionOriginale, localOnly: true };
}

export const isLocalOnly = (action) => action.localOnly === true;
