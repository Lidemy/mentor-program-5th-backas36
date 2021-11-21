## 為什麼我們需要 Redux？
Redux 為管理 state 的工具，如果要套用的專案規模較小，可能會感受不到他的益處，甚至光是起手式就會讓人感到疲倦。
但如果隨著專案規模越來越大，component 越來越多，每個 component 需要不一樣的狀態也各自有自己的 state，如果沒有一個管理 state 的工具，不僅程式碼會變得難以讀懂，更難以維護外，要 debug 會令人發瘋。
根據 Redux 官網有提到，在以下情形會很適合來使用 Redux ：

 - 專案會用到許多 state 時
 - 專案會頻繁地更新 state
 - 更新 state 的邏輯複雜時
 - 多人協作時


## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是給 JavaScript 程式使用來管理 state 的工具，譬如說最常見個就是與 React 一起來使用，我們可以可以透過 React 結合 Redux，讓 UI 與 資料 分離。

我們就拿官網提到的範例來認識 Redux 元件和資料流：

首先一個簡單的計數器

```
function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter(prevCounter => prevCounter + 1)
  }

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  )
}
```

這個 Component ，由三個部分組成：

- state：這個 component 核心就是 counter 的  state
- view : 根據狀態決定 view (UI)
- action : 可以看作是一個事件，當事件觸發，會將 state 更新

好的，也就是 state > view > action 會組成一個循環，那麼當我們有其他組件需要共用這個 state 怎麼辦呢，我們就必須 `"lifting state up"` ，也就是將狀態放到上層 component 中，但如果需要的東西更多了，這樣上層 component 可能會越塞越多東西，而上層的 component 或許其實都不需要這些狀態的，變成放在上層元件目的只為了拿來傳遞。

簡單來說，state 並不能在同層的 components 做使用，只能透過從上傳下來傳遞，而 Redux 就是來解決這問題的， Redux 的概念就是將 global 的狀態集中在一個地方。

Redux 有幾個重要的元件我們要先熟悉：

- actions : 描述要做什麼事情，就像是 counter 例子中，有個功能是 `increment` ，想要對 counter + 1 ，有點類似我們熟悉的事件綁定，描述事件的時候一樣。 action 其實就只是個 function，然後會回傳一個 object，這個 object 會有個屬性 `type`，也就是這個事件的名稱，然後第二個屬性是 `payload`，通常是放與事件有關的附加訊息。

	以 counter app 為例子的話：
	
	```
	export const increment = (num = 1) => {
	  return {
	    type: 'INCREMENT',
	    payload: num
	  }
	}
	```
- reducer : 主要作用就是讓 action 來使這個狀態下的 state 轉換成下個狀態的 state，reducer 是個 function，會接收兩個參數，第一個是 state，可以設定初始值，第二個是 action，通常會利用 action.type 來判斷要回傳什麼 ，並且回傳的值會是是 object。
	
	```
	const counterReducer = (state = 0, action) => {
	  switch (action.type) {
	    case 'INCREMENT':
	      return state + action.payload
	    case 'DECREMENT':
	      return state - 1
	    default:
	      return state
	  }
	}
	
	export default counterReducer
	```
	> reducer 有幾個重要的規則： 
	> 1. 只根據 state 和 action 來回傳新狀態
	> 2. 不允許修改現有的 state
	> 3. 不可以執行亦不的邏輯，或者副作用處理 ex: `new Date()`
- store : 可以看成就是個 global 的 state，所有的資料狀態都儲存在這邊，讓 components 可以做使用。
	
	以下是透過 redux 提供的 `createStore` 來`訂閱` 每次狀態更新都會 console 出來：
	
	```
	let store = createStore(counter)
store.subscribe(() => console.log(store.getState()))
	```

- distpatch : 定義好 action 之後，也有決定要回傳什麼資料的 reducer 之後，我們還需要一個真正驅動 action 的 function，也就是 dispatch 會將 action 分配工作 reducer， reducer 經過判斷來回傳更新後的 store。
	
	```
	store.dispatch(increment())
	store.dispatch(increment())
	store.dispatch(decrement())
	```


跟一開始舉的例子比起來，我們可以總結 有了 Redux 工具後我們的流程將不只是 `state > view > action > state` 這樣的循環，而是 ` state > view > distpatch > action > reducer > store > state` 這樣的循環。

> without Redux : state 決定 UI 該怎麼呈現 > click之後 > 狀態更新 > UI 根據最新狀態呈現。
 
> wtih Redux : store 透過 root reducer 決定最初始狀態的 state > UI 呈現目前狀態 > click之後 > 當狀態改變 > 將 `action` `dispatch` 給 reducer >  reducer 根據 action.type 回傳新的 state > store 告訴有訂閱 store 的 UI 已經更新了 >  需要 store 的 component 會檢查狀態是否有更新 > 有更新就會重新渲染來更新 UI。


## 該怎麼把 React 跟 Redux 串起來？

首先在專案上我們要先將 redux 裝起來，並且再安裝 react-redux 。
安裝完之後在入口程式 `index.js` 中：

- 引入 react-redux 的`Provider`
- 引入 redux 的 `createStore`
- 使用 `createStore` 來得到 store
- 將 components 用 `Provider` 包起來

```
// ... 省略
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './redux/reducers';
const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

補充：因為通常不只有一個 reducer，所以實務上會建立 `redux` 資料夾，然後再建立 `reducers` 資料夾後在 `reducers` 下建立 `index.js`
然後使用 redux 提供的 `combineReducers` 來 結合所有的 reducers，結合完的 reducers 我們習慣上稱 `rootReducer`。

例如在作業上的 todolist App 的 reducer 有 filter 和 todos 兩個 reducers：

```
import { combineReducers } from "redux";
import todos from './todos'
import showFilter from './showFilter'

export default combineReducers({
  todos,
  showFilter
})
```
