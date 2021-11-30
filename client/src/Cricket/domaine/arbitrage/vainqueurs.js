export function vainqueurs(scores) {
  const toutFerme = extraireCeuxQuiOntToutFerme(scores);
  const penaliteMini = penaliteMinimum(scores);
  const pasDeVainqueur = [];

  switch (toutFerme.length) {
    case 0:
      return pasDeVainqueur;

    case 1:
      const fermeEtPlusPetitePenalite = toutFerme[0].penalite === penaliteMini;

      if (fermeEtPlusPetitePenalite) return [toutFerme[0].joueur];

      return pasDeVainqueur;

    default:
      return extraireParPenalite(toutFerme, penaliteMini).map((s) => s.joueur);
  }
}

const penaliteMinimum = (scores) => Math.min(...scores.map((s) => s.penalite));

function extraireCeuxQuiOntToutFerme(scores) {
  const cibleEstFermee = ({ cible }) =>
    Object.keys(cible).every((chiffre) => cible[chiffre].ferme);

  return scores.filter(cibleEstFermee);
}

function extraireParPenalite(scores, penaliteCherchee) {
  return scores.filter(({ penalite }) => penalite === penaliteCherchee);
}
