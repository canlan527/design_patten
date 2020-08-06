var tool = {
  // 让子类和父类形成继承关系 原型上实现继承关系
  inherit: function(target, origin) {
    // 圣杯  永生 ->  闭包
    var temp = function() {};
    temp.prototype = origin.prototype;
    target.prototype = new temp();
    target.prototype.constructor = target;
  },
  // 私有属性上形成继承关系
  extend: function(origin) {
    var result = function() {
      origin.apply(this, arguments); // 继承私有属性
    };
    this.inherit(result, origin)

    return result;
  },
  // 符合单例模式的构造函数 返回单例子类 私有属性和原型方法都要继承父类
  single: function(origin) {
    // 子类
    var singleResult = (function(){
      var instance;
      return function() {
        if(typeof instance === 'object') {
          return instance;
        }
        instance = this;
        origin && origin.apply(this, arguments);//私有属性继承
        return instance; // 保存 this， 总是返回 this
      }
    })()
    origin && this.inherit(singleResult, origin); // 方法继承
    return singleResult;
  }
};
// 父类
// function Square(x, y) {
//   this.x = x;
//   this.y = y;

// }
// Square.prototype.touch = function() {
//   console.log('touch')
// };

// // 子类
// function Food() {

// }
// 原型 私有属性 继承
// tool.inherit(Food, Square);


// var oF = new Food(10, 20)

// 返回子类
// var Food = tool.extend(Square)
// var oF = new Food(10, 20)

// single 返回符合单例模式的子类
// var Food = tool.single(Square)
// var oF = new Food(10, 20)
// var oF2 = new Food(20, 30)
// oF === oF2
// 会发现oF2的参数 根本不能起作用