import React, { Component } from 'react'

import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform, alert } from 'react-native'

import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons'



import { editDeck, addDeck, initDecks, addQuestion, editQuestion, deleteQuestion } from 'actions'


class QuestionForm extends Component {
  state = {
    question: "",
    answer: ""
  }
  componentDidMount(){
    const {deck, index} = this.props.navigation.state.params
    console.log(this.props)
    if(index !== null)
      this.setState({question:deck.questions[index]['question'],
        answer:deck.questions[index]['answer']})
  }
  onEditQuestion = () =>{
    const {navigation} = this.props
    const {deck, index} = navigation.state.params
    const {question,answer} = this.state

    this.props.editQuestion(deck, {question,answer},index).then(res=>{
      navigation.goBack()
    })
  }
  onAddQuestion = (addAnother) => {
    const {navigation} = this.props
    const {deck} = navigation.state.params
    const {question,answer} = this.state

    this.props.addQuestion(deck, {question,answer}).then(res=>{
      if(addAnother)
        this.setState({question:"", answer: ""})
      else
        navigation.goBack()
    })
  }
  onDeleteQuestion = () => {
    const {navigation} = this.props
    const {deck, index} = navigation.state.params
    this.props.deleteQuestion(deck, index).then(res=>{
      navigation.goBack()
    })
  }

  render(){
    const {navigation} = this.props
    const {question, answer} = this.state
    const {index} = navigation.state.params
    const btnConfirm = (index === null) ? this.onAddDeck : this.onEditDeck

    return (<View>
        <TextInput
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={question}
        />
        <TextInput
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={answer}
        />
        <TouchableOpacity
          onPress={()=>navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        {index !== null ? (
            <TouchableOpacity
              onPress={()=>this.onEditQuestion(false)}
              disabled={question === '' && answer === ''}>
              <Text>Edit Question</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={()=>this.onAddQuestion(false)}
              disabled={question === '' && answer === ''}>
              <Text>Add Question</Text>
            </TouchableOpacity>
          )}

        {index !== null ? (
            <TouchableOpacity
              onPress={()=>this.onDeleteQuestion()}>
              <Text>Delete question</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={()=>this.onAddQuestion(true)}>
              <Text>Add another question</Text>
            </TouchableOpacity>
          )}
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
    addQuestion: (deck, question) => dispatch(addQuestion(deck, question)),
    editQuestion: (deck, question, index) =>
      dispatch(editQuestion(deck, question, index)),
    deleteQuestion: (deck,index) => dispatch(deleteQuestion(deck,index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm)
