function SquareFactory() {

}
SquareFactory.create = function(type, x, y, color ) {
  if(typeof SquareFactory.prototype[type] == undefined) {
    throw 'no this type'
  }
  if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
    SquareFactory.prototype[type].prototype = new SquareFactory()
  }

  var newSquare = SquareFactory.prototype[type](x, y, color);
  return newSquare;
}

SquareFactory.prototype.init = function(square, color) {
  square.viewContent.style.position = 'absolute';
  square.viewContent.style.background = color;
  square.viewContent.style.width = square.width + 'px';
  square.viewContent.style.height = square.height + 'px';
  square.viewContent.style.left = square.x * square.width + 'px';
  square.viewContent.style.top = square.y * square.height + 'px';
}
SquareFactory.prototype.Stone = function(x, y, color) {
  var stone = new Stone(x,y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(stone, color);
  return stone;
}
SquareFactory.prototype.Floor = function(x, y, color) {
  var floor = new Floor(x,y, SQUAREWIDTH, SQUAREWIDTH);
  // 初始化 包装
  this.init(floor, color);
  return floor;
}
SquareFactory.prototype.Food = function(x, y, color) {
  var food = new Food(x,y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(food, color);
  return food;
}
SquareFactory.prototype.SnakeHead = function(x, y, color) {
  var osh = new SnakeHead(x,y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(osh, color);
  return osh;
}
SquareFactory.prototype.SnakeBody = function(x, y, color) {
  var osb = new SnakeBody(x,y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(osb, color);
  return osb;
}
// SquareFactory.create('Stone', 10, 20, 'black')