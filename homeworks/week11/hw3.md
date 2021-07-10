## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
如果密碼沒有經過雜湊，只是以明文來儲存，這要會非常不安全，就像是家裡鑰匙擺在外面鞋櫃上一樣！有心人士輕輕鬆鬆毫無成本的可以知道全部使用者的密碼！為了資料庫被盜取、密碼被破解，實務上密碼會以雜湊的方式存入。

雜湊跟加密是不同的東西，加密為將原始資料利用演算法轉換成加密後的資料，如果拿到解密的方式（密鑰），就可以清楚的知道原始資料。

雜湊則是將不同長度的原始資料(無限的輸入)，經過雜湊方式演算出固定長度（有限的輸出），即便原始資料只是差一個字，得到的輸出也會差非常多，跟加密主要差別就是雜湊不需要密鑰，也無法逆向推出原始資料。如果不同的輸入的輸出是相同的話，我們就稱為碰撞，碰撞的機率高低就決定了這雜湊演算法的好壞。

## `include`、`require`、`include_once`、`require_once` 的差別
include 會將指定的檔案讀入並且執行程式， include_once 幾乎與 include 相同，但是 include_once 會先檢查要匯入的檔案是不是已經在該程式中被匯入過了，這樣可以避免一些自行定義好的函示被重複宣告。

require 與 include 區別是 ， 當 include 導入程式時發生錯誤的話，會繼續執行；然而 require 會停止執行。

至於 require 和 require_once，就跟 include 與 include_once 的區分一樣， require 如果文件中的程式已經被匯入過了 require_once 就不會再匯入。

## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection 是有心人士利用像是 html 的 input 中輸入 SQL 語法，以此方式竄改你後端的 SQL 語法，例如像課程中範例的留言板，利用註解方式，把原本 SQL WHERE 的條件給註解掉，然後輸入可以輕易登入資料庫的 query ！

總結來說就像在玩填字遊戲一樣更改了 SQL 語句，將我們原本 SELECT 的 query 改變或註解掉了，例如可以把 query 改成 
```
(省略...) WHERE username = '' or 1=1  
```
這樣根本不需要帳號和密碼就可以登入，甚至可以改掉整個 query 語句，得到我們資料庫全部的資料。

防範方式就是要針對如何不被竄改 SQL 語句為出發，就像以下簡單的解說，
```php 
//以上省略
$sql = ' SQL 語句 WHERE id = ? AND password = ?'
$stmt = $conn->prepare($sql)
$stmt -> bind_param('is',$_POST['id'], $_POST['password'])
// 以下省略
``` 
這樣程式就會先編譯 SQL 語句，再將需要的變數利用 bind_param 填入，來達到防範 SQL Injection。

## 請說明 XSS 的攻擊原理以及防範方法
XSS 全名是 Cross-Site Scripting例如課程中的留言板，在新增留言的時候，輸入 ```<script>alert('attack')</script>```，就等於這個 script 會完整的存入後端資料庫中，這樣每個使用者來到留言就會顯示這個 alert 。
所以只要可以執行 script ，那就等於可以利用 script 做任何壞事了，例如可以拿到使用者的 cookie。


防範方式就是把輸入的內容當作純文字，例如  ```<script>``` ，可以將 < 和 >，變成 ```&lt```; 以及  ```&gt```; 跟 SQL injection 一樣，使用跳脫字元的方式，即把內容轉成純文字，而不是遇到 ``` <script> ```，就去執行程式。


## 請說明 CSRF 的攻擊原理以及防範方法
CSRF 跟 XSS 有些類似，只不過 CSRF 即使在沒有執行 JavaScript 下，也能攻擊成功。

CSRF 全名是 Cross Site Request Forgery ，是利用目前網站都使用 cookie 來實現 seesion 機制，讓使用者不用每一個動作就需要重複的登入，正是因為不用再重複的驗證身份，所以就變成 CSRF 可利用的漏洞。 

例如使用者登入某個有CSRF漏洞的網站後，又不小心去瀏覽了有惡意程式的網站，這樣駭客就可以拿到使用者的身份驗證來假冒身份做不該做的事情。

普遍的防範是可以加上圖形驗證，或驗證碼等，或者是在 form 裡面放一個 CSRF token，一樣儲存在 cookie 裡面，這樣就可以來比對放在資料庫的 sesson，但這樣還不夠，最推薦的是 瀏覽器端的 SameSite cookie 方式，原理就是幫 cookie 多加一層驗證，讓不同 domain 發出的 request 都不會帶上 cookie 。