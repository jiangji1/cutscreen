function cutimg ({ url , imgContainer , but , cb }) {
    var canvas = document.createElement('canvas')
    ,ctx

    function urlToGetBase64 (url) {
      var img = new Image()
      img.src = url
      return new Promise(function (resolve) {
        img.onload = function () {
          var width = img.width
          var height = img.height
          ctx = canvas.getContext('2d')
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          var type = /(\.)[^\.]*$/g.exec(url)[0].slice(1)
          var base64 = canvas.toDataURL('image/' + type)
          console.log(base64.slice(0, 50))
          resolve(base64)
        }
      })
    }
    !async function () {
      let base64 = await urlToGetBase64(url)
      var img = document.createElement('img')
      img.src = base64
      imgContainer.append(img)
      img.style = 'transform:translate(0px,0px);'
      var x, y, x1 = 0, y1 = 0
      , maxX = img.width - imgContainer.offsetWidth
      , maxY = img.height - imgContainer.offsetHeight
      img.addEventListener('touchstart', function (e) {
        var oldX = /\([^p]*(?=p)/.exec(this.style.cssText)[0].slice(1)
        , oldY = /,[^p]*(?=p)/.exec(this.style.cssText)[0].slice(1)
        x = e.touches[0].clientX - oldX
        y = e.touches[0].clientY - oldY
      })
      img.addEventListener('touchmove', function (e) {
        x1 = e.touches[0].clientX - x
        y1 = e.touches[0].clientY - y
        if (x1 > 0 ) x1 = 0
        if (x1 < -maxX) x1 = -maxX
        if (y1 > 0) y1 = 0
        if (y1 < -maxY) y1 = -maxY
        img.style = 'transform:translate(' + x1 + 'px,' + y1 + 'px);'
      })
      but.addEventListener('click', function () {
        console.log(ctx.getImageData(0,0,10,10))
        // console.log({ x1: Math.abs(x1), y1: Math.abs(y1), width: imgContainer.offsetWidth, height: imgContainer.offsetHeight })
        var width = imgContainer.offsetWidth
        , height = imgContainer.offsetHeight
        , x2 = Math.abs(x1)
        , y2 = Math.abs(y1)
        , canvasData = ctx.getImageData( x2, y2, width + x2, height + y2 )
        , canvas2 = document.createElement('canvas')
        , ctx2 = canvas2.getContext('2d')
        console.log(1111)
        canvas2.width = width
        canvas2.height = height
        ctx2.putImageData(canvasData, 0, 0, 0, 0, width, height)
        var type = /(\.)[^\.]*$/g.exec(url)[0].slice(1)
        , base64 = canvas2.toDataURL('image/' + type)
        cb(base64)
      })
    }()
  }
