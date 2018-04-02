import API from 'utils/api'
import {INIT_DECK} from './actionTypes'

// export function initDecks(){
//   return (dispatch) => {
//     return API.initDeck().then(res=>{
//       // console.log("ASDASDASD",res)
//       return dispatch(asyncCallback(INIT_DECK, res))
//     })
//   // }
//   // return {
//   //   type: INIT_DECK,
//   //   deck: {test:"test"}
//   }
// }
export function getDecks(){
  return (dispatch) => {
    return API.getDecks().then(res=>{
      return dispatch(asyncCallback(INIT_DECK, res))
    })
  }
}

function asyncCallback(type, deck){
  return {type, deck}
}
