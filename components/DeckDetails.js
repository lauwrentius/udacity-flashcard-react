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
    this.props.navigation.navigate('DeckEdit',{method:'edit'})
  }
  onDelete = () => {
    const { navigation, deleteDeck } = this.props
    console.log("D", navigation.state.params.id)
    return deleteDeck(navigation.state.params.id)
      .then(res=>navigation.replace("Home"))
  }
  promptDelete = () => {
    Alert.alert("Delete Deck", "Do you want to delete this deck?", [
      {text: 'Cancel', onPress: () => {}},
      {text: 'OK', onPress: () =>this.onDelete()},
    ],
    { cancelable: false })
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
        <Text h5>{`${deck.questions.length} questions`}</Text>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={this.promptDelete}
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Delete Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Edit Deck</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Add Question</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smBtn}>
            <Text style={styles.smBtnTxt}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{backgroundColor: '#eeeeee', flex: 1}}
          data={deck.questions}
          keyExtractor={(item,idx)=>idx}
          renderItem={({item})=>
            <ListItem
              title={item.question}
              subtitle={item.answer}
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
