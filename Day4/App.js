import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, TextInput, Dimensions, Platform, ScrollView }
from 'react-native';
import ToDo from "./ToDo";

const {height, width} = Dimensions.get("window");

export default class App extends React.Component {
    
  state={
    newTodo : ""
  }

  render(){
        return(
            <View style={Styles.container}>
                <StatusBar barStyle="Light-content" />
                <Text style={styles.title}> Kawai To Do </Text>

                <View style={styles.card} >
                    <TextInput 
                      style={styles.input}
                      placeholder={"New to do"}
                      value={newTodo}
                      onChangeText={this._controlNewTodo}
                      placeholderTextColor={"#999"}
                      returnKeyType={"done"}
                      autoCorrect={false}
                    />

                    <ScrollView contentContainerStyle={styles.toDos}>
                    {/* contentContainerStyle is the way to apply styles to its content */}
                      <ToDo />
                    </ScrollView>
                </View>
            </View>
        );
    }

    _controlNewTodo = text => {
      //get the text from event
      this.setState({
        newTodo:text
      })
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor : '#F23657',
        alignItem : 'center'
    },
    title:{
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
        borderTopRightRadius :10,

        ...Platform.select({
            ios:{
                shadowColor:"rgb(50,50,50)",
                shadowOpacity : 0.5,
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
        alignItem:"center"
    }
});
