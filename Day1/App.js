import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';

{/*4. Dimensions for width, height*/}
const {width, height} = Dimensions.get('window');

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* 1. import status bar*/}
        <StatusBar barStyle="light-content" /> 

        {/* 2. import kawai todo*/}
        <Text style={styles.text}>Hello</Text>

        {/* 3. create card for Todo lIst*/}
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={"New To Do"}  />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F23657',
    alignItems:'center'
  },
  text:{
    color:'white',
    fontSize:20,
    marginTop:50,
    fontWeight:400,
    marginBottom:30
  },
  card:{
    backgroundColor:'white',
    flex:1,
    width:width-25,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    //5. Shadow effect - import Platform
    ...Platform.select({
      ios:{
        shadowColor:"rgb(50,50,50)",
        shadowOpacity:0.5,
        shadowRadius :5,
        shadowOffsets:{
          height:-1,
          width:0
        },
      android:{
        elevation:4
        }  
      }
    })
  }
});
