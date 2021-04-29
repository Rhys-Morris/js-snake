const main = document.querySelector("main");

export function renderReset() {
  const resetButton = document.createElement("div");
  resetButton.className = "reset";
  resetButton.textContent = "Reset";
  main.appendChild(resetButton);
}
