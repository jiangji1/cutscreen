npm i cutimg_of_jiangji

说明(or demo)
插件不支持非手机端的。
html打开方式不支持file协议，只能在服务器上跑，推荐使用vscode中的插件live server直接运行测试。

css
#imgContainer {
  width: 100px;
  height: 100px;
  overflow: hidden;
}


html
  <button id="but">点击</button>
  <div id="imgContainer"></div>

js
  var url = "./abc.jpg"
  , imgContainer = document.getElementById("imgContainer")
  , but = document.getElementById("but")
  function cb (base64) {
    var img = document.createElement("img")
    img.src = base64
    document.body.append(img)
  }
  
  cutimg ({ url , imgContainer , but , cb })