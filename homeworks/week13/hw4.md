## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個打包 module 的工具。

例如說 在 node.js 中我們可以使用 
``` require``` , 
``` module.exports```來使用某個檔案下的 method，而在瀏覽器中我們是不可以直接使用 ```require``` 的語法，因為瀏覽器沒有支援，假設我們現在在我們的網頁中要使用 jQuery 語法，起手式通常是在 html 中寫入這行 ```https://code.jquery.com/jquery-3.6.0.min.js```，其實意思就是引入 jQuery ，來讓我們使用 jQuery 一大堆的 method。但是這樣做會有個問題，就是當我們在使用 jQuery 的時候，常會使用它的簡寫 $ 來代替，但是 jQuery 和 $ 都是放在全域下，如果這麼剛好，我們也引入了其他 library ，這個 libray 的簡寫也用了 $ ，那就會發生命名衝突；但是在 node.js 環境下，我們就沒有這個問題，因為我們可以隨意改變 module 的名稱。

所以說假設我們現在使用了 node.js 寫了一些模組，並且想讓這個 module 也可以在 瀏覽器下執行，就必須使用```require```, ```module.exports``` 是行不通的，但是後來瀏覽器也支援了 ES module，可以使用 ```import``` 和 ```export```，但是這些東西比較潮比較新，可能比較舊的瀏覽器下不支援，所以我們的模組就必須去轉換成瀏覽器可以執行的樣子，我們的主角 webpack ，就是在幫我們執行這些事情，將許多模組轉換且打包起來讓瀏覽器可以執行我們的模組，並且不只是 js，就連 sass, css, 圖片，影片等也都可以使用 webpack 來打包。

我們可以不使用 webpack，因為其實支援度的問題，我們也有 babel 可以幫我們解決， 但是當我們需要使用 npm 上的套件的話，我們就必須一一的去改寫每個入口點 import，這樣會造成日後維護極度不方便，也違背了使用套件的初衷，畢竟使用套件就是要方便使用嘛，所以說當 project 越來越大的時候，sass需要轉換css、ES6需要轉換舊的語法、圖片跟影片需要壓縮 ... 等，webpack的誕生可以讓前端工程師解決那些轉換和打包的麻煩。 


## gulp 跟 webpack 有什麼不一樣？

其實 gulp 和 webpack 可以做的事情很相似，gulp 主要是針對各個<strong> task 進行管理</strong>，比如說我們可以使用 gulp 讓所有 task 同時進行，或是訂下規則，按照規則來執行，這些 task 可以是很多種類型，利用babel 轉換 JavaScript 新舊語法，SASS 轉換 CSS， 壓縮檔案， rename 壓縮檔案...等。

webpack 則是利用許多 loader ，進行轉換，例如 babel-loader, sass-loader，進行轉換後， webpack 再把他們全部都打包起來，主要功能是 bundle！

總結，gulp 管理 task，webpack 打包 module。 

## CSS Selector 權重的計算方式為何？
首先先複習一下選取器有哪幾種：

| 選取器類型 |     |               
| :-------- | :------- |
| Element | div, p , ul, ol, li, em, header .... |
| class  	| .box, .item, .active...	 	         |
| id.     | #menu, .... 					         |
| psuedo-class| :nth-child(), :link, :hover, :focus, ...|
| attribute	 | [type:checkbox], ...	|

### 權重比較為  !important > inline style > ID > class, psudeo-class, attribute > Elements

- !important : 所有的選取器都敵不過！不建議使用，如果下了 !important 會容易使得 css 過於雜亂，這樣如果日後要新增 style 而沒有出現我們要效果時，會不容易去 debug。 例如： ```.active {color:red !important; }```
- inline style : 為寫在 html 行內的 style，例如： ```<div style="color:red"> ... </div>``` ，但是一般我們不會把 CSS 寫在 html 內。

接下來，我們來看權重的計算方式為何，我們使用以下的 html 來開始：
以下權重表種方式會以`{id, class, element}` => `{0,0,0}` 

```
  <div class="content" id="item">
    Specificity
  </div>
```

demo :

```
div{
  color:blue;
}

```
此時權重為 {0,0,1} 文字顏色為 <font color=blue>`blue`</font>


```
.content{
  color:green;
}
```
此時權重為 {0,0,1} 文字顏色為 <font color=green>`green`</font>

```
#item {
  color:pink;
}
```
此時權重為 {1,0,0} 文字顏色為 <font color=pink>`pink`</font>


---


```

div.content {
  color:red;
}
// 權重是 {0,1,1} => win
.content{
  color:green;
}
// 權重是 {0,1,0}
```
文字顏色為 <font color=red>`red`</font>
此時如果加入一個權重比較大的 id selector 

```
div.content {
  color:red;
}
// 權重是 {0,1,1} => win
.content{
  color:green;
}
// 權重是 {0,1,0}

#item {
  color:#FFD700;
}
// 權重是 {1,0,0} => win 
```
文字顏色為 <font color=#FFD700>`#FFD700 `</font>

```
#item{
  color:red;
}
// 權重是 {1,0,0} 

.content#item{
  color:green;
}
// 權重是 {1,1,0}
div.content#item{
  color:blue;
}
// 權重是 {1,1,1} => win
```
文字顏色為 <font color=blue>`blue`</font>

---

權重比較會先看最左邊的 id 選取器再來比 class ， 之後是 tag，
`#item{ ... }` >  `.content{ ... }` > `div{...}`，
接著就是選的越詳細的權重就越大，可以看剛剛最後舉的例子 `div.content#item` > `.content#item` > `#item`。 但是如果在 ```#item{color:red !important;}``` 這樣文字就會變成紅色！