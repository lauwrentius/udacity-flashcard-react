import React, { Component } from 'react'
import { StyleSheet,View } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  padding: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleText:{
    color: '#333333',
    fontSize: 26,
    lineHeight: 32,
    marginTop:5,
    marginBottom: 10
  },
  boxText:{
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: "100",
    lineHeight: 26,
  },
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
  formInput:{
    color: '#222222'
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
  <View style={styles.formContainer}>
    <FormLabel
      labelStyle={styles.formItems}>
      {props.label}
    </FormLabel>
    <FormInput
      containerStyle={styles.formItems}
      inputStyle={styles.formInput}
      {...props}
    />
  </View>
)
export const GroupButton = props =>(
  <View style={styles.groupButton}>
    {props.children}
  </View>
)
export const ButtonEdit = props => (
  <Button
    backgroundColor = '#8BC34A'
    color = '#000000'
    containerViewStyle={styles.button}
    icon={{name:'pencil', type:'simple-line-icon', color: '#000000'}}
    {...props}
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
    icon={{name:'trash', type:'simple-line-icon', color: '#ffffff'}}
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
export const ButtonCorrect = props => (
  <Button
    {...props}
    backgroundColor = '#8BC34A'
    color = '#000000'
    containerViewStyle={styles.button}
    icon={{name:'check', type:'simple-line-icon', color: '#000000'}}
  />
)
export const ButtonIncorrect = props => (
  <Button
    {...props}
    backgroundColor = '#F44336'
    color = '#ffffff'
    containerViewStyle={styles.button}
    icon={{name:'close', type:'simple-line-icon', color: '#ffffff'}}
  />
)
// onPress={()=>{
//   navigation.navigate("DeckForm",{deck})}}
// title='Edit Deck'
