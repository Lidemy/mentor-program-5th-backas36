## Redux middleware 是什麼？
就像是在 express 中我們會利用 middleware 來驗證身份，或者 cors 功能，也就是從收到 request 到 給出 response 這中間我們可以利用 middleware 來定義好做些什麼事情。

而 redux middleware 則是可以在 action 被指派後，進到 reducer 之前，我們定義做些什麼事情，例如呼叫 API，進行 log、...等。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
CSR, Client Side Rendering 為瀏覽器發出 request  之後，server 只會回傳基本 tag 的 HTML，然後再透過執行 JavaScript 才能渲染完整的畫面，也就是說畫面都是由 Javascript 動態產生，server 只負責傳資料，並不會回傳整個完整的網頁內容。

SSR 為 Server 端處理好網頁內容，request 一旦發出，瀏覽器收到 server 回傳的 response 就會收到完整的網頁內容。

最主要的差異是在第一次渲染時，SSR 是在 Server 執行，因此 server 端 loading 比較重，也能夠在原始碼中看到網頁真實內容，所以也利於 SEO，CSR 則是瀏覽器的 loading 比較重，也較不利於 SEO。


搜尋引擎是利用 HTML 內容產生內容，如果是 CSR 網頁，因為 server 只會回傳基本的 HTML，要等到瀏覽器執行完 Javascript 後才抓的到內容，所以基於搜尋排名的需求上我們會希望網頁能夠事 SSR 呈現。

## React 提供了哪些原生的方法讓你實作 SSR？

React 有提供 `ReactDOMServer.renderToString()` 可以將 component 渲染成 HTML 形式，並將 HTML 格式轉為字串回傳，這樣在首次 render 時就能看到 HTML 文字內容。

如果有需要互動的部分，則需要改用 `React.hydrate()` 才可以加入 eventListener 來互動。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

- Next.js : 為一個基於 React 的 library，可以提供 SSR, Webpack, Router 功能。

- Prerender : 將網頁渲染之後再回傳給瀏覽器，這樣瀏覽器收到的 HTML 會是預渲染完成的 HTML，適合小型專案。
