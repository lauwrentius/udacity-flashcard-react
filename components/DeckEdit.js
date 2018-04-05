import React, { Component } from 'react'

import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform } from 'react-native'

import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons'



import { addDeck, initDecks } from 'actions'


// const ok = (Platform.OS === 'ios') ? 'ios-checkmark' : 'md-checkmark'
// const cancel = (Platform.OS === 'ios') ? 'ios-close' : 'md-close'
// const icon1 = () => (<Icon
//   style={{fontSize:26, padding: 10, color: '#ffffff'}}
//   name={ok}
// />)
// const e1 = () => <Button
//   style={{backgroundColor: '#4CAF50', flex:1}}
//   title='Ok' />
// const e2 = () => <Button
//   icon={{name: 'ac-unit', type: 'Ionicons'}}
//   style={{backgroundColor: '#F44336'}}
//   title='Cancel' />


//
// const EditView = glamorous.view({flex: 1, backgroundColor: '#330033'})
// const TextInput = glamorous.view({
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     margin: 10,
//     padding: 5
//   })

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 5
  }
})

class DeckEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
   title: (navigation.state.params.method === 'add') ? "Add Deck" : "Edit Deck",
  })



  constructor(props){
    super(props)
    const {navigation} = this.props
    // const title =


    // navigation.setParams({ title })

    // setParams
    console.log(navigation.state.params)
  }
  state = {
    text: ''
  }
  okBtnPress = () =>{
    const { addDeck, navigation } = this.props
    addDeck(this.state.text).then(res=>{
      console.log("ADD Deck res", res, navigation)
      navigation.replace("Details",{id: res.deck.id})
      // this.props.navigation.dispatch(
      //   NavigationActions.replace({
      //     key:navigation.state.key,
      //     routeName: "Details",
      //     params: {id: res.deck.id}}))
    })
    // console.log(this.state)
  }
  render () {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Deck Name"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      <View style={{flexDirection:'row', padding: 10}}>
          <Button
            containerViewStyle={{flex:1, marginLeft: 0, marginRight: 0}}
            buttonStyle={{}}
            borderRadius={5}
            backgroundColor='#F44336'
            onPress={()=>{this.props.navigation.goBack()}}
            title='Cancel' />
          <Button
            containerViewStyle={{flex:1, marginLeft: 0, marginRight: 0}}
            buttonStyle={{margin: 1}}
            borderRadius={5}
            backgroundColor='#4CAF50'
            disabled={this.state.text === ''}
            onPress={this.okBtnPress}
            title='Ok' />
        </View>

      </View>
    )
  }
}

function mapStateToProps ({ cards, decks }) {
  return {
    decks: decks
  }
}
function mapDispatchToProps (dispatch) {
  return {
    initDecks: () => dispatch(initDecks()),
    addDeck: (data) => dispatch(addDeck(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckEdit)
