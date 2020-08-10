## 代理模式
### 举个栗子1
场景带入： 唐先生要送女神花---向日葵

对象 ： mrTang  goddess 

给予 mrTang 送花方法 sendFlower, 女神接收花 方法 receiveFlower
但是，女神收花的回答看心情， 属性 mood， 如果 mood 为 true 输出 ok， 为 false 输出 get out，代表对 mrTang的回答。

通过方法 changeMood 随机改变 mood 值，通过 createMood方法，带入新生成的 mood 值， 并且通过 setInterval 每隔 500 毫秒再次改变 mood 值，转换女神心情。

最后 全局调用女神创建新情方法 接着是唐先生送花方法。

```js
    var mrTang= {
      sendFlower: function(target) {
        var flower = 'sunflower'
        target.receiveFlower(flower)
      }
    }

    // goddess
    var goddess = {
      mood: null,
      receiveFlower: function(flower) {
        // true good false bad

        this.mood ? console.log('ok') : console.log('get out')
      },
      changeMood: function() {
        this.mood = Math.random() > 0.5
        console.log(this.mood)
      },
      createMood: function() {
        this.changeMood()
        setInterval(() => {
          this.changeMood()
        }, 500)
      }
    }

    goddess.createMood()
    mrTang.sendFlower(goddess)
```
结果就是，随着每次不断刷新浏览器，根据 mood 值 输出 ok / get out

这只是一个例子， 但是如果不是 唐先生和他女神 的场景， 而是送快递场景， 我们怎么可以让包裹遗失呢？ 

所以 为了唐先生更好追求女神，我们可以通过代理方式对送花方式进行操作，监听女神心情值， 如果 mood 为 true， 再送花，这样就可以保证送出去的花 女神都会接受，并回复 ok。

```js
    // 添加代理
    var tangProxy = {
      proxyFlower: function(target) {
        this.listenMood(target, function() {
          mrTang.sendFlower(target)
        })
      },
      // 监听送花对象 mood 值
      listenMood: function(target, cb) {
        var timer = setInterval(() => {
          if(target.mood) {
            cb();
            clearInterval(timer)
          }
        },400)
      }
    }
    // 通过代理方式送花
    tangProxy.proxyFlower(goddess)

```
由于代理的方式，送花变得百发百中

### 举个栗子2 图片懒加载
通过 ProxyImage 完成代理图片懒加载
```js
  var MyImage = function(id) {
      // this
      var oImg = new Image()
      this.setSrc = function(src) {
          oImg.src = src
      }
      document.getElementById(id).appendChild(oImg)
  }
  

  var ProxyImage = (function() {
      var oMyImg = new MyImage('demo')
      var oNewImage = new Image()
      oNewImage.onload = function() {
          oMyImg.setSrc(oNewImage.src)
      }

      return function(src) {
          oMyImg.setSrc('./1.jpg')
          oNewImage.src = src
      }
  })()

  ProxyImage('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596519275712&di=66856fd10e9a1fd3d845ab137543350c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F57c6a5df03909.jpg')
```




