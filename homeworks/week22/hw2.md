## 請列出 React 內建的所有 hook，並大概講解功能是什麼
### useState
``` const [state, setState] = useState(initialState)```

state 可以看成是某個狀態下的值 (被監控的值)，setState 則是用來更新 state 的 function (改變監控的值)。

當 state 值有改變時，UI 才會有改變，所以當 setState，放了與目前 state 一樣的值， React 會跳過子 component 的 render 和 effect 執行。 

**initialState** : 當初始 state 需要透過複雜計算的話，useState 裡面是放 function，而這個 function 會只有在第一次 render 的時候被呼叫。

### useEffect

```
	useEffect(()=>{
			// do something...
			
			return () => {
				// do something ...
			}
		}, []
	)
```
useEffect 第一個參數是放 callback function，第二個參數為陣列。

useEffect 預設是每次瀏覽器完成 render 後觸發 effect，可以指定依賴哪些值，當這些值有改變時會執行。
> 適用時機：執行一些和 react 本身無關，但須要執行的動作，如：發送 API ...，localStorage 資料儲存。


如果只想要 useEffect 內的 function 在瀏覽器第一次 render 後 執行一次，可以傳遞空陣列 `[]` 作為依賴，即代表此 useEffect 沒有依賴任何 props 或 state 值，因為再怎麼 render 空陣列就代表空陣列，沒有改變了任何值，就不會執行 useEffect 的 function。

如果 useEffect 裡面 return 一個 function ，這個 function 會在此 component 消失前被執行。

### useContext

```
	const value = useContext(MyContext)
```
useContext 可以讓 components 和 被包覆在此 components 的子 components 存取傳遞的資料，而不是透過層層傳遞 ( props drilling ) 的方式，有點類似定義全域變數的概念。

透過官網的範例來了解 ：

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

// 1) createContext 建立了 context，這邊代表預設值是 themes.light
const ThemeContext = React.createContext(themes.light);

function App() {
  return (
 
  // 2) 使用 <Context.Provider> 包覆 components 來將 value 傳遞下去
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {

// 3) 接收 <Context.Provider> 傳遞下來的 value
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```
### useReducer
```
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

如果 state 邏輯複雜或者下一個 state 需要依賴之前的 state，那麼 useReducer 會比 useState 還更適用。

- 第一個參數是放 state 的 callback function。
- 第二個參數是放 state 的初始值。
- 第三個參數是放 init function，這樣 state 的初始值會被設定成 `init(initialArg)`

而解構後的 state 就是資料的狀態， dispatch 則是依據 第一個參數 callback function 制定的邏輯來處理。

如果 Reducer Hook 回傳的值與目前的 state 值相同，就會跳過 child component 的 render 和 effect 執行。

### useCallback
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

useCallback，第一個參數是放 callback function，第二個參數是放依賴的陣列，只有在依賴改變時，才會更新。

useCallback 主要作用是會回傳整個 callback function ，相當於 `useMemo(()=> {fn}, deps})`

### useMemo
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
useMemo 會記住 第一個參數執行後的值，並且一樣只會在依賴有改變時才會重新執行`computeExpensiveValue`，這樣可以避免每次 render 都要重新運算一次。

> 與 useCallback 很類似，例如 `useCallback(fn, deps) ` 等於  `useMemo( () => fn, deps)`，最大的差異是，useCallback 因為是回傳整個 function，所以可傳參數，而 useMemo 則是回傳一個值。


### useRef
```
 const refContainer = useRef(initialValue)
```

useRef 會回傳一個 mutable 的 ref object，其中 `current` 屬性的值就是傳入的參數 initialValue，在 components 的生命週期將保持不變。


### useImperativeHandle
```
useImperativeHandle(ref, createHandle, [deps])
```
第一個參數是放要使用的 reft，第二個參數是放要傳給 component 的行為，最後則是依賴。和使用 `ref` 類似，但使用`useImperativeHandle` 時，上層 component 可以存取 ref。

### useLayoutEffect
與`useEffect`雷同，不過 `useEffect` 為瀏覽器渲染完成後執行，而 `useLayoutEffect` 是瀏覽器渲染完成前執行

useLayoutEffect 就與 class component 生命週期中的 `componentDidMount` 與 `componentDIdUpdate` 呼叫的時機是一樣的。

### useDebugValue
useDebugValue 是用在 React DevTools 中顯示自定義 hook 的標籤。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![](./react%20生命週期.jpg)
可以從官方提供的生命週期表中看出， lifecycle 可分成 Mounting、Updating、Unmountingn 三個階段。

- Mounting : 此分類是 DOM 裝載的階段，呼叫順序是 `contructor` > >`componentWillMount`(已不建議使用) > `render` >  更新 DOM 和 refts > `componentDidMount`
	- contructor : 會在 mount 之前被呼叫，在此時會初始化 state，綁定 event handler。
	- compoentWillMount : 會在 component 轉成真正的 DOM 之前被呼叫執行，也只會被執行一次。
	- compoentDidMount : 轉成我們真正的 DOM 之後執行，fetch api 適合放在這裡。
	
- Updating : 當 prop 或 state 有變化時，就會進入 updating 階段，此時會依照順序呼叫 `render` > `componentDidUpdate`
 	- render : 根據 prop 和 state 的變化來回傳。
 	- compoentDidUpdate : 會重新渲染完成時執行。每一次元件更新時， react 會確保 `compoentDidUpdate` 只會被執行一次。
 	
- Unmounting : 當 component 從 真正的 DOM 中被移除時，則會呼叫 componentWillUnmount`，常使用在移除 event listener, 取消 AJAX request ... 等。


## 請問 class component 與 function component 的差別是什麼？

class component 是依照上述的生命週期來指定每個階段該做什麼事情，而 function compoent 則是一切以 state 或 依賴 (dependency) 的變化來重新渲染，或者是使用 useEffect, useLayoutEffect 來指定渲染後與渲染前處理些什麼事情。

function component 程式碼會比 class component 來的簡潔，並且少了 `this` 深入認識的要求。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在 React 中進行表單的處理時，可以分成 controlled 與 uncontrolled components。
- controlled : 透過 useState 來保存資料
- uncontrolled: 類似像使用 jQuery 一樣，需要自己選取 DOM 來做資料的處理 。

大部分建議使用 controlled component 透過 state 來存取資料。


