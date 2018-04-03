import React, { Component } from 'react'

import { connect } from 'react-redux'

import { StyleSheet,  View, TouchableOpacity, FlatList, StatusBar, TextInput } from 'react-native'

import { ButtonGroup, Button, Text, ListItem, Header } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import Icon from 'react-native-vector-icons/Ionicons'


import { initDecks } from 'actions'
// import HeaderBar from components/HeaderBar


class DeckEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
   title: (navigation.state.params.method === 'add') ? "Add Deck" : "Edit Deck",
   headerRight: (<Icon
     style={{fontSize:26, padding: 10, color: '#ffffff'}}
     name='ios-add'
     onPress={()=>{console.log(navigation)}}
   />)
  })
  constructor(props){
    super(props)
    const {navigation} = this.props
    // const title =


    // navigation.setParams({ title })

    // setParams
    console.log(navigation.state.params)
  }
  state = {
    text: ''
  }
  render () {
    const a = 10
    return (
      <View style={{flex:1}}>
        <TextInput
          placeholder="Deck Name"
          style={{height: 40, borderColor: 'gray', borderWidth: 1,
            borderRadius: 5,
            margin: 10,
            padding: 5
          }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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
)(DeckEdit)
