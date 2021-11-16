import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './style.css'
import App from './components/App/index'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)