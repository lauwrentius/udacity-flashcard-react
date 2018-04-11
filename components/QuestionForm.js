import React, { Component } from 'react'

import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform, alert } from 'react-native'

import { FormLabel, FormInput, ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons'



import { addQuestion, editQuestion, deleteQuestion } from 'actions'

import {ButtonDelete, ButtonAdd,ButtonEdit,ButtonCancel,GroupButton, Forms} from 'components/SharedComponents'

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

    return (<View style={{paddingTop: 15}}>
      <Forms
        label="Question"
        placeholder="Plese enter a question"
        onChangeText={(question) => this.setState({question})}
        value={question}
      />
      <Forms
        label="Answer"
        placeholder="Plese enter an answer"
        onChangeText={(answer) => this.setState({answer})}
        value={answer}
      />
      <GroupButton>
        <ButtonCancel
          onPress={()=>navigation.goBack()}
          title="Cancel"
        />
        {index !== null ? (
          <ButtonEdit
            onPress={()=>navigation.goBack()}
            title="Edit question"
          />
        ):(
          <ButtonAdd
            onPress={()=>navigation.goBack()}
            disabled={question==='' || answer==='' }
            title="Add question"
          />
        )}
      </GroupButton>
      <GroupButton>
        {index !== null ? (
          <ButtonDelete
            onPress={()=>this.onDeleteQuestion()}
            title="Delete question"
          />
        ):(
          <ButtonAdd
            disabled={question==='' || answer==='' }
            onPress={()=>this.onAddQuestion(true)}
            title="Add another question"
          />
        )}
      </GroupButton>
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
