# 請解釋後端與前端的差異。
## 前端

為了要更方便描述前端跟後端的差異，我來以要登入 gmail 為例子，當我們訪問到 google mail 畫面的時候，我們會看到需要輸入帳密的畫面，並且一定會有個提交的按鈕。在這個畫面中，就是我們所謂的前端了。

也就是訪問者瀏覽了前端的頁面，輸入了帳密後，按下提交的按鈕，此時提交的動作我們可以稱它為 request 給 server。

在前端，我們使用的技術有HTML、CSS、Javascript；在前端的範疇比較像是靜態的，互動的話也僅與限於訪問者，並沒有與 Server 互動，大多是排版及畫面如何呈現。

## 後端

當 request 給 server 後，server 會把資料傳到 database 資料庫來儲存，儲存成功後， server 就會 response 登入後的頁面呈現給訪問者。

後端使用的語言需要與資料庫搭配學習，例如 PHP 與 MySQL ，在後端中，重點在於邏輯，而前端則是在於美感與設計。


---

# 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a3fbc82e-af1a-47f4-a0a8-b4275f571b2e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T031550Z&X-Amz-Expires=86400&X-Amz-Signature=3b807915719a09ebc598de024624301c2fe2d4f50f854d53059a19298b1ea03a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

- 當我們按下 Enter 後，其實就是在對 google Server 送出 request，瀏覽器會先 DNS 尋找網站的伺服器。
    - DNS：網域名稱系統 Domain Name Servers，DNS 其實就像是網址的通訊錄一樣。瀏覽器需要找到正確的伺服器才能將 http 訊息傳送到正確的地方。
    - HTTP：超文本傳輸協定 Hypertext Transfer Protocol。白話一點就是伺服器和 Client 端使用的協定，去協定兩邊要怎麼來交換資訊。

### 在此例子中，瀏覽器會向 google 的 Server 發出要找尋 JavaScript 的頁面，瀏覽器就會去 DNS 找託管的伺服器。

- 瀏覽器會向伺服器傳送 HTTP 訊息，請求伺服器 response 正確的網站，在這當下，TCP/IP 就是負責他們之間的傳送。
    - TCP/IP ：傳輸控制協定和網際網路協定。也就是定義資料該怎麼在網路運作的協定。
- 透過 DNS 找到正確位置之後，Server 會回傳剛剛發出的 JavaScript 搜尋頁面 ，也就是 response 給 client 端，

---
# 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用


- find <檔案名>

    在目前的目錄下找尋該檔案

- lsof -i tcp:3000
    - 此指令為檢查port 3000是否被佔用，並查出對應的 PID
- kill -9
    - 找到 PID 之後就可以使用 kill 來清除，假設查出對應的 PID 是9061 那就輸入 $kill -9 9061