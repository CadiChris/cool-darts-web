import { chiffreEstFerme, penaliser, toucher } from "./score";

export function calculerLeNouveauScore(tableauDesScores, lancer) {
  if (toucheUnChiffreInvalide(lancer)) return [...tableauDesScores];

  const penalite = penaliteDuLancer(tableauDesScores, lancer);
  return tableauDesScores.map((s) => scorer(s, lancer, penalite));
}

const toucheUnChiffreInvalide = (lancer) => lancer.chiffre < 15;

const LIMITE = 3;

function penaliteDuLancer(scores, lancer) {
  const scoreDuLanceur = trouverLeScoreDuLanceur(scores, lancer.lanceur);
  return calculerLaPenalite(scoreDuLanceur.cible, lancer);
}

function trouverLeScoreDuLanceur(scores, lanceur) {
  return scores.find((s) => s.joueur === lanceur);
}

function calculerLaPenalite(cibleDuLanceur, lancer) {
  const touches = cibleDuLanceur[lancer.chiffre].touches;
  const leChiffreVaSeFermer = touches + lancer.touches >= LIMITE;
  const surplus = touches + lancer.touches - LIMITE;

  return leChiffreVaSeFermer ? surplus * lancer.chiffre : 0;
}

function scorer(score, lancer, penalite) {
  const cestLeScoreDuLanceur = score.joueur === lancer.lanceur;
  return cestLeScoreDuLanceur
    ? toucher(lancer.chiffre, lancer.touches, score)
    : scorerUnAdversaire(score, lancer.chiffre, penalite);
}

function scorerUnAdversaire(score, chiffre, pointsDePenalite) {
  return chiffreEstFerme(chiffre, score)
    ? score
    : penaliser(pointsDePenalite, score);
}
