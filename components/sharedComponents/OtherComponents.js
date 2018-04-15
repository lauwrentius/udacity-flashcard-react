import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

import {styles} from './styles'

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
export const QuestionBox = props =>(
  <View style={styles.panel}>
    <Text style={styles.panelText}>
      {props.label}
    </Text>
    <Text>
      {props.text}
    </Text>
  </View>
)
