```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??

```

在 hw0作業起手式，有說過可以將呼叫 function 看成 `xxx.function.call(xxx)` 來看，我自己解讀的時候會在心裡默念 

```
『什麼東西』call這個 function，在就在call的括號裡面上這個『什麼東西』
```
( 雖然聽起來很奇怪 )
所以就用這個聽起來很奇怪的口號的來解析一下這段程式碼：

第一個：

`obj.inner.hello()` => 『obj 的 inner 呼叫 hello，所以 call 括號裡面是 obj.inner』 => `obj.inner.hello.call(obj.inner)` => 2

第二個：

`obj2.hello()` => 『obj2 呼叫 hello，所以 call 括號裡面是 obj2 ，而且 obj2 等於是 obj.inner 』=> 所以 `obj2.hello.call(obj2)` 就等於 `obj.inner.hello.call(obj.inner)` => 2

第三個：
`hello()` => 『沒有東西呼叫 hello，所以call括號裡面是沒有東西』=> `undefined.hello.call(undefined)` => undefined

---
關於 hello() 如果要正確顯示的話，我們可以利用 call 第一個參數來將 this 改變：

```
hello.call(obj) //1
hello.call(obj2) //2
```

也就是說 call 的第一個參數將會取代 this 值，第一個參數是什麼，this 就會變成什麼，例如 `hello.call(obj)`，就是將 this 變成 obj ，而 obj 的 value 就是 1 ；如果帶入的事 obj2 ，因為 obj2 就是 obj.inner 所以你可以想像成這樣子 `hello.call(obj.inner)`。

當然使用 apply 的話也是一樣的，call 與 apply 做的事情一樣，只是帶入參數的方式不同，而這個範例中 hello 並不需要帶入參數。

```
hello.apply(obj)
hello.apply(obj2)
```

還有剛剛作業起手式提到的 bind，剛剛的 call 與 apply 都是用在直接呼叫 hello，如果我們用 bind 改寫可以寫成這樣：

```
const hello = obj.inner.hello.bind(obj.inner)
hello() 
```

bind 的參數就會等於 this
