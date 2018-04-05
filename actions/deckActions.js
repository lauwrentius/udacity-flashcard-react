import API from 'utils/api'
import {ADD_DECK,INIT_DECK,DELETE_DECK} from './actionTypes'

export function getDecks(){
  return (dispatch) => {
    return API.getDecks().then(res=>{
      return dispatch(asyncCallback(INIT_DECK, res))
    })
  }
}
export function addDeck(title){
  return (dispatch) => {
    return API.addDeck(title).then(res=>{
      return dispatch(asyncCallback(ADD_DECK, res))
    })
  }
}
export function deleteDeck(id){
  return (dispatch) => {
    return API.deleteDeck(id).then(res=>{
      return dispatch(asyncCallback(DELETE_DECK, res))
    })
  }
}

function asyncCallback(type, deck){
  return {type, deck}
}
