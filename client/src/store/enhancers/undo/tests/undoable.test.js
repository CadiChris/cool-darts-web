import undoable, { redo, undo } from "../undoable";

const reducerDeTest = (state = 0, action) => {
  switch (action.type) {
    case "+":
      return state + 1;
    case "+10":
      return state + 10;
    default:
      return state;
  }
};

const incrementer = () => ({ type: "+" });
const plus10 = () => ({ type: "+10" });

describe("reducerDeTest", () => {
  it("a 0 comme state initial", () => {
    expect(reducerDeTest(undefined, {})).toEqual(0);
  });
  it("incrémente", () => {
    expect(reducerDeTest(undefined, incrementer())).toEqual(1);
  });
});

const reducerAvecUndo = () => undoable(reducerDeTest);

describe("undoable", () => {
  describe("la structure", () => {
    it("wrap le résultat du reducer dans une structure qui permet le undo et le redo", () => {
      expect(reducerAvecUndo()(undefined, {})).toEqual({
        precedents: [],
        actuel: 0,
        suivants: [],
      });
    });

    it("alimente actuel et precedent sur une action", () => {
      expect(reducerAvecUndo()(undefined, incrementer())).toEqual({
        precedents: [0],
        actuel: 1,
        suivants: [],
      });
    });
  });

  describe("le undo", () => {
    it("permet le undo", () => {
      const retourA2 = executer([
        incrementer(),
        incrementer(),
        incrementer(),
        incrementer(),
        undo(),
        undo(),
      ]);

      expect(retourA2).toEqual({
        precedents: [0, 1],
        actuel: 2,
        suivants: [3, 4],
      });
    });

    it("ne fait rien s'il n'y a rien à undo", () => {
      const apresPleinDeUndoInutiles = executer([
        incrementer(),
        undo(),
        undo(),
        undo(),
      ]);

      expect(apresPleinDeUndoInutiles).toEqual({
        precedents: [],
        actuel: 0,
        suivants: [1],
      });
    });
  });

  describe("le redo", () => {
    it("permet le redo", () => {
      const redoPourRevenirA2 = executer([
        incrementer(),
        incrementer(),
        incrementer(),
        undo(),
        undo(),
        redo(),
      ]);

      expect(redoPourRevenirA2).toEqual({
        precedents: [0, 1],
        actuel: 2,
        suivants: [3],
      });
    });

    it("ne fait rien s'il n'y a rien à redo", () => {
      const apresPleinDeRedoInutiles = executer([
        incrementer(),
        undo(),
        redo(),
        redo(),
        redo(),
      ]);

      expect(apresPleinDeRedoInutiles).toEqual({
        precedents: [0],
        actuel: 1,
        suivants: [],
      });
    });
  });

  describe("le vidage des précédents", () => {
    it("vide les précédents lorsqu'une action de vidage arrive", () => {
      const reducerQuiVideSurPlus10 = () =>
        undoable(reducerDeTest, [plus10().type]);

      const incrementsPuisVidage = [
        incrementer(),
        incrementer(),
        plus10(),
      ].reduce(
        reducerQuiVideSurPlus10(),
        reducerQuiVideSurPlus10()(undefined, {})
      );

      const vide = [];
      expect(incrementsPuisVidage).toEqual({
        actuel: 12,
        precedents: vide,
        suivants: vide,
      });
    });
  });
});

const executer = (actions) =>
  actions.reduce((state, action) => {
    const nextState = reducerAvecUndo()(state, action);
    return nextState;
  }, reducerAvecUndo()(undefined, {}));
