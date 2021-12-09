const undoable = (reducer, typesActionQuiVident = []) => {
  const STATE_INITIAL = {
    precedents: [],
    actuel: reducer(undefined, {}),
    suivants: [],
  };

  return function (state = STATE_INITIAL, action) {
    const { precedents, actuel, suivants } = state;

    switch (action.type) {
      case UNDO:
        const rienAUndo = precedents.length === 0;
        if (rienAUndo) return state;

        return {
          precedents: precedents.slice(0, precedents.length - 1),
          actuel: precedents[precedents.length - 1],
          suivants: [actuel, ...suivants],
        };

      case REDO:
        const rienARedo = suivants.length === 0;
        if (rienARedo) return state;

        return {
          precedents: [...precedents, actuel],
          actuel: suivants[0],
          suivants: suivants.slice(1),
        };

      default:
        const remplacant = reducer(actuel, action);
        const actionSansEffet = actuel === remplacant;
        if (actionSansEffet) return state;

        const doitVider = typesActionQuiVident.includes(action.type);

        return {
          precedents: doitVider ? [] : [...precedents, actuel],
          actuel: remplacant,
          suivants: [],
        };
    }
  };
};

const UNDO = "UNDO";
const undo = () => ({ type: UNDO });
const REDO = "REDO";
const redo = () => ({ type: REDO });

export default undoable;
export { undo, redo };
