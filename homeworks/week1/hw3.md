## 教你朋友 CLI


# Command Line 是什麼？

當我們和外國人溝通，我們需要會外語，不然只能用肢體語言。

而當我們要和電腦溝通，我們得透過純文字或者圖形化介面 GUI ，雖然不是完全正確，但可以想像此時純文字就像我們學外語和外國人溝通一樣，而 GUI 就像肢體語言一樣，相對之下可以比較好理解，但卻無法像文字一樣可以做出精準的溝通。

在與電腦溝通時，有時候並非百分之百可以使用 GUI 來操作，而此時我們就需要作純文字的溝通了。

# Command Line 基本指令

首先當然是打開電腦的 terminal ( 或者是其他 command line tool ，在此範例我使用 iTerm2 ) 來進入純文字溝通環境。

接下我來介紹一些超基本一定要會，而且剛好是h0w哥要達成目標一定要會的一些指令吧，學完後h0w就可以把 afu.js 建在 wifi 資料夾裡了。

- **pwd - 印出目前所在的位置**
- **cd - 切換到某個位置**
- **ls - 當前位置底下有哪些檔案**
- **touch - 新增一個檔案/修改檔案時間**
- **mkdir - 新增一個資料夾**

就是這 5 個指令，可以讓h0w哥馬上會使用 command line 來達成目的。

馬上來圖解給h0w看吧：

- 假設 h0w哥想建立 wifi 資料夾在 desktop 上

    使用 pwd 來確認目前位置，再使用 ls 確認 desktop 是否在此目錄下

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b461f760-4508-4e0b-8d62-f8a6a8579a2c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T070220Z&X-Amz-Expires=86400&X-Amz-Signature=23665c48d453514c8492f22051827794b250a26bd6fc822943edd02d76a86971&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

現在我們知道目前目錄下有個叫 Desktop 的資料夾，就是h0w哥想要建立 wifi 資料夾的位置。

- 執行 cd 到 Desktop 之後，再輸入 mkdir 指令來建立 wifi 資料夾

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b461f760-4508-4e0b-8d62-f8a6a8579a2c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T070355Z&X-Amz-Expires=86400&X-Amz-Signature=04c0ef95948bf48f073792825e684d4586e03702c8b8c3c8f93801c4e14a2451&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

  此時你會看到左邊已經起了變化，現在我們來到了 Desktop 底下了。

接著利用 mkdir 來建立 wifi 資料夾

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aaae662a-0be7-4e1f-8195-57987a75c521/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T070529Z&X-Amz-Expires=86400&X-Amz-Signature=f5b693c10f714fdf51a6ab9ed3ccb8ecce0d77b768bdcdc45b9a14adf3516e9b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

再 ls 一下，可以看到現在 Desktop 已經有了 wifi 資料夾。

- 接著可別以為再執行 touch afu.js 就完成了！因為此時我們的目錄還是在 Desktop 下，所以必須像第 2 個步驟一樣，先移動到 wifi 資料夾下。
- 接著才是輸入 touch afu.js 來建立 afu.js 檔案，並且利用 ls 來確認是否已經新增。

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4155e3dd-cf74-4c2c-b2c5-47199bf8f15f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T070620Z&X-Amz-Expires=86400&X-Amz-Signature=7a2a729125563cbc691823c6c1acb4b0d1ba2b8440b1bcc1f8f0fe4a5905800a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)