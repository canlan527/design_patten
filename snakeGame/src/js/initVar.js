// 初始化所有变量
// 设定游戏场景位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 10;
// 宽度系数 高度系数
var XLEN = 30;
var YLEN = 30;
// 方块宽度
var SQUAREWIDTH = 20;

// 基类 父类
function Square(x, y, width, height, dom) {
  this.x = x,
  this.y = y;
  this.width = width;
  this.height = height;
  this.viewContent = dom || document.createElement('div')
}
Square.prototype.touch = function() {
  console.log(touch)
}

var Floor = tool.extend(Square);
var Stone = tool.extend(Square); // 障碍物
var Food = tool.single(Square);
var SnakeHead = tool.single(Square); // 蛇头
var SnakeBody = tool.extend(Square); // 蛇身
var Snake = tool.single();
var Ground = tool.single(Square);// 广场
var Game = tool.single();
