import freeze from "deep-freeze";
import cricket from "../reducer";
import { demarrerCricket, visiter } from "../actions";

it("retourne le state initial", () => {
  expect(cricket(undefined, {})).toEqual({
    scores: [],
    vainqueurs: [],
  });
});

it("démarre la partie", () => {
  const partieDemarree = executer([demarrerCricket(["J1", "J2"])]);

  expect(partieDemarree).toEqual({
    vainqueurs: [],
    scores: [
      {
        joueur: "J1",
        penalite: 0,
        cible: {
          15: { touches: 0, ferme: false },
          16: { touches: 0, ferme: false },
          17: { touches: 0, ferme: false },
          18: { touches: 0, ferme: false },
          19: { touches: 0, ferme: false },
          20: { touches: 0, ferme: false },
          25: { touches: 0, ferme: false },
        },
      },
      {
        joueur: "J2",
        penalite: 0,
        cible: {
          15: { touches: 0, ferme: false },
          16: { touches: 0, ferme: false },
          17: { touches: 0, ferme: false },
          18: { touches: 0, ferme: false },
          19: { touches: 0, ferme: false },
          20: { touches: 0, ferme: false },
          25: { touches: 0, ferme: false },
        },
      },
    ],
  });
});

it("modifie le score sur un lancer de fléchette", () => {
  const apresLancerDeJ1 = executer([
    demarrerCricket(["J1"]),
    visiter("J1", [20]),
  ]);

  expect(apresLancerDeJ1.scores[0].cible[20]).toEqual({
    touches: 1,
    ferme: false,
  });
});

it("permet de lancer les fléchettes en visite", () => {
  const avecTroisLancersSimples = executer([
    demarrerCricket(["J1"]),
    visiter("J1", [20, 20, 20]),
  ]);

  const avecUneVisiteDeTroisFlechettes = executer([
    demarrerCricket(["J1"]),
    visiter("J1", [20, 20, 20]),
  ]);

  expect(avecTroisLancersSimples).toEqual(avecUneVisiteDeTroisFlechettes);
});

const triple = (chiffre) => [chiffre, chiffre, chiffre];
it("met fin à la partie sur le lancer qui désigne le vainqueur", () => {
  const partieAvecUnJoueur = executer([demarrerCricket(["J1"])]);

  const toutFermeSaufLeBull = [15, 16, 17, 18, 19, 20].reduce(
    (state, chiffre) => cricket(state, visiter("J1", triple(chiffre))),
    partieAvecUnJoueur
  );

  const fermerLeBull = visiter("J1", triple(25));
  const partieTerminee = cricket(toutFermeSaufLeBull, fermerLeBull);

  expect(partieTerminee.vainqueurs).toEqual(["J1"]);
});

it("écrase la partie en cours au démarrage d'une nouvelle partie", () => {
  const partieViergeBobEtAlice = executer([demarrerCricket(["Bob", "Alice"])]);
  const partieEnCoursQuiRedemarre = executer([
    demarrerCricket(["John", "Franck"]),
    visiter("John", [20]),
    demarrerCricket(["Bob", "Alice"]),
  ]);

  expect(partieEnCoursQuiRedemarre).toEqual(partieViergeBobEtAlice);
});

const executer = (actions) =>
  actions.reduce((state, action) => {
    const nextState = cricket(state, action);
    freeze(nextState);
    return nextState;
  }, undefined);
