import React from 'react'
import { View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { StackNavigator } from 'react-navigation'

import reducer from 'reducers'
import DeckLists from 'components/DeckLists'
import DeckDetails from 'components/DeckDetails'
import DeckForm from 'components/DeckForm'
import QuestionForm from 'components/QuestionForm'
import Quiz from 'components/Quiz'
import API from 'utils/api'

const navOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#2196F3',
  },
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontWeight: "400",
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
  DeckForm: {
    screen: DeckForm,
    navigationOptions: navOptions
  },
  QuestionForm: {
    screen: QuestionForm,
    navigationOptions: navOptions
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: navOptions
  }
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

/**
* @description App Class. This class handles app navigation as well as creating the redux store.
*/
export default class App extends React.Component {
  constructor(props){
    super(props)
    // API.clearData()
  }
  /**
  * @description Sets a local notification and asks the user for permissions if it's not been set before.
  */
  componentDidMount(){
    API.setLocalNotification()
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
