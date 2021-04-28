const snake = ["00"];
let direction = "right";
let speed = 1.0;

const cells = Array.from(document.querySelectorAll(".game-cell"));

function renderSnake(snake, snakeTail = "false") {
  console.log(snakeTail);
  snake.forEach((segment) => {
    document.getElementById(segment).classList.add("active");
  });
  // Guard against removing last cell on initial render
  if (!snakeTail) {
    console.log("here");
    return;
  }

  document.getElementById(snakeTail).classList.remove("active");
}

function moveSnake(snake, direction) {}

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
    nextRow = currentRow === 7 ? 0 : currentRow + 1;
  }

  // Moving down - calculate next row
  if (direction === "down") {
    nextRow = currentRow === 0 ? 7 : currentRow - 1;
  }

  // Moving right - calculate next column
  if (direction === "right") {
    nextColumn = currentColumn === 7 ? 0 : currentColumn + 1;
  }

  // Moving left - calculate next column
  if (direction === "left") {
    nextColumn = currentRow === 7 ? 0 : currentRow + 1;
  }

  return String(nextRow) + String(nextColumn);
}

function createMoveInterval(snake, direction) {
  const snakeInterval = setInterval(() => {
    const nextCell = getNextCell(direction, snake);
    snake.unshift(nextCell);
    const snakeTail = snake.pop();
    console.log(snakeTail);
    renderSnake(snake, snakeTail);
  }, 1000);
}

function initialise() {
  renderSnake(snake);
  const nextCell = getNextCell(direction, snake);
  console.log(nextCell);
  createMoveInterval(snake, direction);
}

// Initialise program
window.onload = initialise();

// Event Listeners to change direction
