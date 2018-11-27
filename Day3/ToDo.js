import React, { Component } from 'react';
import {View, Text,  StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class ToDo extends Component{
  
  /*
  14 
  what is TouchableOpacity about?
  when user completing todo list, uer cna change circle color
  
  if) 14-1. user completed (state)
      14-2. _toggleComplete function change the isCompleted statue opposite (!prevState)
      14-3. state:true
      14-4. circle color change -style : style.completedCircle || style.uncompletedCirlce
      14-5. text color change - style: style.completedText ||style.uncompletedText
    => user can on/off isEditing state by pressing TouchableOpacity
  
  */
  
  //14-1
  state={
    isCompleted:false
  }
  
  //14-2 create _toggleComplete & onPress={This._toggleComplete}
  //When user press the TouchableOpacity button, isCompleted reverse the state
  _toggleComplete=()=>{
    this.setState(prevstate=>{
      return({
        isCompleted: !prevstate.isCompleted //14-3 state: true-> false & false->true
      })
    })
  }


  render(){
    //14-4 const iscompleted
    const {isCompleted} = this.state;
    
    return(
      <View styles={style.container}>
        {/*12. import TouchableOpacity*/}
        <TouchableOpacity onPress={this._toggleComplete}>
         {/*13. When press touchable Opacity, execute _toggleComplete function 14. create _toggleComplete */}
          {/* 14-4. changing circle style depends on the isCompleted state */}
          <View
            style={[
              style.circle,
              isCompleted? style.completedCircle : style.uncompletedCircle
            ]}
          />
          
        </TouchableOpacity>
        {/*14-5. changing text color depends on the isCompleted state*/}
        <Text
          style={[
            style.text,
            isCompleted? style.completedText : style.uncompletedText
          ]}
        >
        {/*11. Creat ToDo.js checks if they works*/}
        Hello I'm ToDo List</Text>

      </View>
    );
  }
  
}

const style= StyleSheet.create({
  container : {
    width:width-50,
    borderBottom:'#bbb',
    borderBottomWidth:StyleSheet.hairlineWidth,
    flexDirection:"row"
  },
  circle:{
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle:{
    borderColor:'#bbb'
  },
  uncompletedCircle:{
    borderColor:'#f23657'
  },
  text :{
    fontWeight:"600",
    fontSize:20,
    marginVertical :20
  },
  completedText:{
    color:'#bbb',
    marginVertical:20
  },
  uncompletedText:{
    color:'#353839',
    marginVertical:20
  }
})
