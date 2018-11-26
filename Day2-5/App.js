import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from "./ToDo";
import { Constants } from 'expo';

{/*4. Dimensions for width, height*/}
const {width, height} = Dimensions.get('window');

export default class App extends React.Component {

  // 6. create newTodo
  state ={
    newTodo : "" //currently it's blank for now
  }

  // 7. create _controlNewTodo function
  _controlNewTodo = text =>{
    //get 'text' from state 
    this.setState({
      newTodo : text //8. it gets text data from input -> give permission to input
    })
  }
  
  render() {
    //9. give newTodo to render
    const {newTodo}= this.state;
    return (
     
      <View style={styles.container}>
        {/* 1. import status bar*/}
        <StatusBar barStyle="light-content" /> 

        {/* 2. import kawai todo*/}
        <Text style={styles.text}>Hello</Text>

        {/* 3. create card for Todo lIst*/}
        <View style={styles.card}>
          <TextInput 
            style={styles.input}
            placeholder={"New To Do"}
            //9. start
            value={newTodo}
            onChangeText={this._controlNewTodo}
            //onChangeText : you can easily use it, without the hassle of going through event.target.value
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
            //9 end
          />

          {/*10. Displaying Todo list on ToDo.js -> 11.Create ToDo.js*/}
          {/*'contentContainerStyle' is the way to apply styles to its content*/}
          <ScrollView contentContainerStyle={styles.toDos}> 
            <ToDo />
          </ScrollView>
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
  },
  input:{
    padding:20,
    borderBottomColor:'#bbb',
    borderBottomWidth:1,
    fontSize:25
  },
  toDos:{
    alignItems:'center'
  }
});
