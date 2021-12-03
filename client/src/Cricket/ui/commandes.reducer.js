import { visiter } from "../domaine/actions";

export const STATE_INITIAL = {
  joueur: null,
  touches: [],
};

export function commandesReducer(state = STATE_INITIAL, action) {
  switch (action.type) {
    case UNE_TOUCHE:
      return {
        ...state,
        joueur: !state.joueur ? action.joueur : state.joueur,
        touches: augmenterLeNombre(
          action.chiffre,
          setChiffre(action.chiffre, state.touches)
        ),
      };

    case RESET:
      return STATE_INITIAL;

    default:
      return state;
  }
}

function setChiffre(chiffre, touches) {
  return !touches.find((t) => t.chiffre === chiffre)
    ? [...touches, { chiffre, nombre: 0 }]
    : touches;
}

function augmenterLeNombre(chiffre, touches) {
  return touches.reduce((res, t) => {
    if (t.chiffre === chiffre)
      return [...res, { chiffre: t.chiffre, nombre: t.nombre + 1 }];
    else return [...res, t];
  }, []);
}

export function enVisite(state) {
  const visite = [];
  for (const { chiffre, nombre } of state.touches) {
    for (let i = 0; i < nombre; i++) visite.push(chiffre);
  }

  return visiter(state.joueur, visite);
}

const UNE_TOUCHE = "UNE_TOUCHE";
export function uneTouche(joueur, chiffre) {
  return { type: UNE_TOUCHE, joueur, chiffre };
}
const RESET = "RESET";
export function reset() {
  return { type: RESET };
}
