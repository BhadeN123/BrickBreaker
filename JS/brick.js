//import TWEEN from '@tweenjs/tween.js'
let TargetScore;
const color = ["red", "white", "blue", "pink", "orange"];
let bricks = [];
let brick = {
  width: 76,
  height: 24,
  offset: 40,
};

function createBricks(rows, column) {
  TargetScore = 0;
  console.log(rows, column);
  for (let r = 0; r < rows; r++) {
    bricks[r] = [];

    for (let c = 0; c < column; c++) {
      bricks[r][c] = {
        x: c * (brick.offset + brick.width) + brick.offset,

        y: r * (brick.offset + brick.height) + brick.offset,

        width: brick.width,

        height: brick.height,

        visible: true,

        color: color[Math.floor(Math.random() * 5)],
      };

      switch (bricks[r][c].color) {
        case color[0]:
          TargetScore -= 10;

          break;

        case color[1]:
          TargetScore += 20;

          break;

        case color[2]:
          TargetScore += 30;

          break;

        case color[3]:
          TargetScore += 40;

          break;

        case color[4]:
          TargetScore += 50;

          break;
      }
      // console.log(TargetScore);
    }
  }
  // console.log(TargetScore);
  localStorage.setItem("TargetScore", TargetScore);
}
//createBricks();

function displayBricks(ctx, rows, column) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < column; c++) {
      if (bricks[r][c].visible == true) {
        ctx.fillStyle = bricks[r][c].color;

        ctx.fillRect(
          bricks[r][c].x,

          bricks[r][c].y,

          bricks[r][c].width,

          bricks[r][c].height
        );
      }
    }
  }
}

function updateBrickDimention() {
  const isMobile = window.innerWidth <= 820;
  if (isMobile) {
    // window.alert("mob");

    brick.width = 76;
    brick.height = 12;
    brick.offset = 40;
  } else {
    brick.width = 76;
    brick.height = 24;
    brick.offset = 40;
  }
}

function drawPiece(piece) {
  ctx.clearRect(piece.x, piece.y, brick.width / 5, brick.height / 2);
  ctx.fill.style = brick.color;
  ctx.fillrect(piece.x, piece.y, piece.width.piece.height);
}

export {
  bricks,
  createBricks,
  displayBricks,
  TargetScore,
  updateBrickDimention,
};
