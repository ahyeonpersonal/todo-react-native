import React, { Component } from 'react';
import {View, Text,  StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import PropTypes from 'prop-types'; //22-1. import proptypes

const {width, height} = Dimensions.get('window');
export default class ToDo extends Component{
  
  //23. Refactoring 
  constructor(props){
    super(props);//23-1
    this.state={isEditing:false, toDoValue:props.text} //23-2. put state inside constructor // and update toDovalue
    
  } 

  //22-2: text, 
  static PropTypes = {
    text:PropTypes.string.isRequired,
    isCompleted:PropTypes.bool.isRequired,
    deleteToDo:PropTypes.func.isRequired,
    id:PropTypes.string.isRequired
    }
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
  
  //14-1 //15-1 //16-1
  //23-2: moving state inside of constructor
  /*
  state={
    //22-3: cuz isCompleted is false as defualt in Object // isCompleted:false,
    isEditing:false,
    toDoValue:"" //for now it's empty, but when user started to edit, it's not null anymore
  }
  */

  //14-2 create _toggleComplete & onPress={This._toggleComplete}
  //When user press the TouchableOpacity button, isCompleted reverse the state
  _toggleComplete=()=>{
    this.setState(prevstate=>{
      return({
        isCompleted: !prevstate.isCompleted //14-3 state: true-> false & false->true
      });
    });
  };
  
  _finishEditing=()=>{
    this.setState({
      isEditing:false
    });
  };

  _startEditing=()=>{
     // const {text} = this.props;//23-3. super(props). now we get text props as soon as app rendered
      this.setState({
        isEditing:true,
        //23-1, instead of copying Value like this, using constructor
        //toDoValue:text
      
    })
  }

  _contorlInput=(text)=>{
    this.setState({toDoValue:text});
  }

  render(){
    //14-4 const iscompleted //15-2 const isEditing
    const {isCompleted, isEditing,toDoValue} = this.state;
    const {text, id, deleteToDo} = this.props

    return(
      <View styles={style.container}>
        {/*12. import TouchableOpacity*/}
        <View style={style.column}>
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

          {/*16 start*/}
          {isEditing? (
            <TextInput
              styles={[
                style.text,
                style.input,
                isCompleted? style.completedText : style.uncompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._contorlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
            />
          ):(
            /*14-5. changing text color depends on the isCompleted state*/
            <Text
              styles={[style.text,
              isCompleted? style.completedText : style.uncompletedText]}>
              {text}
              hello
            </Text>    
          )}

          {/*16 end*/}

        </View>
        
        

        {/* 15. Changing icon depends on the state => isEditng
          if user isEditing :true displaying ✅
          if user ISeDITING :false displaying ✏️
          15-1. isEditing state 
          15-2. const isEditing
          15-3. Depending on isEditing, displaying different icon
          {isEditing ? () : ()}
          15-4. if user press the button, execute _finishEditing || _startEditing
          15-5. create _finishEditing, _startEditing
        */}

        
        {/*15-3 : if user finishEditing, displaying ✅*/}  
        {/*15-3 : if user startEditing, displaying ✏️*/}
        {isEditing? (
          
          <View styles={style.action}>
            <TouchableOpacity onPress={this._finishEditing}>
              <View styles={style.actionContainer}>
                <Text style={style.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
          ):(
          <View styles={style.action}>
            <TouchableOpacity onPress={this._startEditing}>
              <View styles={style.actionContainer}>
                <Text style={style.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut ={()=> deleteToDo(id)} > //24-6
              <View styles={style.actionContainer}>
                <Text styles={style.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>      
        )}
        

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
  },
   column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  action: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10 //for fat fingers
  },
  input:{
    width:width/2,
    marginVertical:15,
    paddingBottom:5
  }
})
