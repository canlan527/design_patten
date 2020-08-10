var oGame = new Game();
oGame.timer = null;
oGame.interval = 900;
oGame.score = 0;
oGame.init = function() {
  oG.init();
  oSnake.init(oG);
  createFood(oG, oSnake);

  // 绑定键盘事件
  document.onkeydown = function(e) {
    if(e.which == 37 && oSnake.direction != DIRECTIONENUM.RIGHT) {
      oSnake.direction = DIRECTIONENUM.LEFT;
    } else if(e.which == 38 && oSnake.direction != DIRECTIONENUM.DOWN) {
      oSnake.direction = DIRECTIONENUM.UP;
    } else if(e.which == 39 && oSnake.direction != DIRECTIONENUM.LEFT) {
      oSnake.direction = DIRECTIONENUM.RIGHT;
    } else if(e.which == 40 && oSnake.direction != DIRECTIONENUM.UP) {
      oSnake.direction = DIRECTIONENUM.DOWN;
    }
  }
}
oGame.start = function() {
  clearInterval(oGame.timer);
  oGame.timer = setInterval(function() {
    oSnake.move(oG);
  }, oGame.interval)
}
oGame.over = function() {
  clearInterval(oGame.timer);
}
oGame.init(); 
oGame.start();

function createFood(oGround, oSnake) {
  var x = null;
  var y = null;
  var flag = true;
  // 随机生成食物的坐标
  while(flag) {
    x = 1 + Math.floor(Math.random() * 28)
    y = 1 + Math.floor(Math.random() * 28)
    var ok= true;
    for(var node = oSnake.head; node;node = node.next) {
      if(x == node.x && y == node.y) {
        ok = false;
        break;
      }
    }
    if(ok) {
      flag = false;
    }

  }

  var food = SquareFactory.create('Food', x, y, 'green');
  oGround.remove(food.x, food.y);
  oGround.append(food)
}