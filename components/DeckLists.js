import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Modal, Platform } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons';


import { getDecks } from 'actions'
// import {ADD_ICON} from 'components/SharedComponents'

// import HeaderBar from components/HeaderBar
// import {DeckListItem} from 'components/S'


class DeckLists extends Component {
  state = {
    modalVisible: false
  }
  static navigationOptions = ({ navigation }) => ({
   title: 'FlashCard App',
   headerRight: (<Icon
     style={{fontSize:20, padding: 10, color: '#000000'}}
     name='plus'
     type='simple-line-icon'
     onPress={()=>navigation.navigate('DeckForm',{deck:null})}
   />)
  })

  constructor(props){
    super(props)
    console.log(props)

    this.props.navigation.setParams({
      title: 'Udacity Flashcard',
    })

    this.props.getDecks().then(res=>{
      console.log(res)
    })
  }

  openModal = () => {

    this.setState({modalVisible:true})
    console.log(this.props)
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Modal
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            margin: 20
          }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{margin: 22, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: false});
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          style={{backgroundColor: '#eeeeee', flex: 1}}
          data={this.props.decks}
          keyExtractor={(item,idx)=>
            item.title
          }
          renderItem={({item})=>
            <ListItem
              title={item.title}
              subtitle={`${item.questions.length} question${item.questions.length > 1 ? 's' : ''}`}
              rightIcon={{
                style: { fontSize: 18 },
                name:'arrow-right',
                type:'simple-line-icon'}}
              onPress={ ()=> this.props.navigation.navigate("Details",{id: item.id}) }
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
