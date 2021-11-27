const STATE_INITIAL = {
  joueurs: [],
};

export function cricketReducer(state = STATE_INITIAL, action) {
  switch (action.type) {
    case INSCRIRE_CRICKET:
      return { ...state, joueurs: [...state.joueurs, action.joueur] };

    default:
      return state;
  }
}

const INSCRIRE_CRICKET = "INSCRIRE_CRICKET";
export const inscrireCricket = (joueur) => ({ type: INSCRIRE_CRICKET, joueur });
