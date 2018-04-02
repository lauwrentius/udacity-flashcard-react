import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { ListItem, Header } from 'react-native-elements'


import { getDecks } from 'actions'
// import HeaderBar from components/HeaderBar


class DeckLists extends Component {
  constructor(props){
    super(props)
    this.props.getDecks().then(res=>{
      console.log(res)
    })
  }

  loadDeck = () => {
    // console.log("ASDASD", this.props)
    // this.props.initDecks()
    // getDecks().then(res=>{
    //   console.log(res)
    // })\
    console.log(this.props)
  }
  listItems

  render () {
    return (
      <View>
        <FlatList
          style={{backgroundColor: '#cc00cc', flexGrow: 1}}
          data={this.props.decks}
          keyExtractor={(item,idx)=>
            item.title
          }
          renderItem={({item})=>
            <ListItem
              title={item.title}
              subtitle={`${item.questions.length} questions`}
              onPress={ this.loadDeck }
            />
          }
        />
      </View>
    )
  }
}

function mapStateToProps ({ decks }) {
  return {
    decks: Object.values(decks)
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getDecks: () => dispatch(getDecks())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckLists)
