import { popup } from "./popup.js";
import { resetgame } from "./resetgame.js";
import { Scorepopup } from "./popup.js";
//import { brickBreak } from "./brick.js";

let ball;
let ballradius;
let xball;
let yball;
let Score = 0;
let Lives = 3;
let colorvalue;
const playaudio = new Audio("../CSS/audio/Brick.mp3");
const ballbrickcollisionaudio = new Audio("../CSS/audio/audio.mp3");
const ballpaddlecollisionaudio = new Audio("../CSS/audio/bounceball.mp3");
//playaudio.play();
function updateBallDimention(c, paddle) {
  const isMobile = window.innerWidth <= 820;
  let val=3;
  if (isMobile) {
    ballradius = 6;
    val=2;
  } else {
    ballradius = 8;
  }
  xball = c.width / 2;

  yball = c.height - paddle.height - ballradius;

  ball = {
    ballradius,

    x: xball,

    y: yball,

    dx: val * (Math.random() * 2 - 1),

    dy: -val,

    speed: val,
  };
}

function drawball(ctx, x, y, ballradius, start_angle, end_angle) {
  ctx.beginPath();

  ctx.arc(x, y, ballradius, start_angle, end_angle);

  ctx.fillStyle = "black";

  ctx.fill();

  ctx.closePath();
}

function moveball(ball) {
  ball.x = ball.x + ball.dx;

  ball.y = ball.y + ball.dy;
  ball.speed = ball.speed;
}

function ballbrickcollision(ctx, canvas, rows, column, bricks, color, ball) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < column; c++) {
      let b = bricks[r][c];

      if (b.visible) {
        if (
          ball.x + ball.ballradius > b.x &&
          ball.x - ball.ballradius < b.x + 76 &&
          ball.y + ball.ballradius > b.y &&
          ball.y - ball.ballradius < b.y + 24
        ) {
          ballbrickcollisionaudio.currentTime = 0;
          ballbrickcollisionaudio.play();
          //ball.speed=ball.speed;
          ball.dy = -ball.dy;
          //brickBreak(ctx,b);

          b.visible = false;

          switch (b.color) {
            case color[0]:
              var flag = true;
              Score -= 10;
              colorvalue = 10;

              break;

            case color[1]:
              Score += 20;
              colorvalue = 20;
              break;

            case color[2]:
              Score += 30;
              colorvalue = 30;
              break;

            case color[3]:
              Score += 40;
              colorvalue = 40;

              break;

            case color[4]:
              Score += 50;
              colorvalue = 50;
            
              break;
          }

          Scorepopup(canvas, colorvalue, b.x, b.y, flag, b);
          flag = true;
        }
      }
    }
  }
}
function ballpaddlecollision(paddle, ball) {
  if (
    ball.y + ball.ballradius > paddle.y &&
    ball.x - ball.ballradius < paddle.x + paddle.width &&
    ball.x + ball.ballradius > paddle.x &&
    ball.y < paddle.y + paddle.height
  ) {
    ballpaddlecollisionaudio.play();

    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width / 2) {
      ball.dx = -ball.speed * Math.sin(-60);
      ball.dy = ball.speed * Math.cos(-60);
    } else if (ball.x == paddle.x + paddle.width / 2) {
      //window.alert("middle")

      ball.dx = ball.speed * Math.sin(0);

      ball.dy = ball.speed * Math.cos(0);
    } else {
      ball.dx = -ball.speed * Math.sin(60);
      ball.dy = ball.speed * Math.cos(60);
    }
  }
}

function ballwallcollision(c, paddle, gameOver) {
  if (ball.x + ball.ballradius > c.width || ball.x - ball.ballradius < 0) {
    ball.dx = -ball.dx;
  } else if (ball.y - ball.ballradius < 0) {
    ball.dy = -ball.dy;
  }

  if (ball.y + ball.ballradius > c.height) {
    if (Lives >= 1) {
      if (Lives == 0) gameOver = true;
      localStorage.setItem("currentScore", Score);

      Lives--;

      resetgame(c, ball, paddle);
    }
  }
}

export {
  drawball,
  updateBallDimention,
  ball,
  moveball,
  ballbrickcollision,
  ballpaddlecollision,
  Score,
  ballwallcollision,
  Lives,
};
