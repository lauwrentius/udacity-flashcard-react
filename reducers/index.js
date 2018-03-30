import { combineReducers } from 'redux'
import {INIT_DECK} from 'actions'

function decks (state = {}, action) {
  const { deck } = action

  switch (action.type){
    case INIT_DECK:
      return deck
    default:
      return state
  }
}

function cards (state = {}, action) {
  switch (action.type){
    default:
      return state
  }
}

export default combineReducers({
  decks,
  cards
})

// export default test(){
//   return 'asd'
// }
