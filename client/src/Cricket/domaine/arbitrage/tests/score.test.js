import { scoreVierge } from "../score";

describe("score.modele", () => {
  it("crée un score vierge", () => {
    expect(scoreVierge("J1")).toEqual({
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
    });
  });

  it("créé un nouveau score à chaque appel", () => {
    expect(scoreVierge("")).not.toBe(scoreVierge(""));
  });
});
