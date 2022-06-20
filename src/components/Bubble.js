import React from "react";
import {View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { Easing,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolation,
    runOnJS,
} from "react-native-reanimated";

const Bubble = ({message, sender, bubbleReplyStyles, bubbleReplyTextStyles, time, isCurrentUser, onReply, id, isReplyTo, replyToMessage, scrollToMessage}) => {
    const windowWidth = Dimensions.get('window').width;
    const translateX = useSharedValue(0);

    const onDragEnd = () => { //On drag end is a wrapper around onReply for js execution
        onReply(id);
    };

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value //We can store global and retrievable data in the context object
        },
        onActive: (event, context) => {
            const interpoledTrans = interpolate(event.translationX, [0, windowWidth/2, windowWidth], [0, windowWidth/4, windowWidth/3], {
                extrapolateLeft:Extrapolation.CLAMP,
                extrapolateRight:Extrapolation.EXTEND,
            });

            translateX.value = interpoledTrans + context.translateX;
        },
        onEnd: () => {
            if (translateX.value >=30) {
                runOnJS(onDragEnd)();
            }
            translateX.value = withTiming(0, {
                duration:100, 
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
        <PanGestureHandler activeOffsetX={[-30,30]} onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.container, rBubbleStyles, !isCurrentUser?{alignSelf:'flex-start'}:null]}>
                <View style={[styles.messageBox, !isCurrentUser?{marginLeft:6, marginRight:0, borderBottomLeftRadius:0, borderBottomRightRadius:10, backgroundColor:'#D3D3D3'}:null]}>
                    {isReplyTo?
                    ( 
                        <TouchableOpacity onPress={() => scrollToMessage(isReplyTo)}>
                            <View style={[{padding:3, borderRadius:5, backgroundColor:isCurrentUser? 'rgba(211, 211, 211, 0.5)' : 'rgba(0, 106, 255, 0.4)'}, bubbleReplyStyles]}>
                                <Text style={[{color:'#333333'}, bubbleReplyTextStyles]} numberOfLines={1} >{replyToMessage || '. . .'}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                        :
                    null
                    }
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
        marginRight:6,
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
        height:30,
        width:7,
        resizeMode:'stretch',
        position:'absolute',
        right:0,
        bottom:0
    }
});
