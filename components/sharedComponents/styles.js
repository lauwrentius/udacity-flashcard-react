import { StyleSheet } from 'react-native'

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
  panel:{
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 12,
    marginRight: 12,
    padding: 10,
    backgroundColor: '#cccccc'
  },
  panelText:{
    color: '#444444',
    fontSize: 12,
    fontWeight: "bold"
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
