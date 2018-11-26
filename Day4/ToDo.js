import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{
    
    state={
        isEditing : false,
        isCompleted : false
    }
    render(){

        const {isCompleted, isEditing} = this.state;

        return(
            <View style={style.container}>
                <View style={style.column}>
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

                {isEditing ? (
                    <View styles={style.action}>
                        <TouchableOpacity onPressOut = {this._finishEditing}>
                            <View styles={style.actionContainer}>
                                <Text styles={style.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>        
                ):(
                    <View styles={style.action}>
                        <TouchableOpacity onPressOut = {this._startEditing}>
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

    _toggleComplete = ()=>{
        this.setState(prevstate=>{
            return({
                isCompleted : !prevState.isCompleted
                //when it is opposite status of the previous State, return this function
            })
        })
    }

    _startEditing =()=>{
        this.setState({
            isEditing:true
        });
    };

    _finishEditing =()=>{
        this.setSTate({
            isEditing:false
        });
    };

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
    },
    column :{
        flexDirection:"row",
        alignItems:"center",
        justifyContent :"space-between",
        width:width/2
    },
    action:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical :10,
        marginHorizontal:10
        //margin is for fat fingers lol, though user click not exact emoji, they still can click emoji!
    }
});
