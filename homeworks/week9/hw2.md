## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

TEXT的最大長度是 2 的 16次方 -1，是固定的，適合用在不確定長度為多少的時候使用。

VARCHAR 的最大長度也是 2的16次方，但是可以變動，適合拿來用在可預期的長度，例如姓名、學校...。


VARCHAR 是儲存在資料庫中，TEXT則是放在系統上暫存記憶體，所以佔用的資源會比VARCHAR大很多，查詢速度的話 VARCHAR 比 TEXT 快。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

- HTTP 中的每一個 request 都是獨立的，也就是說我們沒辦法藉由 request 來和其他頁面產生關聯，所以就產生出了 session 機制，也就是透過 cookie 來讓 request 記錄一下一些 data。

- 可以在需要這項機制的時候，由 server 設定 cookie 要夾帶什麼訊息，然後在發送 response header 時加上 `setcookie`，瀏覽器就會儲存 cookie。

- 怎麼來的怎麼回去，只要是在同個 domain 下、且沒有過期，瀏覽器就會在 request header 夾帶 cookie，給 server ，server 就可以運用 cookie 夾帶的資訊來決定要顯示什麼內容。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
- 密碼直接一覽無遺的記錄在資料庫中，感覺不是個很好的做法，如果不小心資料庫被駭入，就可以很輕易地拿到每個人的密碼。

- 試過把留言內容寫入 html 程式碼，畫面馬上很聰明地幫我渲染畫面！應該要使用 escapeHTML！

- 目前這週都沒有提到 js 和 php 怎麼一起來結合使用，不知道後面會不會講，感覺老師有刻意讓作業全都只使用 php 來呈現（還是我想太多了？）

- 留言資料庫沒有包含到 username，這樣日後如果該帳號要編輯或刪除留言怎麼連動？
