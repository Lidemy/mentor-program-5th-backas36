
# 先來個劇本前提

菜哥想要練習講笑話，準備參加電視笑話冠軍，為了有系統性的著手練習，菜哥打算將各種笑話輸入到電腦文件裡，並且能夠用 Git 來做版本控制，但是菜哥還不是很清楚為什麼需要版本控制以及什麼是 Git ？

# 什麼是版本控制

菜哥目前有三種笑話，而這三種笑話又會演進，就像 App 一樣會需要一直更新，或者加入更時事的元素，所以日子久了，這三種笑話可能會延伸成三十種或者更多種不同的笑話版本。也許你會想利用資料夾來分類管理，但假設今天菜哥不只有三種笑話，而是三十種笑話，或者是三百種呢？

那如果我們將笑話加入版本控制有什麼好處呢？我們可以將不再好笑的笑話進行修改、可以追溯到某個時間點這笑話的內容，如果今天菜哥是跟朋友一起組隊參加的話，我們也可以追溯是哪個朋友修正了笑話的內容、修正了些什麼，這使得我們可以輕易的檢查出發生問題的時間和原因，更重要的是事，如果我們不小心將各種笑話文件弄的雜亂搞砸了，我們也可以很輕鬆地回復到原本的樣子。

# 那GIT又是什麼？

煮飯需要瓦斯、鍋子，開車需要先有車子，想要版本控制得先有工具，而版本控制的工具就是 Git 。

## GIT主要的三種狀態 & 三種階段

**Committed、Modified、Staged 狀態**

Modified：已修改。笑話已經被標記為有修改過，但還沒保存起來。

Staged：已暫存。針對已經修改過的笑話做記號，以便準備提交保存。

Committed：已提交。也就是這個笑話已經完整且保存。

### **這三種狀態使得Git會分成三種階段**

**Working Directory、Staging Area、.git directory**


![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7ed40038-346f-45bd-bd02-921c7150d6af/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025436Z&X-Amz-Expires=86400&X-Amz-Signature=f3e973eb53ac62d7587da4b44ccff6985eaedf6c3e421467c79d83eabb64e8a1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
# 開始來學 Git 基礎吧

現在我們已經有了 Git 概念了，我們繼續沿用菜哥笑話這劇本，菜哥把原先擁有的三種笑話除存在 joke 資料夾當中，如下：

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6ab954e-965d-491a-b947-da3182705fcd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025448Z&X-Amz-Expires=86400&X-Amz-Signature=0cf6073a7d065b11ded98d74b8614e27dae1d3d10562d2ee6005136fe6ffba90&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 首先需要初始化來將 joke 資料夾開始版本控制

在 joke 底下，執行 

```c
$git init 
```

執行後，在 joke 資料夾底下會多個子目錄，但此時只是初始化的操作，所有的笑話還沒有正式被版本控制。

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6143ec50-712e-4ba0-95dc-d6edf8948bc3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025512Z&X-Amz-Expires=86400&X-Amz-Signature=312709d6d278ae7c71599fee05d917d4b0fbbdb0521c3006a26d868b8ee2d211&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 初始化後，我們得紀錄每次笑話的更新

git init 後，每當我們對笑話進行更新，或者當我們需要紀錄下它時，就必須將它們提交到 repo 。在 repo下的檔案有兩種狀態，untracked / tracked ，可以想像成 repo 只會管理 tracked 的笑話。

初始化後，所有檔案都是屬於 tracked 且 unmodified，當菜哥有對笑話檔案編輯後，此時該笑話的狀態會變成 modified，日後菜哥可以針對這些 modified 的笑話放入 staged 並 commit 。

而菜哥可以隨時使用 $git status 指令，來觀察 repo 裡面檔案的狀態：

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5fcb8446-c47c-43d1-bdad-d3246ec3255f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025527Z&X-Amz-Expires=86400&X-Amz-Signature=ace90e1723ca87450e3e4ed7d084d0d2c54f1c46264c4445d0dd79f9c30d2a3a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

此時 Git 會提示我們記得追蹤那些 untracked 的檔案，也就是執行 $git add 來追蹤

>- $git add <檔案名>    
  追蹤該檔案
- $git add .          
  追蹤目前目錄尚未追蹤的檔案
- $git add ..
    追蹤此目錄以及上層尚未追蹤的檔案

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/effd5eda-2bbf-4873-8858-8010f9cd4b75/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025604Z&X-Amz-Expires=86400&X-Amz-Signature=a685dcd664840fcd332cfe49964eea107369719a1bda234ae0fa20dfaf1515a6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

>如果有需要忽略要做管理的檔案，我們可以建立一個 .gitignore 的文件，並在此文件中輸入需要忽略文件名稱


## 最後一步的提交，千萬別忘記

當菜哥把所有笑話都追蹤之後，就是最重要的 commit 了，git 會提示我們目前準備被提交的檔案有哪些，在提交之前務必菜哥要檢查一下是否所有需要追蹤的檔案已經 $git add 過了，所以菜哥可以養成習慣在 commit 之前，$git status 一下，確認是否檔案已經進入 staged，確認完畢後，接著再執行 $git commit -m /message/

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3dd8faf4-9382-42b4-823f-09f9a5c0bbcb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025621Z&X-Amz-Expires=86400&X-Amz-Signature=203b2bba4aaff55b5a8b810e8ab0772eb51b85320305a5537a4cbce95c7edcaf&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

>其實如果菜哥懶得先 add 再 commit 也可直接執行 $git commit -am "message" 
這樣 Git 就知道我們要一次執行 add 和 commit 了 。

之後菜哥可以執行 $git status 來查看：

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/44446ecb-937b-4688-a80c-bee9e84a3fff/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210418T025643Z&X-Amz-Expires=86400&X-Amz-Signature=560c4e5b44e5f2e8ad0a637c0652421a3016519fc9fef9d36d04408347aa2f10&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

大致上，Git 最重要的步驟就是以上了，現在菜哥可以隨時利用 $git log 來查看歷史紀錄

```c
$git log    //查看所有commit的歷史紀錄
$git log --oneline    //查看所有commit的歷史紀錄簡潔版
```

現在，恭喜菜哥已經完成 Git 基礎的操作，當然還有更進階操作，例如如果想要切換到某個時間點的笑話版本、或者commit了之後又後悔之類的狀況，也是都可以使用 Git 來操控的，但前提是菜哥必須把以上的步驟都熟悉了，日後有空我再來好好的教菜哥更進階的使用 Git。