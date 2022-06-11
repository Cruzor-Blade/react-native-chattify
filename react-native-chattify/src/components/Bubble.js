import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const Bubble = ({message, sender, time, isCurrentUser}) => {
    const translateX = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value //We can store global and retrievable data in the context object
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
        },
        onEnd: () => {
            translateX.value = withTiming(0, {
                duration:100, //in ms
                easing: Easing.in()
            });
        },
    });

    const rBubbleStyles = useAnimatedStyle(() => {
        return {
            transform:[
                {translateX:translateX.value}
            ]
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.container, rBubbleStyles, !isCurrentUser?{alignSelf:'flex-start'}:null]}>
                <View style={[styles.messageBox, !isCurrentUser?{marginLeft:11, marginRight:0, borderBottomLeftRadius:0, borderBottomRightRadius:10, backgroundColor:'#D3D3D3'}:null]}>
                    <Text style={[styles.message, !isCurrentUser? {color:'#006AFF'}:null]}>
                        {message || 'Hello hda saj kjsa jsa kusajisa usa  sdjkh sakhsa kusa mhisa sahjk sajhj sahjhn sjuian there'}
                    </Text>
                    <View style={[styles.bottomContainer, !isCurrentUser?{alignSelf:'flex-start'}:null]}>
                        <Text style={[styles.bottomText, !isCurrentUser ? {color:'#006AFF', opacity:0.75}:null]}>
                            {sender || 'Cruzor Blade'}
                        </Text>
                        <Text style={[styles.bottomText, !isCurrentUser ? {color:'#006AFF', opacity:0.75}:null]}>
                            {time || '12 min ago'}
                        </Text>
                    </View>
                </View>
                <Image
                    style={[styles.chatside, !isCurrentUser?{left:0, tintColor:'#D3D3D3', transform:[{rotateY:'180deg'}]}:null]}
                    source={require('./chatside.png')}
                />
            </Animated.View>
        </PanGestureHandler>
    )
}

export default Bubble;

const styles = StyleSheet.create({
    container:{
        alignSelf:'flex-end',
        flexDirection:'row',
        marginVertical:6
    },
    messageBox: {
        backgroundColor:'#006AFF',
        marginRight:11,
        maxWidth:'73%',
        minWidth:'50%',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        paddingVertical:5,
        paddingHorizontal:10
    },
    message:{
        fontSize:16,
        color:'#fff',
        marginBottom:18
    },
    bottomContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'flex-end',
        position:'absolute',
        bottom:0,
        // width:'60%',
        // right:20,
        marginVertical:3
    },
    bottomText: {
        fontSize:13,
        color:'#D3D3D3',
        marginHorizontal:10
    },
    chatside:{
        tintColor:'#006AFF',
        height:50,
        width:12,
        resizeMode:'stretch',
        position:'absolute',
        right:0,
        bottom:0
    }
})
