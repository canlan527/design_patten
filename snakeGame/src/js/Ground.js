var oG = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);

// console.log(oG)
// oG.viewContent
oG.init = function() {
  this.viewContent.style.position = 'absolute';
  this.viewContent.style.background = '#abcdef'
  this.viewContent.style.left = this.x + 'px';
  this.viewContent.style.top = this.y + 'px';
  this.viewContent.style.width = this.width + 'px';
  this.viewContent.style.height = this.height + 'px';

  // 生成一个二维数组
  this.squareTable = [];
  // 生成方块
  for(var i = 0; i < YLEN; i++) {
    this.squareTable[i] = new Array(XLEN);
    for(var j = 0; j < XLEN; j ++) {
      var newSquare = null;
      if(i!== 0 && j!== 0 && i !== YLEN -1 && j !== XLEN -1) {
        newSquare = SquareFactory.create('Floor', j, i,  'tan') // 地板
        // this.squareTable[i][j] = SquareFactory.create('Floor', j, i, SQUAREWIDTH, SQUAREWIDTH, 'tan')
      } else {
        newSquare = SquareFactory.create('Stone', j, i, '#333') // 围墙
      }
      // if(i==0 || j ==0 || i == YLEN -1 || j == XLEN -1) {
      //   newSquare = SquareFactory.create('Stone', j, i, '#333')
      // } else {
      //   newSquare = SquareFactory.create('Floor', j, i,  'tan')
      // }
      // this.squareTable[i][j] = new Floor(10,20,SQUAREWIDTH,SQUAREWIDTH)
      this.squareTable[i][j] = newSquare;
      this.viewContent.appendChild(newSquare.viewContent)
    }
  }

  // console.log(this.squareTable)
  document.body.appendChild(this.viewContent)
}
// 根据xy坐标清除二维数组的方块
oG.remove = function(x, y) {
  var square = this.squareTable[y][x];
  this.viewContent.removeChild(square.viewContent) // 先从视觉清除
  this.squareTable[y][x] = null; // 二维数组里清除
}
//根据xy坐标加入新的二维数组的方块
oG.append = function(square) {
  this.viewContent.appendChild(square.viewContent)

  this.squareTable[square.y][square.x] = square // 数据层面加入方块
}
