import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet,  View, Text, TouchableOpacity, FlatList, StatusBar, Alert} from 'react-native'
import { ButtonGroup, Button, ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

import glamorous, {ThemeProvider} from 'glamorous-native'


import {GroupButton,ButtonQuiz,ButtonEdit,ButtonAdd} from 'components/SharedComponents'

import { initDecks, deleteDeck } from 'actions'
// import HeaderBar from components/HeaderBar
const style = StyleSheet.create({
  textStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  button:{
    marginLeft: 0,
    marginRight: 0,
    flex:1
  }

})
const DeckDetailsView = glamorous.view({
  flex: 1
})
const TitleText = glamorous.text(
  {color: '#333333', fontSize: 26, lineHeight: 32, marginTop:5, marginBottom: 10},
  style.textStyle
)
const BoxText = glamorous.text(
  {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: "100",
    lineHeight: 26,
  },
  style.textStyle
)
const ButtonGroupView = glamorous.view({
  paddingRight: 10,
  paddingLeft: 10,
  paddingTop: 0,
  paddingBottom: 5,
  flexDirection: "row",
})
const styles = StyleSheet.create({
  btnGroup:{

  },
  smBtn:{
    backgroundColor: "#333333",
    padding: 10,
    margin: 5,
    flex: 1,
  },
  smBtnTxt:{
    textAlign: "center",
    color: "white"
  }

})

class DeckDetails extends Component {
  constructor(props){
    super(props)
  }
  btnGroupsPress = (index) =>{
    this.props.navigation.navigate('DeckForm',{method:'edit'})
  }

  render () {
    const { navigation, decks } = this.props
    const buttons = ['Edit Deck', 'Add Questions']
    const deck = decks[navigation.state.params.id]

    if(!deck)
      return <View></View>

    return (
      <DeckDetailsView>
        <TitleText>{deck.title}</TitleText>
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
        <ButtonGroupView>
          <ButtonQuiz
            onPress={()=>{navigation.navigate("Quiz",{deck})}}
            disabled={(deck.questions.length===0)}
            title='Start Quiz'
          />
        </ButtonGroupView>
        <BoxText>
          {`${deck.questions.length} Question${deck.questions.length > 1 ? 's' : ''}`}
        </BoxText>
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
      </DeckDetailsView>
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
    deleteDeck: (data) => dispatch(deleteDeck(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails)
