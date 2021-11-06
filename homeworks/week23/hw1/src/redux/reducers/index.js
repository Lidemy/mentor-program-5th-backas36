import { combineReducers } from "redux";
import todos from './todos'
import showFilter from './showFilter'

export default combineReducers({
  todos,
  showFilter
})