import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { ButtonDelete, ButtonAdd, ButtonEdit, ButtonCancel, GroupButton, Forms } from 'components/sharedComponents'
import { editDeck, addDeck, deleteDeck } from 'actions'

/**
* @description DeckForm Class. This class handles editing (and deleting) of exsisting decks as well as creating a new deck.
*/
class DeckForm extends Component {
  state = {
    text: ''
  }
  static navigationOptions = ({ navigation }) => ({
   title: (navigation.state.params.deck === null) ? "Add Deck" : "Edit Deck",
   headerLeft: (<Icon
     style={{fontSize:20, padding: 10, color: '#000000'}}
     name='arrow-left'
     type='simple-line-icon'
     onPress={()=>navigation.goBack()}
   />)
  })
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
    const { editDeck, navigation } = this.props
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

    return (<View style={{paddingTop: 15}}>
        <Forms
          label="Deck"
          placeholder="Enter a deck name"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <GroupButton>
          <ButtonCancel
            onPress={()=>{navigation.goBack()}}
            title='Cancel'
          />
          <ButtonAdd
            disabled={this.state.text === ''}
            onPress={btnConfirm}
            title='Ok'
          />
        </GroupButton>
        {deck !== null &&
          <GroupButton>
          <ButtonDelete
            onPress={this.promptDelete}
            title='Delete Deck'
          />
          </GroupButton>
        }
      </View>)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addDeck: (title) => dispatch(addDeck(title)),
    editDeck: (deck) => dispatch(editDeck(deck)),
    deleteDeck: (deck) => dispatch(deleteDeck(deck))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeckForm)
