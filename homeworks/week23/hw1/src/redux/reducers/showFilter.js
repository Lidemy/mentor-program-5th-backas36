import { SET_FILTER } from "../actions/actionTypes";

const showFilter = (state = 'all', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload.filter
    default:
      return state
  }
}

export default showFilter