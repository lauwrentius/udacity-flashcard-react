import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, Modal } from 'react-native'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Constants } from 'expo'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';


import reducer from 'reducers'
import DeckLists from 'components/DeckLists'
import DeckEdit from 'components/DeckEdit'
import DeckDetails from 'components/DeckDetails'
// import HeaderBar from 'components/HeaderBar'
import API from 'utils/api'

// const {params} = navigation.state;
const navOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#0288D1',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckLists,
    navigationOptions: navOptions
  },
  Details: {
    screen: DeckDetails,
    navigationOptions: navOptions

  },
  DeckEdit: {
    screen: DeckEdit,
    navigationOptions: navOptions

  }
  // DeckDetail: {
  //   screen: EntryDetail,
  //   navigationOptions: {
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple,
  //     }
  //   }
  // }
})

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

export default class App extends React.Component {
  constructor(props){
    super(props)
    // API.addDeck("TEST2")
    // API.clearData()
  }

  render() {
    const {navigation} = this.props
    console.log(this.props)
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNavigator style={{flex: 1}} />
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
