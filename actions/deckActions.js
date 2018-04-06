import API from 'utils/api'
import {ADD_DECK,INIT_DECK,EDIT_DECK,DELETE_DECK} from './actionTypes'

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
export function editDeck(deck){
  return (dispatch) => {
    return API.editDeck(deck).then(res=>{
      console.log("EDIT API",res)
      return dispatch(asyncCallback(EDIT_DECK, res))
    })
  }
}

export function addQuestion(deck, question){
  return (dispatch) => {
    return API.addQuestion(deck, question).then(res=>{
      console.log("RES ADD",res)
      return dispatch(asyncCallback(EDIT_DECK, res))
    })
  }
}
function asyncCallback(type, deck){
  return {type, deck}
}
