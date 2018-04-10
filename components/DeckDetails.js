import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, Alert} from 'react-native'
import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';


import { initDecks, deleteDeck } from 'actions'
// import HeaderBar from components/HeaderBar

const styles = StyleSheet.create({
  btnGroup:{
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: "row"
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
      <View style={{flex:1,
          height:500,}}>
        <Text h3>{deck.title}</Text>
        <Text h5>{`${deck.questions.length} question${deck.questions.length > 1 ? 's' : ''}`}</Text>
        <View style={styles.btnGroup}>
          {/*<TouchableOpacity
            onPress={this.promptDelete}
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Delete Deck</Text>
          </TouchableOpacity>*/}
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate("DeckForm",{deck})}}
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Edit Deck</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
              navigation.navigate("QuestionForm",{deck, index:null})}}
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Add Question</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.btnGroup}>

          <TouchableOpacity
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{backgroundColor: '#cccccc', flex: 1}}
          data={deck.questions}
          keyExtractor={(item,index)=>index}
          renderItem={({item, index})=>
            <ListItem
              title={item.question}
              subtitle={item.answer}
              onPress={()=>{
                navigation.navigate("QuestionForm",{deck, index})}}
              rightIcon={{
                color: '#86939e',
                fontSize: 12,
                name: 'edit' }}
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
