import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

import {styles} from './styles'

export const GroupButton = props =>(
  <View style={styles.groupButton}>
    {props.children}
  </View>
)
export const ButtonEdit = props => (
  <Button
    {...props}
    backgroundColor = '#8BC34A'
    color = '#000000'
    containerViewStyle={styles.button}
    icon={{
      name:(props.iconName === undefined)?'pencil':props.iconName,
      type:'simple-line-icon',
      color: '#000000'}}
  />
)
export const ButtonAdd = props => (
  <Button
    {...props}
    backgroundColor = '#2196F3'
    color = '#000000'
    containerViewStyle={styles.button}
    disabledTextStyle={styles.disabledText}
    icon={{name:'plus',
      type:'simple-line-icon',
      color: (props.disabled?'#aaaaaa':'#000000')
    }}
  />
)
export const ButtonCancel = props => (
  <Button
    {...props}
    backgroundColor = '#9E9E9E'
    color = '#000000'
    containerViewStyle={styles.button}
    icon={{name:'action-undo', type:'simple-line-icon', color: '#000000'}}
  />
)
export const ButtonDelete = props => (
  <Button
    {...props}
    backgroundColor = '#F44336'
    color = '#ffffff'
    containerViewStyle={styles.button}
    icon={{
      name:(props.iconName === undefined)?'trash':props.iconName,
      type:'simple-line-icon',
      color: '#ffffff'}}
  />
)
export const ButtonQuiz = props => (
  <Button
    {...props}
    backgroundColor = '#FFC107'
    color = '#000000'
    containerViewStyle={styles.button}
    disabledTextStyle={styles.disabledText}
    icon={{name:'energy',
      type:'simple-line-icon',
      color: (props.disabled?'#aaaaaa':'#000000')
    }}
  />
)
