import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Header } from 'react-native-elements'


export default class HeaderBar extends Component {
  render() {
    return (
      <View>
        <View style={{backgroundColor: '#01579B'}}>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor='#01579B'
            translucent
            barStyle='light-content'
          ></StatusBar>
        </View>
        <Header
          backgroundColor={'#0288D1'}
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Udacity Flashcard', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
      </View>
    )
  }
}
