import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  TextInput 
} from 'react-native';

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{

  state={
    isEditing : false,
    isCompleted : false,
    toDoValue : "" //for now it's empty, but when user started to Editing, it's not null anymore
    // => go to _startEditing() function
  }
    render(){
      const {isCompleted, isEditing, toDoValue} = this.state;
      const {text}=this.props;
        return(
            <View styles={style.container}>
              <View styles={style.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                  <View 
                    style={[
                      style.circle,
                      isCompleted ? style.completedCircle : style.uncompletedCircle
                      ]} /> 
                      {/* styles get chagned depend on complete/uncomplete state */}
                </TouchableOpacity>
                
                {/* If user editing, displaying <TextInput> || otherwise, displaying {text}*/}
                {isEditing ? (
                  <TextInput 
                    styles={[
                      style.input,
                      style.text,
                      isCompleted ? style.completedText : style.uncompletedText
                    ]}
                    value={toDoValue}
                    multiline={true}
                    onChangeText={this._controlInput}
                    returnKeyType={"done"}
                    onBlur={this._finishEditing}
                  />
                ) : (
                <Text 
                  styles={[style.text, 
                          isCompleted? style.completedText : style.uncompletedText]}>
                          {text}
                </Text>)}
               </View>
              
              
              {isEditing ? (
                <View styles={style.action}>
                  <TouchableOpacity onPressOut={this._finishEditing}>
                    <View styles={style.actionContainer}>
                      <Text styles={style.actionText}>✅</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ):(
                <View styles={style.action}>
                  <TouchableOpacity onPressOut={this._startEditing}>
                    <View styles={style.actionContainer}>
                      <Text styles={style.actionText}>✏️</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View styles={style.actionContainer}>
                      <Text styles={style.actionText}>❌</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              
            </View>
        );
    }
    
    _toggleComplete =()=>{
      this.setState(prevState=>{
        return({
          isCompleted : !prevState.isCompleted 
          //when it is opposite status of the previous State, return this function
        });
      });
    };

    _startEditing =()=>{
      const {text} = this.props;
      this.setState({ isEditing:true, toDoValue:text});
    };

    _finishEditing= () =>{
      this.setState({
        isEditing:false
      });
    };

    _controlInput =(text)=>{
      this.setState({toDoValue:text});
    }
}

const style =StyleSheet.create({
  container:{
    width: width-50,
    borderBottom:"#bbb",
    borderBottomWidth:StyleSheet.hairlineWidth,
    flexDirection : "row",
    justifyContent:"space-between"
  },
  circle :{
    width:30,
    height:30,
    borderRadius: 15,
    backgroundColor:"red",
    borderWidth:3,
    marginRight:20
  },
  //only different thing from circle is border color
  completedCircle:{
    borderColor : "#bbb"
  },
  uncompletedCircle:{
    borderColor:"#F23657"
  },
  text :{
    fontWeight: "600",
    fontSize:20,
    marginVertical :20
  },
  completedText:{
    color:"#bbb",
    textDecorationLine:"line-through"
  },
  uncompletedText:{
    color:"#353839"
  },
  column:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent :"space-between",
    width:width/2
  },
  action:{
    flexDirection:"row"
  },
  actionContainer:{
    marginVertical:10,
    marginHorizontal:10
    //margin is for, though user click not exact emoji, they still can click emojis
  },
  input:{
    marginVertical:20,
    width: width/2
  }
});
