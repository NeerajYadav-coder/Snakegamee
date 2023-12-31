let score = 0;
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let snakeElement = "";
let FoodElement = "";
food = { x: 4, y: 10 };
// let inputDir = { x: 0, y: 1 };

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
main();

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
      return true;
      
    }
}

function gameEngine() {
  musicSound.play();
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over Press any key to play again!");
    snakeArr = [{x:13,y:15}];
    musicSound.play();
    score = 0;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  FoodElement = document.createElement("div");
  FoodElement.style.gridRowStart = food.y;
  FoodElement.style.gridColumnStart = food.x;
  FoodElement.classList.add("food");
  board.appendChild(FoodElement);
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  moveSound.currentTime = 0; 
   moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 };
      console.log("ArrowUp");
      break;

    case "ArrowDown":
      inputDir = { x: 0, y: 1 };
      console.log("ArrowDown");
      break;

    case "ArrowLeft":
      inputDir = { x: -1, y: 0 };
      console.log("ArrowLeft");
      break;

    case "ArrowRight":
      inputDir = { x: 1, y: 0 };
      console.log("ArrowRight");
      break;

    default:
      break;
  }
});
