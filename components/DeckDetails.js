import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


import { initDecks } from 'actions'
// import HeaderBar from components/HeaderBar


class DeckDetails extends Component {
  constructor(props){
    super(props)
    console.log(this.props.navigation.state.params)
  }
  btnGroupsPress = (index) =>{
    console.log(index)
  }

  render () {
    const { navigation, decks } = this.props
    const buttons = ['Edit Deck', 'Add Questions']

    const deck = decks[navigation.state.params.title]

    return (
      <View style={{flex:1, backgroundColor: '#cc0000'}}>
        <Text h3>{deck.title}</Text>
        <Text h5>{`${deck.questions.length} questions`}</Text>
        <ButtonGroup
          buttons={buttons}
          onPress={this.btnGroupsPress}
        />
        <Button
          title='Start Quiz'
        />
        <FlatList
          style={{backgroundColor: '#eeeeee', flex: 1}}
          data={deck}
          keyExtractor={(item,idx)=>idx}
          renderItem={({item})=>
            <ListItem
              title={item.question}
              subtitle={item.answer}
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
    initDecks: () => dispatch(initDecks())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails)
