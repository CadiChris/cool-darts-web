import freeze from "deep-freeze";
import {
  cricketReducer,
  lesTouchesDansLe,
  PHASES,
  selectInscrits,
  selectPhase,
  selectScores,
} from "../reducer";
import { demarrerCricket, inscrireCricket, visiter } from "../actions";

const { EN_COURS, INSCRIPTION } = PHASES;

it("retourne le state initial", () => {
  expect(cricketReducer(undefined, {})).toEqual({
    joueurs: [],
    scores: [],
    vainqueurs: [],
    phase: INSCRIPTION,
  });
});

it("inscrit des joueurs", () => {
  const avecInscrits = executer([inscrireCricket("J1"), inscrireCricket("J2")]);

  expect(selectInscrits(avecInscrits)).toEqual([{ nom: "J1" }, { nom: "J2" }]);
});

it("démarre la partie", () => {
  const partieDemarree = executer([
    inscrireCricket("J1"),
    inscrireCricket("J2"),
    demarrerCricket(),
  ]);

  expect(selectPhase(partieDemarree)).toEqual(EN_COURS);
  expect(selectScores(partieDemarree)).toEqual([
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
  ]);
});

it("modifie le score sur un lancer de fléchette", () => {
  const apresLancerDeJ1 = executer([
    inscrireCricket("J1"),
    demarrerCricket(),
    visiter("J1", [20]),
  ]);

  const scores = selectScores(apresLancerDeJ1);
  expect(lesTouchesDansLe(20, "J1", scores)).toEqual({
    touches: 1,
    ferme: false,
  });
});

it("permet de lancer les fléchettes en visite", () => {
  const avecTroisLancersSimples = executer([
    inscrireCricket("J1"),
    demarrerCricket(),
    visiter("J1", [20, 20, 20]),
  ]);

  const avecUneVisiteDeTroisFlechettes = executer([
    inscrireCricket("J1"),
    demarrerCricket(),
    visiter("J1", [20, 20, 20]),
  ]);

  expect(avecTroisLancersSimples).toEqual(avecUneVisiteDeTroisFlechettes);
});

const triple = (chiffre) => [chiffre, chiffre, chiffre];

it("met fin à la partie sur le lancer qui désigne le vainqueur", () => {
  const partieAvecUnJoueur = executer([
    inscrireCricket("J1"),
    demarrerCricket(),
  ]);

  const toutFermeSaufLeBull = [15, 16, 17, 18, 19, 20].reduce(
    (state, chiffre) => cricketReducer(state, visiter("J1", triple(chiffre))),
    partieAvecUnJoueur
  );

  const fermerLeBull = visiter("J1", triple(25));
  const partieTerminee = cricketReducer(toutFermeSaufLeBull, fermerLeBull);

  expect(partieTerminee.vainqueurs).toEqual(["J1"]);
});

it("écrase la partie en cours au démarrage d'une nouvelle partie", () => {
  const partieViergeBobEtAlice = executer([
    inscrireCricket("Bob"),
    inscrireCricket("Alice"),
    demarrerCricket(),
  ]);
  const partieEnCoursQuiRedemarre = executer([
    inscrireCricket("Bob"),
    inscrireCricket("Alice"),
    demarrerCricket(),
    visiter("Bob", [20]),
    demarrerCricket(),
  ]);

  expect(partieEnCoursQuiRedemarre).toEqual(partieViergeBobEtAlice);
});

const executer = (actions) =>
  actions.reduce((state, action) => {
    const nextState = cricketReducer(state, action);
    freeze(nextState);
    return nextState;
  }, undefined);
