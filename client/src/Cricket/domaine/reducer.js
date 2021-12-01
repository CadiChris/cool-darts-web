import { scoreVierge } from "./arbitrage/score";
import { calculerLeNouveauScore } from "./arbitrage/arbitre";
import { vainqueurs } from "./arbitrage/vainqueurs";
import { DEMARRER_CRICKET, INSCRIRE_CRICKET, VISITER } from "./actions";

export const PHASES = {
  INSCRIPTION: "INSCRIPTION",
  EN_COURS: "EN_COURS",
  TERMINEE: "TERMINEE",
};

const { EN_COURS, TERMINEE, INSCRIPTION } = PHASES;

const STATE_INITIAL = {
  joueurs: [],
  scores: [],
  vainqueurs: [],
  phase: INSCRIPTION,
};

export function cricketReducer(state = STATE_INITIAL, action) {
  switch (action.type) {
    case INSCRIRE_CRICKET:
      return {
        ...state,
        joueurs: [...state.joueurs, { nom: action.joueur }],
      };

    case DEMARRER_CRICKET:
      return {
        ...state,
        scores: state.joueurs.map((s) => scoreVierge(s.nom)),
        phase: EN_COURS,
      };

    case VISITER:
      const nouveauScore = action.chiffresTouches.reduce((score, chiffre) => {
        return calculerLeNouveauScore(score, {
          lanceur: action.joueur,
          chiffre,
          touches: 1,
        });
      }, state.scores);

      const vainqueursDuNouveauScore = vainqueurs(nouveauScore);

      return {
        ...state,
        scores: nouveauScore,
        vainqueurs: vainqueursDuNouveauScore,
        phase: estTerminee(vainqueursDuNouveauScore) || state.phase,
      };

    default:
      return state;
  }
}

const estTerminee = (vainqueursDuNouveauScore) =>
  vainqueursDuNouveauScore.length > 0 ? TERMINEE : null;

export const selectInscrits = (state) => state.joueurs;

export const selectPhase = (state) => state.phase;

export const selectScores = (state) => state.scores;
