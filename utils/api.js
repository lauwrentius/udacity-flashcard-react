import { AsyncStorage } from 'react-native'

// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'


export default class API{
  static initDeck() {
    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(INIT_DECK_DATA))
      .then(res=>{
        console.log("INIT",res)
        return JSON.parse(res)
      })
  }

  static getDecks() {
    //============if decks is empty init Deck
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
      .then(res=>JSON.parse(res))
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
const INIT_DECK_DATA = {
  React: {
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
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
