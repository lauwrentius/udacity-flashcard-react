import { combineReducers } from 'redux'
import {INIT_DECK,ADD_DECK,EDIT_DECK,DELETE_DECK} from 'actions'

function decks (state = {}, action) {
  const { deck } = action

  switch (action.type){
    case INIT_DECK:
      return deck
    case EDIT_DECK:
    case ADD_DECK:
      return {...state,[deck.id]: deck}
    case DELETE_DECK:
      return Object.assign({},
        ...Object.values(state)
          .filter(p=>(p.id !== deck.id))
          .map(p=> ({[p.id]:p})))
    default:
      return state
  }
}

export default combineReducers({
  decks
})

// export default test(){
//   return 'asd'
// }
