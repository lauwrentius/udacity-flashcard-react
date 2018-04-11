import React, { Component } from 'react'
import { StyleSheet,View } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'


const style = StyleSheet.create({
  button:{
    marginLeft: 0,
    marginRight: 0,
    flex:1
  },
  disabledText:{
    color: "#aaaaaa"
  },
  formContainer:{
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 15,
  },
  formItems:{
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  groupButton:{
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 5,
    flexDirection: "row",
  }
})

export const Forms = props =>(
  <View style={style.formContainer}>
    <FormLabel
      labelStyle={style.formItems}>
      {props.label}
    </FormLabel>
    <FormInput
      containerStyle={style.formItems}
      {...props}
    />
  </View>
)
export const GroupButton = props =>(
  <View style={style.groupButton}>
    {props.children}
  </View>
)
export const ButtonEdit = props => (
  <Button
    backgroundColor = '#8BC34A'
    color = '#000000'
    containerViewStyle={style.button}
    icon={{name:'pencil', type:'simple-line-icon', color: '#000000'}}
    {...props}
  />
)
export const ButtonAdd = props => (
  <Button
    {...props}
    backgroundColor = '#2196F3'
    color = '#000000'
    containerViewStyle={style.button}
    disabledTextStyle={style.disabledText}
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
    containerViewStyle={style.button}
    icon={{name:'action-undo', type:'simple-line-icon', color: '#000000'}}
  />
)
export const ButtonDelete = props => (
  <Button
    {...props}
    backgroundColor = '#F44336'
    color = '#ffffff'
    containerViewStyle={style.button}
    icon={{name:'trash', type:'simple-line-icon', color: '#ffffff'}}
  />
)
export const ButtonQuiz = props => (
  <Button
    {...props}
    backgroundColor = '#FFC107'
    color = '#000000'
    containerViewStyle={style.button}
    disabledTextStyle={style.disabledText}
    icon={{name:'energy',
      type:'simple-line-icon',
      color: (props.disabled?'#aaaaaa':'#000000')
    }}
  />
)
export const ButtonCorrect = props => (
  <Button
    {...props}
    backgroundColor = '#8BC34A'
    color = '#000000'
    containerViewStyle={style.button}
    icon={{name:'check', type:'simple-line-icon', color: '#000000'}}
  />
)
export const ButtonIncorrect = props => (
  <Button
    {...props}    
    backgroundColor = '#F44336'
    color = '#ffffff'
    containerViewStyle={style.button}
    icon={{name:'close', type:'simple-line-icon', color: '#ffffff'}}
  />
)
// onPress={()=>{
//   navigation.navigate("DeckForm",{deck})}}
// title='Edit Deck'
