import { AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'


export default class API{
  static initDeck() {
    const initItem = INIT_DECK_DATA
      .map(item=>({...item, id:uuidv1()}))
      .reduce((obj,item)=>{
        obj[item.id] = item
        return obj
      }, {})

    AsyncStorage.setItem( DECK_STORAGE_KEY,
      JSON.stringify(initItem))

    return initItem
  }

  static getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(res=>{
        const ret = JSON.parse(res)
        if(ret !== null)
          return ret
        return API.initDeck()
      })
  }

  static addDeck(title){
    const id = uuidv1()
    const deck = {id, title, questions:[]}
    return AsyncStorage.mergeItem( DECK_STORAGE_KEY,
      JSON.stringify({[id]:deck}))
        .then(res=>deck)
  }
  static editDeck(deck){
    return AsyncStorage.mergeItem( DECK_STORAGE_KEY,
      JSON.stringify({[deck.id]:deck}))
        .then(res=>deck)
  }
  static addQuestion(deck,question){
    // console.log("Add Q", deck,question)
    const arr = deck.questions.concat(question)
    const obj = Object.assign(deck,{questions: arr})
    return AsyncStorage.mergeItem( DECK_STORAGE_KEY,
      JSON.stringify({[obj.id]:obj}))
        .then(res=>obj)
  }
  static deleteDeck(id){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(res=>{
        const data = JSON.parse(res)
        const deck = data[id]
        delete data[id]
        return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
          .then(res=>deck)
      })
  }

  static clearData(){
    AsyncStorage.clear()
  }
}



// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }
//
// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }

const DECK_STORAGE_KEY = 'UdacityFlashcard'
const INIT_DECK_DATA = [
  {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
]
