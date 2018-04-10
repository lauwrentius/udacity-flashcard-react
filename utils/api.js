import { AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'


export default class API{

  static initDeck() {
    const initItem = INIT_DECK_DATA
      .map(item=>{
        const id = uuidv1()
        return [id, JSON.stringify({...item, id})]
      })
    AsyncStorage.multiSet(initItem).then(res=>{
      return res
    })

    return initItem
  }

  static getDecks() {
    return AsyncStorage.getAllKeys().then(res=>{
      console.log("R",res)
      if(res.length === 0)
        return this.parseDecks(API.initDeck())
      else
        return AsyncStorage.multiGet(res)
          .then(res=>this.parseDecks(res))
    })
  }

  static parseDecks(decks){
    return decks.reduce((prev,curr)=>{
      prev[curr[0]] = JSON.parse(curr[1])
      return prev },{})
  }

  static addDeck(title){
    const id = uuidv1()
    const deck = {id, title, questions:[]}
    return AsyncStorage.mergeItem(id,JSON.stringify(deck))
      .then(res=>deck)
  }
  static editDeck(deck){
    return AsyncStorage.mergeItem(deck.id,JSON.stringify(deck))
        .then(res=>deck)
  }
  static deleteDeck(deck){
    return AsyncStorage.removeItem(deck.id)
      .then(res=>deck)
  }
  static addQuestion(deck,question){
    const questions = deck.questions.concat(question)
    const obj = Object.assign(deck,{questions})

    return AsyncStorage.mergeItem(obj.id,JSON.stringify(obj))
      .then(res=>obj)
  }
  static editQuestion(deck,question,index){
    const questions = deck.questions.map((q,i)=>((i===index)?question:q))
    const obj = Object.assign(deck, {questions})
    return AsyncStorage.mergeItem(obj.id,JSON.stringify(obj))
      .then(res=>obj)
  }
  static deleteQuestion(deck,index){
    const questions = deck.questions.filter((q,i)=>(i!==index))
    const obj = Object.assign(deck, {questions})
    return AsyncStorage.mergeItem(obj.id,JSON.stringify(obj))
      .then(res=>obj)
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
