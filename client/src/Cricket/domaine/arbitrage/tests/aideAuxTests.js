import freeze from "deep-freeze";
import { scoreVierge } from "../score";

export const _0_TOUCHE = 0;
export const _1_TOUCHE = 1;
export const _2_TOUCHES = 2;
export const _3_TOUCHES = 3;

export function score(leJoueur, sesChiffres, saPenalite) {
  const score = {
    ...scoreVierge(leJoueur),
    penalite: saPenalite,
    cible: cible(sesChiffres),
  };
  freeze(score);
  return score;
}

function cible(chiffres) {
  const cible = scoreVierge().cible;
  for (const c in chiffres)
    cible[c] = {
      touches: chiffres[c],
      ferme: chiffres[c] === _3_TOUCHES,
    };
  freeze(cible);
  return cible;
}

export function lancerDansLe(chiffre, lanceur, touches = _1_TOUCHE) {
  const lancer = { lanceur, chiffre, touches };
  freeze(lancer);
  return lancer;
}

export const scoreAvecCibleFermee = (leJoueur, saPenalite = 0) =>
  score(
    leJoueur,
    {
      20: _3_TOUCHES,
      19: _3_TOUCHES,
      18: _3_TOUCHES,
      17: _3_TOUCHES,
      16: _3_TOUCHES,
      15: _3_TOUCHES,
      25: _3_TOUCHES,
    },
    saPenalite
  );
