import API from 'utils/api'
import {INIT_DECK} from './actionTypes'

export function initDecks(){
  return (dispatch) => {
    return API.getDecks().then(res=>{
      // console.log("ASDASDASD",res)
      return dispatch(asyncCallback(INIT_DECK, res))
    })
  // }
  // return {
  //   type: INIT_DECK,
  //   deck: {test:"test"}
  }
}


function asyncCallback(type, deck){
  return {type, deck}
}
