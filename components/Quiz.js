import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform, alert, Animated } from 'react-native'
import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { styles, GroupButton, ButtonCancel, ButtonQuiz, ButtonEdit, ButtonDelete, QuestionBox } from 'components/sharedComponents'
import API from 'utils/api'

/**
* @description Quiz Class. This class handles the quiz section of the app.
* It iterates through all of the questions on the specific deck and also displays the final score to the users.
*/
class Quiz extends Component {
  state = {
    index:0,
    score:0,
    fade: new Animated.Value(0)
  }
  static navigationOptions = ({ navigation }) => ({
   title: 'Quiz',
   headerLeft: (<Icon
     style={{fontSize:20, padding: 10, color: '#000000'}}
     name='arrow-left'
     type='simple-line-icon'
     onPress={()=>navigation.goBack()}
   />)
  })
  constructor(props){
    super(props)
    API.clearLocalNotification().then(()=>{
      API.setLocalNotification()
    })
  }
  displayAnswer = () => {
    const {fade} = this.state
    Animated.sequence([
      Animated.timing(fade, { duration: 300, toValue: 1}),
    ]).start()
  }

  onAnswer = (isCorrect) => {
    const {score, index, fade} = this.state
    fade.setValue(0)
    this.setState({
      index: index+1,
      score: (isCorrect)?score+1:score,
    })
  }

  restartQuiz = () => {
    this.state.fade.setValue(0)
    this.setState({ index: 0, score: 0 })
  }

  render(){
    const {navigation} = this.props
    const {index,fade,score} = this.state
    const {deck} = navigation.state.params

    if(index===deck.questions.length){
      const grade = Math.round((score/deck.questions.length*100))
      return(
        <View>
          <Text style={[styles.titleText, styles.padding]}>
            {`Your score: ${grade}%`}
          </Text>
          <GroupButton>
            <ButtonCancel
              onPress={()=>navigation.goBack()}
              title="Back to deck"
            />
            <ButtonQuiz
              onPress={this.restartQuiz}
              title="Restart quiz"
            />
          </GroupButton>
        </View>
      )
    }

    return(<View style={styles.container}>
        <Text style={[styles.boxText, styles.padding,
          {textAlign: "right"}]}>
          {`Question ${index+1}/${deck.questions.length}`}
        </Text>
        <QuestionBox
          label="Question:"
          text={deck.questions[index].question}
        />
        <Animated.View
          style={{opacity: fade,flex:1}}>
          <QuestionBox
            label="Answer:"
            text={deck.questions[index].answer}
          />
        </Animated.View>
        <GroupButton>
          <ButtonQuiz
            onPress={this.displayAnswer}
            title="Show answer"
          />
        </GroupButton>
        <GroupButton>
          <ButtonDelete
            iconName="close"
            onPress={()=>this.onAnswer(false)}
            title="Incorrect"/>
          <ButtonEdit
            iconName="check"
            onPress={()=>this.onAnswer(true)}
            title="Correct"/>
        </GroupButton>
      </View>
    )
  }
}

function mapStateToProps ({ cards, decks }) {
  return {
    decks: decks
  }
}

export default connect(
  mapStateToProps,
  null
)(Quiz)
