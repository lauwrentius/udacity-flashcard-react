import React, { Component } from 'react';
import { connect } from 'react-redux'

import { View, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons';


import {styles,GroupButton,ButtonQuiz,ButtonEdit,ButtonAdd} from 'components/SharedComponents'

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
   title: 'Deck Info',
   headerLeft: (<Icon
     style={{fontSize:20, padding: 10, color: '#000000'}}
     name='arrow-left'
     type='simple-line-icon'
     onPress={()=>navigation.goBack()}
   />)
  })

  render () {
    const { navigation, decks } = this.props
    const {deck} = navigation.state.params

    // if(!deck)
    //   return <View></View>

    return (
      <View style={styles.container}>
        <Text style={[styles.titleText, styles.padding]}>
          {deck.title}
        </Text>
        <GroupButton>
          <ButtonEdit
            onPress={()=>{
              navigation.navigate("DeckForm",{deck})}}
            title='Edit Deck'
          />
          <ButtonAdd
            onPress={()=>{
              navigation.navigate("QuestionForm",{deck, index:null})}}
            title='Add Question'
          />
        </GroupButton>
        <GroupButton>
          <ButtonQuiz
            onPress={()=>{navigation.navigate("Quiz",{deck})}}
            disabled={(deck.questions.length===0)}
            title='Start Quiz'
          />
        </GroupButton>
        <Text style={[styles.boxText, styles.padding]}>
          {`${deck.questions.length} Question${deck.questions.length > 1 ? 's' : ''}`}
        </Text>
        <FlatList
          style={{backgroundColor: '#e0e0e0', flex: 1}}
          data={deck.questions}
          keyExtractor={(item,index)=>index}
          renderItem={({item, index})=>
            <ListItem
              title={item.question}
              subtitle={item.answer}
              onPress={()=>{
                navigation.navigate("QuestionForm",{deck, index})}}
              rightIcon={{
                style: { fontSize: 18 },
                name: 'pencil',
                type: 'simple-line-icon' }}
            />
          }
        />
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
)(DeckDetails)
