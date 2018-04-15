import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { addQuestion, editQuestion, deleteQuestion } from 'actions'
import { ButtonDelete, ButtonAdd, ButtonEdit, ButtonCancel, GroupButton, Forms } from 'components/sharedComponents'

/**
* @description QuestionForm Class. This class handles editing (and deleting) of exsisting question for a specific deck.
* It also handles adding a new questions.
*/
class QuestionForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params.index === null) ? "Add Question" : "Edit Question",
    headerLeft: (<Icon
      style={{fontSize:20, padding: 10, color: '#000000'}}
      name='arrow-left'
      type='simple-line-icon'
      onPress={()=>navigation.goBack()}
    />)
  })

  state = {
    question: "",
    answer: ""
  }
  componentDidMount(){
    const { deck, index } = this.props.navigation.state.params
    console.log(this.props)
    if(index !== null)
      this.setState({question:deck.questions[index]['question'],
        answer:deck.questions[index]['answer']})
  }
  onEditQuestion = () =>{
    const { navigation } = this.props
    const { deck, index } = navigation.state.params
    const { question,answer } = this.state

    this.props.editQuestion(deck, {question,answer},index).then(res=>{
      navigation.goBack()
    })
  }
  onAddQuestion = (addAnother) => {
    const { navigation } = this.props
    const { deck } = navigation.state.params
    const { question,answer } = this.state

    this.props.addQuestion(deck, {question,answer}).then(res=>{
      console.log("THEN",res)
      if(addAnother)
        this.setState({question:"", answer: ""})
      else
        navigation.goBack()
    })
  }
  onDeleteQuestion = () => {
    const { navigation } = this.props
    const { deck, index } = navigation.state.params
    this.props.deleteQuestion(deck, index).then(res=>{
      navigation.goBack()
    })
  }
  promptDelete = () => {
    Alert.alert("Delete Question", "Do you want to delete this question?", [
      {text: 'Cancel', onPress: () => {}},
      {text: 'OK', onPress: () => this.onDeleteQuestion()},
    ])
  }
  render(){
    const { navigation } = this.props
    const { question, answer } = this.state
    const { index } = navigation.state.params
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
            onPress={()=>this.onEditQuestion()}
            title="Edit question"
          />
        ):(
          <ButtonAdd
            onPress={()=>this.onAddQuestion(false)}
            disabled={question==='' || answer==='' }
            title="Add question"
          />
        )}
      </GroupButton>
      <GroupButton>
        {index !== null ? (
          <ButtonDelete
            onPress={this.promptDelete}
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

function mapDispatchToProps (dispatch) {
  return {
    addQuestion: (deck, question) => dispatch(addQuestion(deck, question)),
    editQuestion: (deck, question, index) =>
      dispatch(editQuestion(deck, question, index)),
    deleteQuestion: (deck,index) => dispatch(deleteQuestion(deck,index))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(QuestionForm)
