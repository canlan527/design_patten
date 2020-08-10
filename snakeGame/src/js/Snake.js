var oSnake = new Snake();
oSnake.head = null;
oSnake.tail = null;
oSnake.direction = null;
oSnake.init = function(oGround) {
  var SnakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
  var SnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'orange');
  var SnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'orange');

  //把三个小方块串成整体 ->  链表
  SnakeHead.next = SnakeBody1;
  SnakeHead.prev = null;

  SnakeBody1.next = SnakeBody2;
  SnakeBody1.prev = SnakeHead;

  SnakeBody2.next = null;
  SnakeBody2.prev = SnakeBody1;

  // render
  oGround.remove(SnakeHead.x, SnakeHead.y);
  oGround.append(SnakeHead);

  oGround.remove(SnakeBody1.x, SnakeBody1.y)
  oGround.append(SnakeBody1);

  oGround.remove(SnakeBody2.x, SnakeBody2.y);
  oGround.append(SnakeBody2);

  // 记录头尾
  this.head = SnakeHead;
  this.tail = SnakeBody2;

  // 默认的方向
  this.direction = DIRECTIONENUM.RIGHT;

}

oSnake.strategies = {
  MOVE: function(snake, square, oGround) {
    var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'orange')
    newBody.next = snake.head.next;
    newBody.prev = null;
    newBody.next.prev = newBody;
    oGround.remove(snake.head.x, snake.head.y);
    oGround.append(newBody)
    // 新建蛇头
    var newHEAD = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
    newHEAD.next = newBody;
    newHEAD.prev = null;
    newBody.prev = newHEAD;

    oGround.remove(square.x, square.y);
    oGround.append(newHEAD)
    snake.head = newHEAD;
    // 删掉蛇尾
    var floor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'tan')
    oGround.remove(snake.tail.x, snake.tail.y);
    oGround.append(floor)
    snake.tail = snake.tail.prev;

    // 更新



  },
  EAT: function() {
    console.log('eat');
    
  },
  DIE: function() {
    console.log('die');
    
  }
}

oSnake.move = function(oGround) {
  var square = oGround.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
  if(typeof square.touch == 'function') {
    this.strategies[square.touch()](this, square, oGround);
  }
};
oSnake.init(oG)
// oSnake.move(oG)
