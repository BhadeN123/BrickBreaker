import {
  bricks,
  createBricks,
  displayBricks,
  TargetScore,
  updateBrickDimention,
} from "./brick.js";
import {
  paddle,
  drawPaddle,
  updatePaddleDimention,
  movepaddle,
} from "./paddle.js";
import {
  drawball,
  updateBallDimention,
  ball,
  moveball,
  ballbrickcollision,
  ballpaddlecollision,
  Score,
  ballwallcollision,
  Lives,
} from "./ball.js";
import { popup } from "./popup.js";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var scoreboarddiv = document.getElementById("scoreboard");
var scorediv = document.getElementById("score");
var timerdiv = document.getElementById("timer");
var livesdiv = document.getElementById("live");
var minutes = 0;
var seconds = 20;
let leftarrow = false;
const color = ["red", "white", "blue", "pink", "orange"];
let rightarrow = false;
let ismousedown = false;
let rows = 5;
let column = 10;
let Level;
let gameOver = false;
let isfalling = true;
const playaudio = new Audio("../HTML/Brick.mp3");

playaudio.play();

Level = localStorage.getItem("Level");
window.addEventListener("resize", updateDimention);

function updateDimention() {
  playaudio.play();

  const isMobile = window.innerWidth <= 820;
  if (isMobile) {
    updateBrickDimention();
    updatePaddleDimention(c);
    updateBallDimention(c, paddle);
  } else {
    updateBrickDimention();
    updatePaddleDimention(c);
    updateBallDimention(c, paddle);
  }

  if (!parseInt(localStorage.getItem("previousHighScore")) > 0) {
    localStorage.setItem("previousHighScore", 0);
    localStorage.setItem("Level", 1);
  }
  Level = parseInt(localStorage.getItem("Level"));
  createBricks(rows + Level - 1, column);

  // ScoreCanvasctx.clearRect(0, 0, 1200, 40);
  ctx.clearRect(0, 0, 1200, 520);
  draw();
  scorediv.innerText = `Score : ${Score.toString().padStart(4, "0000")}`;
  timerdiv.innerText = `Timer : 00:60`;
  livesdiv.innerText = `Lives  : ${Lives.toString().padStart(2, "0")}`;
  let firstTap = true;
  c.addEventListener("click", function (e) {
    if (firstTap) {
      firstTap = false;
      gamestart = true;
      startTimer(remainingTime, remainingTime);
      gamePaused = false;
      if (!gameOver) {
        render();
      }
    }
  });
}

updateDimention();

function checkwin() {
  if (Score >= TargetScore) {
    stopRingtone();
    gameOver = true;
    if (Level > 1) localStorage.setItem("Level", 1);
    else
      localStorage.setItem(
        "Level",
        parseInt(localStorage.getItem("Level")) + 1
      );
    localStorage.setItem("currentScore", Score);
    popup(`<p>Congratulations<br> Level ${Level}<p>`);
    winaudio.play();
  } else if (minutes == 0 && seconds == 0) {
    stopRingtone();
    console.log(minutes);
    console.log(seconds);
    gameOver = true;
    localStorage.setItem("currentScore", Score);
    popup(`<p>Time Up</br> Game Over</p>`);
    Gameoveraudio.play();
  } else if (Lives == 0) {
    gameOver = true;
    localStorage.setItem("currentScore", Score);
    //playaudio.pause();
    winaudio.play();
    popup("Game Over");
  }
}

function update() {
  checkwin();
  movepaddle(c, leftarrow, rightarrow, ismousedown);

  moveball(ball);

  ballwallcollision(c, paddle, gameOver);

  ballpaddlecollision(paddle, ball);

  ballbrickcollision(ctx, c, rows + Level - 1, column, bricks, color, ball);
}

function draw() {
  drawPaddle(ctx, paddle.x, paddle.y, paddle.width, paddle.height);

  drawball(ctx, ball.x, ball.y, ball.ballradius, 0, 360);
  console.log(Level);
  Level = parseInt(localStorage.getItem("Level"));
  displayBricks(ctx, rows + Level - 1, column);
}
document.getElementById("info").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/Component1/HTML/info.html";
});

