import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{
    
    state={
        isEditing : false,
        isCompleted : false
    }
    render(){

        const {isCompleted} = this.state;

        return(
            <View>
                <TouchableOpacity onPress={this._toggleComplete} >
                    <View
                        style={[
                            style.circle,
                            isCompleted ? style.completedCircle : style.uncompletedCircle    
                        ]}
                    />
                    {/* Displaying different style depends on complete/uncomplete statue */}
                </TouchableOpacity>    
                <Text 
                    styles={[
                        style.text,
                        isCompleted ? style.completdText : style.uncompletedText
                    ]}>
                    Hello I'm a To Do
                </Text>
            </View>
        );
    }

    _toggleComplete = ()=>{
        this.setState(prevstate=>{
            return({
                isCompleted : !prevState.isCompleted
                //when it is opposite status of the previous State, return this function
            })
        })
    }

}

const style =StyleSheet.create({
    container : {
        width: width-50,
        borderBottom : "#bbb",
        borderBottomWidth:StyleSheet.harilineWidth,
        flexDirection:"row"
    },
    circle :{
        width:30,
        height:30,
        borderRadius : 15,
        backgroundColor:"red",
        borderWidth:3,
        marginRight:30
    }.
    completedCircle:{
        borderColor:"#bbb"
    },
    uncompletedCircle:{
        borderColor:"#f23657"
    },
    text :{
        fontWeight:"600",
        fontSize:20,
        marginVertical:20
    },
    completedText:{
        color:"#bbb",
        marginVertical :20
    },
    uncompletedText:{
        color:"#353839"
    }
});
