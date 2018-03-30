import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Constants } from 'expo'

import FlashCard from './components/flashCard/FlashCard'
import reducer from 'reducers'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View>
          <View style={{backgroundColor: '#01579B',
            height: Constants.statusBarHeight}}>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor={'#01579B'}
              translucent
              barStyle='light-content'
            ></StatusBar>
          </View>
          <FlashCard></FlashCard>
        </View>
      </Provider>
    )
  }
}
// <Provider store={createStore(reducer)}>
// </Provider>
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware, logger)
  )
)