let remainingTime = 40;
function startTimer(duration, remainingTime) {
  {
    let timer = remainingTime || duration;
    timeInterval = setInterval(function () {
      if (--timer <= 0 || Lives == 0 || gameOver) {
        clearInterval(timeInterval);
      }
      // ScoreCanvasctx.clearRect(0, 0, 1200, 40);
      {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        localStorage.setItem("minutes", minutes);
        localStorage.setItem("seconds", seconds);

        scorediv.innerText = `Score : ${Score.toString().padStart(4, "0")}`;
        timerdiv.innerText = `Timer : ${formattedMinutes}: ${formattedSeconds}`;
        livesdiv.innerText = `Lives  : ${Lives.toString().padStart(2, "0")}`;
      }
    }, 1000);
  }
}

scorediv.innerText = `Score : ${Score.toString().padStart(4, "0")}`;
timerdiv.innerText = `Timer : 00:60`;
livesdiv.innerText = `Lives  : ${Lives.toString().padStart(2, "0")}`;

let gamestart;

let timeInterval;

let gamePaused = true;

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    // Enter key
    if (gamePaused) document.getElementById("info").style.display = "None";
    else document.getElementById("info").style.display = "Block";
    toggleGame();
    gamestart = false;
    //stopRingtone();
    playaudio.pause();
  }
});

function toggleGame() {
  if (gamePaused) {
    startTimer(remainingTime, remainingTime);
    gamePaused = false;
    if (!gameOver) {
      render();
    }
  } else {
    //stopRingtone();
    remainingTime = minutes * 60 + seconds;
    clearInterval(timeInterval);
    gamePaused = true;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    leftarrow = true;
  } else if (event.keyCode == 39) {
    rightarrow = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) {
    leftarrow = false;
  } else if (event.keyCode == 39) {
    rightarrow = false;
  }
});
let mouseX;
let mouseY;
c.addEventListener("mousedown", (e) => {
  mouseX = e.clientX - c.getBoundingClientRect().left;
  mouseY = e.clientY - c.getBoundingClientRect().top;

  if (mouseX >= paddle.x && mouseX <= paddle.x + paddle.width) {
    if (mouseY >= paddle.y && mouseY <= c.height) {
      paddle.isDragging = true;
    }
  }
});
// Load the audio file

const winaudio = new Audio("../CSS/audio/win.mp3");
const Gameoveraudio = new Audio("../CSS/audio/win.mp3");

playaudio.loop = true;

// Function to play the ringtone
function playRingtone() {
  playaudio.currentTime = 0; // Start from the beginning if already playing
  // ringtoneAudio.play();
  playaudio.play();
}

// Function to stop the ringtone
function stopRingtone() {
  // ringtoneAudio.pause();
  playaudio.pause();
}

c.addEventListener("mousemove", (e) => {
  if (paddle.isDragging && gamestart) {
    mouseX = e.clientX - c.getBoundingClientRect().left;
    const newX = mouseX;
    if (newX > 0 && newX <= c.width - paddle.width && paddle.isDragging) {
      paddle.x = newX;
      drawPaddle(ctx, paddle.x, c.height - 20, paddle.width, paddle.height);
    }
  }
});
c.addEventListener("mouseup", () => {
  paddle.isDragging = false;
});
let isDragging = false;
c.addEventListener("touchstart", handleTouchStart);
c.addEventListener("touchend", handleTouchEnd);
c.addEventListener("touchmove", handleTouchMove);
function handleTouchStart(e) {
  const rect = c.getBoundingClientRect();
  const touch = e.touches[0];
  isDragging = true;
}
function handleTouchEnd() {
  isDragging = false;
}
const rect = c.getBoundingClientRect();
//window.alert(rect.width);

function handleTouchMove(e) {
  if (isDragging && gamestart) {
    const touch = e.touches[0];

    const rect = c.getBoundingClientRect();
    let newX = ((touch.clientX - rect.left) * c.width) / rect.width;
    let newY = ((touch.clientY - rect.top) * c.height) / rect.height;

    if (newX > 0 && newY >= 500 && paddle.x + paddle.width < c.width) {
      paddle.x = newX;
      drawPaddle(ctx, newX, paddle.y, paddle.width, paddle.height);
    }
  }
}
console.log(gamestart);
function render() {
  ctx.clearRect(0, 0, 1200, 520);

  draw();

  update();

  if (!gamePaused && !gameOver) {
    requestAnimationFrame(render);
  }
}
