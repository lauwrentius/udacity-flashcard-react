import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { getDecks } from 'actions'
import { styles } from 'components/sharedComponents'

/**
* @description DeckForm Lists Class. This class is the starting home for the apps. It lists all of the avaiable decks.
*/
class DeckLists extends Component {
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
    this.props.getDecks()
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          style={{backgroundColor: '#eeeeee', flex: 1}}
          data={this.props.decks}
          keyExtractor={item=>item.id}
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
