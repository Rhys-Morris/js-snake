const gameContainer = document.querySelector(".game");

export function renderGrid(rows, columns) {
  const grid = document.createElement("div");
  grid.className = "game-grid";
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "game-row";
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("div");
      cell.className = "game-cell";
      cell.id = String(i) + "-" + String(j);
      cell.dataset.colum = j;
      cell.dataset.row = i;
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  gameContainer.appendChild(grid);
  document.documentElement.style.setProperty("--columns", columns);
  document.documentElement.style.setProperty("--rows", rows);
}
