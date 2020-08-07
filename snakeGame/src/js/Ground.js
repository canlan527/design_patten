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

  for(var i = 0; i < YLEN; i++) {
    this.squareTable[i] = new Array(XLEN);
    for(var j = 0; j < XLEN; j ++) {
      var newSquare = null;
      if(i!== 0 && j!== 0 && i !== YLEN -1 && j !== XLEN -1) {
        newSquare = SquareFactory.create('Floor', j, i,  'tan')
        // this.squareTable[i][j] = SquareFactory.create('Floor', j, i, SQUAREWIDTH, SQUAREWIDTH, 'tan')
      } else {
        newSquare = SquareFactory.create('Stone', j, i, '#333')
      }
      // if(i==0 || j ==0 || i == YLEN -1 || j == XLEN -1) {
      //   newSquare = SquareFactory.create('Stone', j, i, '#333')
      // } else {
      //   newSquare = SquareFactory.create('Floor', j, i,  'tan')
      // }
      // this.squareTable[i][j] = new Floor(10,20,SQUAREWIDTH,SQUAREWIDTH)
      this.squareTable[i][j] = newSquare;
      console.log(newSquare)
      this.viewContent.appendChild(newSquare.viewContent)
    }
  }

  // console.log(this.squareTable)
  document.body.appendChild(this.viewContent)
}
oG.init();