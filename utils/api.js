import { AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'
// import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'
import { Permissions, Notifications } from 'expo'


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
      if(res.length === 0)
        return this.parseDecks(API.initDeck())
      else
        return AsyncStorage.multiGet(res)
          .then(res=>this.parseDecks(res))
    })
  }

  static parseDecks(arr){
    console.log("DECKS",arr)
    const decks = arr.filter(i=>i[0]!==STUDY_NOTIFICATION_KEY)
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

  static clearLocalNotification(){
    return AsyncStorage.removeItem(STUDY_NOTIFICATION_KEY)

  }
  static createNotification(){
    return{
      title: 'Study Time',
      body: "Don't forget to study for today!",
      ios: {
        sound: true
      },
      android:
      {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  }
  static getLocalNotification(){
    return AsyncStorage.getItem(STUDY_NOTIFICATION_KEY)
      .then(JSON.parse)
  }
  static setLocalNotification(){
    return AsyncStorage.getItem(STUDY_NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(res=>{
        console.log("RES",res)
        if(res === null){
          console.log("RES11",res)

          Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status})=>{
            console.log('status',status)
            // if(status === 'granted'){
              Notifications.cancelAllScheduledNotificationsAsync()
              let tommorrow = new Date()
              tommorrow.setMinutes(tommorrow.getMinutes()+1)
              // tommorrow.setDate(tommorrow.getDate()+1)
              // tommorrow.setHours(20)
              // tommorrow.setMinutes(00)

              Notifications.scheduleLocalNotificationAsync(
                this.createNotification(),
                {
                  time: tommorrow,
                  repeat: "day"
                }
              )
              console.log('ASD1')
              AsyncStorage.setItem(STUDY_NOTIFICATION_KEY, JSON.stringify(true)).then(res=>
                AsyncStorage.getItem(STUDY_NOTIFICATION_KEY).then(res=>console.log("GET",res))
              )
            // }
          })
        }
     })
  }
}


const STUDY_NOTIFICATION_KEY = 'Flashcard-StudyNotification'
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
