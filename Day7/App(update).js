import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from "./ToDo";
import { Constants } from 'expo';
import {AppLoading} from "expo"; //17-1: import AppLoading
import uuidv1 from "uuid/v1"; //19-2 : import uuidv1
{/*4. Dimensions for width, height*/}
const {width, height} = Dimensions.get('window');

export default class App extends React.Component {

  // 6. create newTodo
  state ={
    newTodo : "", //currently it's blank for now
    loadedToDos : false, // 17-2. State loadedToDos
    toDos :{} //20-1 : create toDos{}
  }

  //17-4 : when componentDidMount, executing _loadToDos() => 17-5.Create _loadToDos
  componentDidMount =()=>{
    this._loadToDos();
  }
  //17-5:create _loadToDos()
  //When after 'componentDidMount' change loadedToDos state as 'true'
  _loadToDos = ()=>{
    this.setState({
      loadedToDos:true
    })
  }

  //18-2 : create _addToDo
  _addToDo =()=>{
    const{newToDo} = this.state;
    
    if(newToDo !== ""){
      
      
      //19-1 : Todo List = previous todo list + newly created todo list
      this.setState(prevState =>{
        //toDos : prevState.toDos + newToDo
  
      /*
      19: this is how the newtodo should be look like...
      
       const toDos = {
         1 :{
           id : 1,
           text : "studying react",
           isCompleted : false,
           date : 20181130
         },
         2 : {
           id:2,
           text : "studying PHP",
           isCompleted : false,
           date:20181209
         }
       }
      */

        
        const ID = uuidv1();
        const newToDoObject = {
          //how to assing variable as an name : use uuidv1
          [ID] : {
            id : ID,
            iscompleted: false, //by default 'false'
            text : newToDo,
            createdAt : Date.now()
          }
        };
        const newState ={
          ...prevState, // reason why adding ...prevState is not to replace the array of toDos => Smply take prevState and add newToDo
          //flush newToDo ( when done set it as blank )
          newToDo : "",
          toDos : {
            ...prevState.toDos, 
            ...newToDoObject
          }
        }
        return {...newState};
      });
    }
  };

  //24. _deleteToDo
  _deleteToDo = (id)=>{
    //24-1: we need id from object to delete
    this.setState(prevState=>{
      const toDos = prevState.toDos; //24-2: first get All toDos
      delete toDos[id]; //24-3. now todo[id]
      //24-4. now updated toDos look like...
      const newState={
        ...prevState,
        ...toDos
      }
      return {...}
    })
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
    const {newTodo, loadedToDos, toDos}= this.state; //17-3. const loadedToDos
    console.log(toDos); //20-2. conlog log newly created toDos
    /*
    for now logs look like object{}
    but when user input crate new to Do, it looks like this is concole..
      
      "Fa03idjdkdk-adlkfaj":object{
      "createdAt":151396852,
      "id" : "Fa03idjdkdk-adlkfaj",
      "isCompleted" : false,
      "text" : "Studying React"
      }

    */

    /*
    17. AppLoading 
    loadedToDo : false ==> <AppLoading />
    after componentDidMount -> executing _loadedToDo()->loadedToDos: true ==> Loading ToDo App
    loadedToDo : false => Loading Screen loadedToDo거짓이면 로딩 이미지 
    loadedToDo : true => ToDo App Screen loadedToDo참이면 앱 화면 
    17-2 : state ={loadedToDos : false}
    17-4 :ComponentDidMount =()=>{
        this._loadedToDo()
    }
    17-5 : create _loadedToDo() :loadedToDos:true
    17-6 : if (!loadedToDo) => return <AppLoading />
    */
    
    
    
    //17-6: when loadedToDos is false, displaying <Apploading />
    if(!loadedToDos){
      return <AppLoading /> 
    }
    
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
            
            
            //18-1: when onSubmitEditing is done, addToDo()
            onSubmitEditing={this._addToDo} //18-1 : create _addToDo
          />

          {/*10. Displaying Todo list on ToDo.js -> 11.Create ToDo.js*/}
          {/*'contentContainerStyle' is the way to apply styles to its content*/}
          <ScrollView contentContainerStyle={styles.toDos} deleteToDo={this._deleteToDo} > //24-5.Passing _deleteToDo to ScrollView & 24-5. Passing to icon 'X' as weel in ToDo.js
              
              {/* 21.Now time to displaying {toDos} in App Screen 
            
              1. Mapping Array
              {toDos.map(todo=> <ToDo />)}
              
              2. Mapping Array inside Object (this case)
              {Object.values(toDos)} : give me an array of Object
              now mapping it
            */}
              //<ToDo  text={"this is list"} />
              {Object.values(toDos.map(toDo => <ToDo key ={toDo.id} {...toDo}/>))} 
                {/*Nicho said {...toDo} is for passing props. .. I guess it's for adding previous {toDos}*/}
            
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
