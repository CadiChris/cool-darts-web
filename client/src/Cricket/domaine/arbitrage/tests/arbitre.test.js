import * as arbitre from "../arbitre";
import {
  _0_TOUCHE,
  _2_TOUCHES,
  _3_TOUCHES,
  lancerDansLe,
  score,
} from "./aideAuxTests";

describe("Arbitre", () => {
  describe("Fermeture d'un chiffre", () => {
    it("Ferme un chiffre après 3 touches", () => {
      const apres3TouchesDansUnChiffre = arbitre.calculerLeNouveauScore(
        [score("J1", { 20: _2_TOUCHES }, 0)],
        lancerDansLe(20, "J1")
      );

      const chiffreFerme = { touches: 3, ferme: true };

      expect(apres3TouchesDansUnChiffre[0].cible[20]).toEqual(chiffreFerme);
    });

    it("N'augmente pas les touches d'un chiffre fermé", () => {
      const apresToucheDansUnChiffreDejaFerme = arbitre.calculerLeNouveauScore(
        [score("J1", { 20: _3_TOUCHES }, 0)],
        lancerDansLe(20, "J1")
      );

      expect(apresToucheDansUnChiffreDejaFerme[0].cible[20].touches).toEqual(
        _3_TOUCHES
      );
    });
  });

  describe("Calcul des pénalités", () => {
    it("Ne pénalise pas les adversaires si le lancer ne ferme pas le chiffre", () => {
      const nouveauxScores = arbitre.calculerLeNouveauScore(
        [score("J1", { 20: _0_TOUCHE }, 0), score("J2", { 20: _0_TOUCHE }, 0)],
        lancerDansLe(20, "J1")
      );

      const scoreDeJ2 = nouveauxScores[1];

      expect(scoreDeJ2.penalite).toEqual(0);
    });

    it("Pénalise les adversaires ouverts si un chiffre fermé est touché", () => {
      const penaliteDeJ2 = 10;

      const nouveauxScores = arbitre.calculerLeNouveauScore(
        [
          score("J1", { 20: _3_TOUCHES }, 0),
          score("J2", { 20: _0_TOUCHE }, penaliteDeJ2),
        ],
        lancerDansLe(20, "J1")
      );

      expect(nouveauxScores[1].penalite).toBe(penaliteDeJ2 + 20);
    });

    it("Ne pénalise pas les adversaires ayant le chiffre fermé", () => {
      const nouveauxScores = arbitre.calculerLeNouveauScore(
        [
          score("J1", { 20: _3_TOUCHES }, 0),
          score("J2", { 20: _3_TOUCHES }, 0),
        ],
        lancerDansLe(20, "J1")
      );

      expect(nouveauxScores[1].penalite).toBe(0);
    });
  });

  describe("Gestion de la partie", () => {
    it("Ne fait rien en cas de coup manqué", () => {
      const chiffreInvalide = 3;

      const nouveauxScores = arbitre.calculerLeNouveauScore(
        [score("J1", { 20: _0_TOUCHE }, 0)],
        lancerDansLe(chiffreInvalide, "J1")
      );

      expect(nouveauxScores).toEqual([score("J1", { 20: _0_TOUCHE }, 0)]);
    });

    it("Préserve l'ordre des scores", () => {
      const nouveauxScores = arbitre.calculerLeNouveauScore(
        [
          score("J1", { 20: _0_TOUCHE }, 0),
          score("J2", { 20: _0_TOUCHE }, 0),
          score("J3", { 20: _0_TOUCHE }, 0),
        ],
        lancerDansLe(20, "J2")
      );

      expect(nouveauxScores[0].joueur).toBe("J1");
      expect(nouveauxScores[1].joueur).toBe("J2");
      expect(nouveauxScores[2].joueur).toBe("J3");
    });
  });
});
