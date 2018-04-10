import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput, Platform, alert } from 'react-native'

class Quiz extends Component {

  render(){
    return(
      <View>Quiz Section</View>
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
