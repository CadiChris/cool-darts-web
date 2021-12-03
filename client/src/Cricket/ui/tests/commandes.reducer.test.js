import {
  commandesReducer,
  enVisite,
  reset,
  uneTouche,
} from "../commandes.reducer.js";
import { visiter } from "../../domaine/actions";

function executer(actions) {
  return actions.reduce(commandesReducer, undefined);
}

describe("reducer des Commandes", () => {
  it("rend le state initial", () => {
    expect(commandesReducer(undefined, { type: "X" })).toEqual({
      joueur: null,
      touches: [],
    });
  });

  it("enregistre une première touche", () => {
    const apresUneTouche = executer([uneTouche("J1", 20)]);

    expect(apresUneTouche).toEqual({
      joueur: "J1",
      touches: [{ chiffre: 20, nombre: 1 }],
    });
  });

  it("ajoute une touche à un chiffre déjà touché", () => {
    const apresDeuxTouches = executer([
      uneTouche("J1", 20),
      uneTouche("J1", 20),
    ]);

    expect(apresDeuxTouches).toEqual({
      joueur: "J1",
      touches: [{ chiffre: 20, nombre: 2 }],
    });
  });

  it("ajoute une touche à un chiffre non touché", () => {
    const apresDeuxChiffres = executer([
      uneTouche("J1", 20),
      uneTouche("J1", 19),
    ]);

    expect(apresDeuxChiffres).toEqual({
      joueur: "J1",
      touches: [
        { chiffre: 20, nombre: 1 },
        { chiffre: 19, nombre: 1 },
      ],
    });
  });

  it("ne change pas le joueur s'il y en a déjà un", () => {
    const apresJoueurDifferent = executer([
      uneTouche("J1", 20),
      uneTouche("J2", 20),
    ]);

    expect(apresJoueurDifferent).toEqual({
      joueur: "J1",
      touches: [{ chiffre: 20, nombre: 2 }],
    });
  });

  it("peut reset", () => {
    const apresReset = executer([uneTouche("J1", 20), reset()]);

    expect(apresReset).toEqual(commandesReducer(undefined, { type: "X" }));
  });

  it("sait convertir les touches en une visite", () => {
    const apresDesTouches = executer([
      uneTouche("J1", 20),
      uneTouche("J1", 19),
      uneTouche("J1", 18),
    ]);

    expect(enVisite(apresDesTouches)).toEqual(visiter("J1", [20, 19, 18]));
  });
});
