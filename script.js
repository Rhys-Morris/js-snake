const snake = ["00"];
let direction = "right";
let speed = 300;

const cells = Array.from(document.querySelectorAll(".game-cell"));
const cellIds = cells.map((cell) => cell.id);

const delay = async (ms) => new Promise((res) => setTimeout(res, ms));

function renderSnake(snake, snakeTail = false) {
  snake.forEach((segment) => {
    document.getElementById(segment).classList.add("active");
  });
  // Guard against removing last cell on initial render
  if (!snakeTail) return;

  document.getElementById(snakeTail).classList.remove("active");
}

function getRandomCell(cellIds) {
  const randomIndex = Math.floor(Math.random() * cellIds.length);
  return cellIds[randomIndex];
}

function renderTarget(snake, cellIds) {
  let targetCell = getRandomCell(cellIds);

  while (snake.includes(targetCell)) {
    targetCell = getRandomCell(cellIds);
  }

  document.getElementById(targetCell).classList.add("target");
}

function getNextCell(direction, snake) {
  const snakeHead = snake.slice(0, 1)[0];
  const currentRow = Number(snakeHead.split("")[0]);
  const currentColumn = Number(snakeHead.split("")[1]);
  let nextColumn;
  let nextRow;

  if (["up", "down"].includes(direction)) {
    nextColumn = currentColumn;
  }

  if (["left", "right"].includes(direction)) {
    nextRow = currentRow;
  }

  // Moving up - calculate next row
  if (direction === "up") {
    nextRow = currentRow === 0 ? 7 : currentRow - 1;
  }

  // Moving down - calculate next row
  if (direction === "down") {
    nextRow = currentRow === 7 ? 0 : currentRow + 1;
  }

  // Moving right - calculate next column
  if (direction === "right") {
    nextColumn = currentColumn === 7 ? 0 : currentColumn + 1;
  }

  // Moving left - calculate next column
  if (direction === "left") {
    nextColumn = currentColumn === 0 ? 7 : currentColumn - 1;
  }

  return String(nextRow) + String(nextColumn);
}

async function makeMove(snake) {
  const nextCell = getNextCell(direction, snake);
  snake.unshift(nextCell);
  const snakeTail = snake.pop();
  renderSnake(snake, snakeTail);
  await delay(speed);
  makeMove(snake);
}

function initialise() {
  renderTarget(snake, cellIds);
  renderSnake(snake);
  const nextCell = getNextCell(direction, snake);
  makeMove(snake, direction);
}

// Initialise program
window.onload = initialise();

// Event Listeners to change direction
window.addEventListener("keyup", (e) => {
  // Check if valid key press
  const validCodes = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (!validCodes.includes(e.code)) return;

  console.log(e);
  if (e.code === "ArrowUp" && direction !== "down") direction = "up";
  if (e.code === "ArrowDown" && direction !== "up") direction = "down";
  if (e.code === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.code === "ArrowRight" && direction !== "left") direction = "right";
});
