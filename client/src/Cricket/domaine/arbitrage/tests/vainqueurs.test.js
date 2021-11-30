import { vainqueurs } from "../vainqueurs";
import {
  _1_TOUCHE,
  _3_TOUCHES,
  score,
  scoreAvecCibleFermee,
} from "./aideAuxTests";

describe("Choix du vainqueur", () => {
  describe("Aucune cible férmee", () => {
    it("ne donne pas de vainqueur si certains chiffres sont ouverts", () => {
      const seulementLe20Ferme = score("J1", { 20: _3_TOUCHES }, 0);
      const pasDeVainqueur = [];

      expect(vainqueurs([seulementLe20Ferme])).toEqual(pasDeVainqueur);
    });
  });

  describe("Une seule cible fermée", () => {
    it("déclare vainqueur celui qui a tous ses chiffres fermés", () => {
      const seulementLe20Ferme = score("J1", { 20: _3_TOUCHES }, 0);
      const toutFerme = scoreAvecCibleFermee("J2");

      expect(vainqueurs([seulementLe20Ferme, toutFerme])).toEqual(["J2"]);
    });

    it("ne déclare pas vainqueur la cible fermée si elle a plus de pénalité qu'une autre", () => {
      const toutFermeMaisGrossePenalite = scoreAvecCibleFermee("J1", 80);
      const pasFermeMaisSansPenalite = score("J2", { 20: _3_TOUCHES }, 20);

      const pasDeVainqueur = [];

      expect(
        vainqueurs([toutFermeMaisGrossePenalite, pasFermeMaisSansPenalite])
      ).toEqual(pasDeVainqueur);
    });
  });

  describe("Plusieurs cibles fermées", () => {
    it("déclare le joueur avec le moins de pénalité comme vainqueur", () => {
      expect(
        vainqueurs([
          scoreAvecCibleFermee("joueur avec pénalité", 150),
          scoreAvecCibleFermee("joueur sans pénalité", 0),
        ])
      ).toEqual(["joueur sans pénalité"]);
    });

    it("déclare plusieurs vainqueurs si toutes les cibles fermées ont la même pénalité", () => {
      expect(
        vainqueurs([
          scoreAvecCibleFermee("J1", 30),
          scoreAvecCibleFermee("J2", 30),
        ])
      ).toEqual(["J1", "J2"]);
    });

    it("ne déclare pas vainqueur celui qui a moins de points s'il n'a pas tout fermé", () => {
      const j1 = scoreAvecCibleFermee("J1", 90);
      const j2 = scoreAvecCibleFermee("J2", 122);
      const j3 = score(
        "J3",
        {
          15: _3_TOUCHES,
          16: _3_TOUCHES,
          17: _3_TOUCHES,
          18: _3_TOUCHES,
          19: _3_TOUCHES,
          20: _3_TOUCHES,
          25: _1_TOUCHE,
        },
        89
      );

      expect(vainqueurs([j1, j2, j3])).toEqual([]);
    });
  });
});
