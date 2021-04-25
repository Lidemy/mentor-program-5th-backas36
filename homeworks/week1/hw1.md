## 交作業流程

* 先把 repo clone 到我自己的電腦
	```
	git clone https://github.com/Lidemy/mentor-program-5th-backas36.git 
	```
	
* 打開 iTerm，並且 cd 至 mentor-program-5th-backas36，並創建一個分支
	```
	git branch week1
	```
	
* 創建了分支之後**最容易忘記切換到該分支上，所要記得切換
	```
	git checkout week1
	```
	
	>如果需要查看目前有哪些分支可以輸入 ``` git branch ``` 來查看
	
	>或者可以在創建分支的時候馬上直接切換，在創建分支時執行 
	``` git checkout -b week1``` 這樣就會創建分支後直接切換至week1分支，就不用再執行```git checkout week1``` 

* 寫完全部作業後，記得提交也就是 add 以及 commit
	```git commit -am "week1 homework"```
	
* commit 完成後，將 local 端 week1 分支 push 到 Github
	```git push origin week1```
	
* 發出 pull request (PR)，此時可以再次確認我改了哪些東西，確認都沒問題之後按下 『 create pull request 』

* 按下『 create pull request 』後，如果不放心的話可以到 『 Files changed 』確認，如果有需要更改可以在助教發現之前來修正，確認後，將 PR 的網址複製到學習系統繳交作業 
	>若有需要修正，修正完成後一樣要執行 commit 再 push 一次
	
 👏**恭喜自己完成了作業，耐心等待助教給我評語**👏
 
 
##交完作業之後，有更重要的事要做
助教改完作業，會把 week1 分支 merge 到 master ，此時我們好好的欣賞助教評語後，在我的電腦 local 端，需要執行以下動作

* 在 local 端中先將分支 checkout 到 master 上
* 執行 ```git pull origin master``` 將最新狀態的 master 合併到 local 上
* 確認同步後，就可以執行 ```git branch -d week1``` 將 week1 分支給刪掉說再見了