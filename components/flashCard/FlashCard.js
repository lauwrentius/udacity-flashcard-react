import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';


import { initDecks } from 'actions'


class FlashCard extends Component {
  // constructor(props){
  //   super(props)
  //
  //   // initDeck()
  // }
  loadDeck = () => {
    console.log(this.props)
    this.props.initDecks()
    // getDecks().then(res=>{
    //   console.log(res)
    // })
  }
  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.loadDeck}>
          <Text>load</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.decks}
          keyExtractor={(item,idx)=>
            item.title
          }
          renderItem={({item})=>
              <Text>{item.title}</Text>
          }
        />
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
