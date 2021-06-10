## 什麼是 Ajax？
Ajax 的全名是 Asynchronous JavaScript and XML 。
JavaScript 不用多做解釋了，而 XML 是因為早期交換格式都是使用 XML，但現在已經不侷限於 XML 了，多用 JSON 較多！
至於 Asynchronous ，字面上也就是非同步。剛開始接觸的時候我一直以為同步是指可以一次做很多事，非同步就是一次只能做一件事，相信很多人跟我一樣被這觀念束縛很久。但就此拋開吧，Asynchronous 非同步真正的重點就是『現在開始動作，但是等等再來完成』。
可以想像自己在家想煮個一飯一菜一湯，總不可能將米粒放在電鍋按下去後，單單站著等飯好才去做其他的菜、煮其他的湯吧！非同步就是指，當你把電鍋按下去後，我們可以去執行其他工作，例如炒菜、煮湯，而當飯煮好之後，我們就可以完成我們最終目的－開飯啦！

非同步的概念讓我們將工作效率提升很多，用在 JavaScript 上也是，當我們使用 JavaScript 和 Server 索取資料時，我們非常需要非同步的效率，不然使用者可能等到天荒地老；所以當我們在編寫程式時如果遇到可能會需要耗費時間處理的動作時，我們就可以採取非同步的概念，好讓 JavaScript 可以先執行後面的程序。

了解完什麼是 Asynchronous 後，這樣就能比較理解 Ajax 了， 也就是說瀏覽器從 JavaScript 向 Server 發出 request，Server 回傳給瀏覽器，瀏覽器再經由 JavaScript 來渲染網頁，
## 用 Ajax 與我們用表單送出資料的差別在哪？
如果我們使用表單送出資料時 (程式碼如下)，瀏覽器發出 request 到 "https://www.google.com/" ，然後再回傳 response 給瀏覽器，瀏覽器直接渲染畫面，會有<strong>換頁</strong>產生，過程中跟 JavaScript 沒有關係。
```
<form method="GET" action="https://www.google.com/">
  <!-- 省略 -->
</form>
```

使用 form 來發出 request 會有換頁問題，也就是說，每發出一次 request 就會重新載入畫面一次，在這些過程中會耗費很多不必要的資源。

但是如果我們是利用 JavaScript 發出 Ajax request 的話，我們流程就會變成瀏覽器上的 JavsScript 透過瀏覽器發 request 給 Server，Server 發出 response 給瀏覽器的 JavaScript 然後再經由瀏覽器渲染畫面，所以不會跟使用 form 送出資料一樣有換頁的程序。
## JSONP 是什麼？
JSONP 的全名是 JSON with Padding。

使用 Ajax 時因為瀏覽器的關係會有許多限制，例如同源政策，簡單的說就是不同的 domain 不能載入，但是有些 HTML tag 沒有這些限制，例如 img, iframe, script。

JSONP就是利用 <scirpt> 這個特性來完成不同 domain 的 request，我們只要在自己的 script 裡面定義好一個 function 來接收 response 要給我們的資料就可以了。



## 要如何存取跨網域的 API？
如果想在跨網域的交換資料，就得使用 CORS 這個規範，全名為 Cross-Origin Resource Sharing。

也就是說 CORS 規範了當我有跨網域存取 API 需求時，我得先達到什麼條件才可以順利存取。
> response 的 header 含有 Access-Control-Allow-Origin 這個欄位，瀏覽器收到 response 時會去檢查發出 request 的 header 裡面 origin 是否有符合這個條件，不符合就會被擋下。

另外瀏覽器會針對發出的 request 區分成簡單請求和非簡單請求。如果是簡單請求，就會直接發送 request 出去，如果是非簡單請求，(例如需要填入 Access-Control-Allow-Methods、Access-Control-Allow-Headers、或者一些使用者資料等)，就會發送 Preflight Request 給 Server，Server 回覆後，瀏覽器才會依據 Server 的回覆來判斷要不要發出 request。

JSONP 和 CROS 都可以跨網域存取資料，但是 JSONP 的缺點就是只能使用 GET method ，沒辦法使用 POST。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
在第四週時，是透過 node.js 來發出 request，並不像瀏覽器有這麼多限制！這週我們是透過瀏覽器來發出 request ，所會遇到同源政策的限制。
