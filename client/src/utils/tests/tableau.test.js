import { split } from "../tableau";

describe("split", () => {
  it("split au milieu un tableau de longueur paire", () => {
    const deLongueurPaire = [1, 2, 3, 4];

    const morceaux = split(deLongueurPaire);

    expect(morceaux).toEqual({ premier: [1, 2], second: [3, 4] });
  });

  it("split après le milieu un tableau de longueur impaire", () => {
    const deLongueurImpaire = [1, 2, 3];

    const morceaux = split(deLongueurImpaire);

    expect(morceaux).toEqual({ premier: [1], second: [2, 3] });
  });
});
