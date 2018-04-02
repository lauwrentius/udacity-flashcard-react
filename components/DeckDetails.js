import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { ListItem, Header } from 'react-native-elements'


import { initDecks } from 'actions'
// import HeaderBar from components/HeaderBar


class DeckLists extends Component {
  constructor(props){
    super(props)

    this.props.initDecks()
  }
  loadDeck = () => {
    // console.log(this.props)
    // this.props.initDecks()
    this.props.getDecks().then(res=>{
      console.log(res)
    })
  }

  render () {
    return (
      <View>
        <Text>DECK Details</Text>
      </View>
    )
  }
}

function mapStateToProps ({ cards, decks }) {
  return {
    decks: Object.values(decks)
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
)(FlashCard)
