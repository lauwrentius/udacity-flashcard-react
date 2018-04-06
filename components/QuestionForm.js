import React, { Component } from 'react'

import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform } from 'react-native'

import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons'



import { editDeck, addDeck, initDecks, addQuestion } from 'actions'


class QuestionForm extends Component {
  state = {
    question: "",
    answer: ""
  }
  onAddQuestion = ()=>{
    const {deck} = this.props.navigation.state.params
    const {question,answer} = this.state
    console.log("ADDD")
    this.props.addQuestion(deck, {question,answer})
  }

  render(){
    const {navigation} = this.props

    console.log(navigation)

    return (<View>
        <TextInput
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <TextInput
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity
          onPress={()=>navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onAddQuestion}>
          <Text>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity><Text>Add another question</Text></TouchableOpacity>
      </View>)
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
    addQuestion: (deck, question) => dispatch(addQuestion(deck, question))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm)
