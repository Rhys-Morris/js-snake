const score = document.querySelector(".header__score");
const highScore = document.querySelector(".header__highscore");

export function renderScores(current, high) {
  score.textContent = `Score: ${current}`;
  highScore.textContent = `Highscore: ${high}`;
}
