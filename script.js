import { renderGrid } from "./modules/grid.js";
import { renderScores } from "./modules/scores.js";
import { renderReset } from "./modules/reset.js";

// ----- GLOBAL VARIABLES -----
const snake = ["0-0"];
let direction = "right";
let nextDirection = "right";
let speed = 200;
let target = null;
let columns = 20;
let rows = 20;
let score = 0;
let highScore = 0;

// ----- RENDER GAME GRID -----
renderGrid(columns, rows);

const cells = Array.from(document.querySelectorAll(".game-cell"));
const cellIds = cells.map((cell) => cell.id);

// ----- HELPER FUNCTIONS -----
const delay = async (ms) => new Promise((res) => setTimeout(res, ms));

function renderSnake(snake, snakeTail = false) {
  console.log(snake);
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
  target = targetCell;
  document.getElementById(targetCell).classList.add("target");
}

function getNextCell(direction, snake) {
  const snakeHead = snake.slice(0, 1)[0];
  const currentRow = Number(snakeHead.split("-")[0]);
  const currentColumn = Number(snakeHead.split("-")[1]);
  let nextColumn;
  let nextRow;

  // Direction logic
  if (["up", "down"].includes(direction)) nextColumn = currentColumn;
  if (["left", "right"].includes(direction)) nextRow = currentRow;

  if (direction === "up")
    nextRow = currentRow === 0 ? rows - 1 : currentRow - 1;
  if (direction === "down")
    nextRow = currentRow === rows - 1 ? 0 : currentRow + 1;
  if (direction === "right")
    nextColumn = currentColumn === columns - 1 ? 0 : currentColumn + 1;
  if (direction === "left")
    nextColumn = currentColumn === 0 ? columns - 1 : currentColumn - 1;

  return String(nextRow) + "-" + String(nextColumn);
}

function updateDirection() {
  // Prevent nonsensical user input to try and move in reverse direction
  // This can occur if keys are pressed quickly
  if (nextDirection === direction) return;
  if (nextDirection === "right" && direction === "left") return;
  if (nextDirection === "left" && direction === "right") return;
  if (nextDirection === "up" && direction === "down") return;
  if (nextDirection === "down" && direction === "up") return;

  direction = nextDirection;
}

function incrementScore() {
  score += 10;
  highScore = score > highScore ? score : highScore;
}

function handleLoss() {
  score = 0;
  renderScores(score, highScore);
  renderReset();
}

async function makeMove(snake) {
  // Look at currently selected direction
  updateDirection();

  // Handle loss
  if (snake.length !== Array.from(new Set(snake)).length) {
    renderSnake(snake);
    handleLoss();
    return;
  }

  const nextCell = getNextCell(direction, snake);

  snake.unshift(nextCell);
  const snakeTail = snake.pop();

  // Check if snake is on target - if so replace tail
  if (snake[0] === target) {
    snake.push(snakeTail);

    // Remove target
    document.getElementById(target).classList.remove("target");
    // Render new target
    renderTarget(snake, cellIds);
    // Increase speed of snake
    speed = speed > 50 ? speed - 5 : speed;
    incrementScore();
    renderScores(score, highScore);
  }

  renderSnake(snake, snakeTail);
  await delay(speed);
  makeMove(snake);
}

function initialise() {
  renderTarget(snake, cellIds);
  renderSnake(snake);
  makeMove(snake, direction);
}

// Initialise program
window.onload = initialise();

// Event Listeners to change direction
window.addEventListener("keyup", async (e) => {
  // Check if valid key press
  const validCodes = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  if (!validCodes.includes(e.code)) return;

  if (e.code === "ArrowUp" && direction !== "down") nextDirection = "up";
  if (e.code === "ArrowDown" && direction !== "up") nextDirection = "down";
  if (e.code === "ArrowLeft" && direction !== "right") nextDirection = "left";
  if (e.code === "ArrowRight" && direction !== "left") nextDirection = "right";
});
