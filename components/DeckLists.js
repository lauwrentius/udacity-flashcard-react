import React, { Component } from 'react';
import { connect } from 'react-redux'

import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, Modal, Platform } from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';


import { getDecks } from 'actions'
// import HeaderBar from components/HeaderBar
// import {DeckListItem} from 'components/S'

const addIcon = (Platform.OS === 'ios')? 'ios-add' : 'md-add'

class DeckLists extends Component {
  state = {
    modalVisible: false
  }
  static navigationOptions = ({ navigation }) => ({
   title: 'FlashCard App',
   headerRight: (<Icon
     style={{fontSize:26, padding: 10, color: '#ffffff'}}
     name={addIcon}
     onPress={()=>navigation.navigate('DeckForm',{deck:null})}
   />)
  })

  constructor(props){
    super(props)
    console.log(props)

    this.props.navigation.setParams({
      title: 'Udacity Flashcard',
      // rightNav: (()=>{
      //   navigation.navigate('DeckEdit',{title: item.title})
      // })
    })

    this.props.getDecks().then(res=>{
      console.log(res)
    })
  }

  openModal = () => {
    // console.log("ASDASD", this.props)
    // this.props.initDecks()
    // getDecks().then(res=>{
    //   console.log(res)
    // })\
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

        {<FlatList
          style={{backgroundColor: '#eeeeee', flex: 1}}
          data={this.props.decks}
          keyExtractor={(item,idx)=>
            item.title
          }
          renderItem={({item})=>
            <ListItem
              title={item.title}
              subtitle={`${item.questions.length} questions`}
              onPress={ ()=> this.props.navigation.navigate("Details",{id: item.id}) }
            />
          }
        />}
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
