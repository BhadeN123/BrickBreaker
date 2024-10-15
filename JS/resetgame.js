function resetgame(c,ball,paddle) {
    ball.x = c.width / 2;
  
    ball.y = c.height - paddle.height - ball.ballradius;
  
    ball.dx = 3 * (Math.random() * 2 - 1);
    //ball.dx = -3;
  
    ball.dy = -3;
  
    paddle.x = c.width / 2 - paddle.width / 2;
  
    paddle.y = c.height - paddle.height;
  }

  export{resetgame};