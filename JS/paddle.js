let widthpaddle;
var xPosPaddle;
var yPosPaddle;
let heightpaddle;

let paddle;

function drawPaddle(ctx, x, y, width, height) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, width, height);
}
function movepaddle(c, leftarrow, rightarrow, ismousedown) {
  if (rightarrow == true && paddle.x < c.width - paddle.width) {
    paddle.x = paddle.x + paddle.dx;
  } else if (leftarrow == true && paddle.x > 0) {
    paddle.x = paddle.x - paddle.dx;
  } else if (ismousedown == true && rect.x < 600 && paddle.x > paddle.width) {
    paddle.x = paddle.x - 100;
  } else if (ismousedown == true && rect.x > 600 && paddle.x < c.width - 100) {
    paddle.x = paddle.x + 100;
  }
}

function updatePaddleDimention(c) {
  const rect = c.getBoundingClientRect();
  const isMobile = window.innerWidth <= 820;
  if (isMobile) {
    widthpaddle = 200;
    heightpaddle = 15;
  } else {
    widthpaddle = 200;
    heightpaddle = 20;
  }

  xPosPaddle = c.width / 2 - widthpaddle / 2;

  yPosPaddle = c.height - heightpaddle;

  paddle = {
    width: widthpaddle,
    height: heightpaddle,
    x: xPosPaddle,
    y: yPosPaddle,
    dx: 10,
  };
}

export { paddle, drawPaddle, updatePaddleDimention, movepaddle };
