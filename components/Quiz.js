import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform, alert, Animated } from 'react-native'
import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import { GroupButton, ButtonQuiz, ButtonCorrect, ButtonIncorrect } from 'components/SharedComponents'
class Quiz extends Component {
  state = {
    index:0,
    score:0,
    fade: new Animated.Value(0)
  }
  displayAnswer = () => {
    const {fade} = this.state
    Animated.sequence([
      Animated.timing(fade, { duration: 300, toValue: 1}),
    ]).start()
  }
  onAnswer = (isCorrect) => {
    const {score, index, fade} = this.state
    // console.log(fade)
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
          <Text>{`Your score: ${grade}%`}</Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity
              onPress={this.restartQuiz}>
              <Text>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>navigation.goBack()}>
              <Text>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return(<View>
        <Text>Quiz Section</Text>
        <Text>{`${index+1}/${deck.questions.length}`}</Text>
        <Text>{deck.questions[index].question}</Text>
        <Animated.View
          style={{opacity: fade}}>
          <View>
            <Text>{deck.questions[index].answer}</Text>
          </View>
        </Animated.View>
        <GroupButton>
          <ButtonQuiz
            onPress={this.displayAnswer}
            title="Show answer"
          />
        </GroupButton>
        <GroupButton>
          <ButtonIncorrect
            onPress={()=>this.onAnswer(false)}
            title="Incorrect"/>
          <ButtonCorrect
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
function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)
