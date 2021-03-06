## 請以自己的話解釋 API 是什麼

API 的全名是 Application Programming Interface。
簡單來說 API 的產生是為了要和提供資料的那一方實現『 溝通 』這件事情，需要資料的我們要如何去溝通，則是要透過 Interface ，也就是『 介面 』。

就拿一個最近我朋友的生活例子來舉例，我朋友最近因為狗狗發生一些事情，需要透過寵物溝通師來做雙向主人與寵物的雙向溝通，此時我朋友就是需要資料的一方，而我朋友的狗狗就是提供資料的那方，如果平時可以好好溝通，都沒有代溝，那也就不需要寵物溝通師了。但因為現在就是因為溝通不良，造成生活上一些困擾了，所以我們必須要正式的來好好彼此溝通了解一下，這時我們就需要寵物溝通師這個『介面』來幫忙了。

還不夠詳細嗎？我再仔細的舉例地說，寵物溝通師明確的規範他可以提供哪些服務，例如專長是寵物個性分析，此時我們當然不可能要求寵物溝通師去做寵物相親配對之類，因為已經超過服務範圍了。
寵物溝通師可以明確的規範我朋友(需要資料的那方)可以得到什麼資料，如何拿到資料等等，然後寵物溝通師再去跟提供資料的狗狗來得取資料給狗主人。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

- 201 - POST 或 PUT 發出請求後的回應，代表 request 成功，資料也成功被創建。
- 300 - 發出的 request 有 1 個以上的 response，User 應該選其中一個。
- 403 - client 端沒有被授權，Server 拒絕給予 response。
- 429 - 在給定的時間內發送了太多 request

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

| 說明             | Method | path            | 參數         | 範例            |
| ---------------- | ------ | --------------- | ------------ | --------------- |
| 獲取所有餐廳資料 | GET    | /restaurant     | 無           | 無              |
| 獲取單一餐廳資料 | GET    | /restaurant/:id | 無           | /restaurant/5   |
| 新增餐廳         | POST   | /restaurant     | name: 餐廳名 | 無              |
| 刪除餐廳         | DELETE | /restaurant/:id | 無           | /restaurant/123 |
| 更改餐廳資訊     | PATCH  | /restaurant/:id | name: 餐廳名 | 無              |

Base URL: https://restaurant-api-info.com
