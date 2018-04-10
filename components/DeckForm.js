import React, { Component } from 'react'

import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform,Alert } from 'react-native'

import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons'



import { editDeck, addDeck, initDecks, deleteDeck } from 'actions'


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

class DeckForm extends Component {
  static navigationOptions = ({ navigation }) => ({
   title: (navigation.state.params.id === null) ? "Add Deck" : "Edit Deck",
  })
  state = {
    text: ''
  }


  constructor(props){
    super(props)
    // const title =

    // console.log("M",navigation.state.params.method)
    // navigation.setParams({ title })

    // setParams
    // console.log(navigation.state.params)

    //   decks
  }
  componentDidMount(){
    const {deck} = this.props.navigation.state.params

    if(deck !== null)
      this.setState({text:deck.title})
  }

  onAddDeck = () =>{
    const { addDeck, navigation } = this.props
    const {deck} = navigation.state.params

    addDeck(this.state.text).then(res=>{
      navigation.dispatch(NavigationActions.replace({
        key: navigation.state.key,
        routeName: "Details",
        params: {id: res.deck.id}
      }))
    })
  }
  onEditDeck = () =>{
    const { decks, editDeck, navigation } = this.props
    const {deck} = navigation.state.params

    editDeck(Object.assign(deck,
      {title:this.state.text})).then(res=>
        navigation.goBack())
  }
  onDelete = () => {
    const { navigation, deleteDeck } = this.props
    const {deck} = navigation.state.params
    deleteDeck(deck).then(res=>{
      navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName:"Home"})],
      }))
    })
  }
  promptDelete = () => {
    Alert.alert("Delete Deck", "Do you want to delete this deck?", [
      {text: 'Cancel', onPress: () => {}},
      {text: 'OK', onPress: () => this.onDelete()},
    ])
  }

  render () {
    const {navigation} = this.props
    const {deck} = navigation.state.params
    const btnConfirm = (deck === null) ? this.onAddDeck : this.onEditDeck

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
            onPress={()=>{navigation.goBack()}}
            title='Cancel' />
          <Button
            containerViewStyle={{flex:1, marginLeft: 0, marginRight: 0}}
            buttonStyle={{margin: 1}}
            borderRadius={5}
            backgroundColor='#4CAF50'
            disabled={this.state.text === ''}
            onPress={btnConfirm}
            title='Ok' />
        </View>
        {deck !== null &&
          <Button
            containerViewStyle={{flex:1, marginLeft: 0, marginRight: 0}}
            buttonStyle={{margin: 1}}
            borderRadius={5}
            backgroundColor='#4CAF50'
            disabled={this.state.text === ''}
            onPress={this.promptDelete}
            title='Delete' />
        }
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
    addDeck: (data) => dispatch(addDeck(data)),
    editDeck: (data) => dispatch(editDeck(data)),
    deleteDeck: (data) => dispatch(deleteDeck(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckForm)
