import React, {useState, useRef} from "react";
import {View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity, TextStyle, StyleProp, ViewStyle} from 'react-native';
import Bubble from "./Bubble";
import { Message } from "../global/types";

type ChattifyPropsType = {
    onSend:(obj: any) => Promise<void>
    chatContainerStyles?:StyleProp<ViewStyle>,
    bubbleReplyStyles?:StyleProp<ViewStyle>,
    bubbleReplyTextStyles?:StyleProp<TextStyle>,
    messages:Message[],
    inputStyles?:StyleProp<TextStyle>
    SendIcon?:React.ElementType
    sendButtonStyles?:StyleProp<ViewStyle>
    replyContainerStyles?:StyleProp<ViewStyle>
    keyExtractor:(item: Message) => string
    isCurrentUser: (item: Message) => boolean
    containerStyles?:StyleProp<ViewStyle>
}

const Chattify = ({
        onSend,
        chatContainerStyles,
        bubbleReplyStyles,
        bubbleReplyTextStyles,
        messages,
        inputStyles,
        SendIcon,
        sendButtonStyles,
        replyContainerStyles,
        keyExtractor,
        isCurrentUser,
        containerStyles,
    }: ChattifyPropsType) => {


    // const conversation = useRef(messages.reverse()).current;
    let conversation:Message[] = [];
    function reverseMessages () {
        for (const msgIdx in messages) {
            // console.log(msgIdx);
            conversation.push(messages[messages.length-1-Number(msgIdx)]);
        }
        // console.log(conversation)
    }
    reverseMessages()

    const [replyTo, setReplyTo] = useState<string|null>(null);
    const [message, setMessage] = useState('');
    const listRef = useRef<any>(null);

    const onReply = (id:string) => {
        // "worklet"; //This specifies that the function is to be ran on the UI thread
        setReplyTo(id);
    };

    const onCancelReply = () => {
        setReplyTo(null);
    };

    const scrollToMessage = (id:string) => {
        // console.log(id);
        listRef.current?.scrollToIndex({
            index: conversation.findIndex(msg => msg.id == id),
            viewPosition:1
        });
    }

    return (
        <View style={[{flex:1}, containerStyles]}>
            <FlatList
            inverted={true}
            ref={listRef}
            data={conversation}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => 
                <Bubble
                    onReply={onReply}
                    scrollToMessage={scrollToMessage}
                    id={item.id.toString()}
                    sender={item.sender}
                    message={item.message}
                    time={item.time}
                    isReplyTo={item.isReplyTo}
                    replyToMessage={item.isReplyTo? conversation.filter(msg => msg.id == item.isReplyTo)[0].message:undefined}
                    isCurrentUser={isCurrentUser(item)} //check if the current message was sent by the current user
                    shallSameUser={index == 0? false :conversation[index-1].sender===conversation[index].sender} //check if the next message was sent by the current user
                    bubbleReplyStyles={bubbleReplyStyles}
                    bubbleReplyTextStyles={bubbleReplyTextStyles}
                />
            }
            style={{marginBottom: replyTo? 80:50}}
            contentContainerStyle={[{paddingTop:10,paddingBottom:20}, chatContainerStyles]}
            />
            <View style={[styles.messageView, replyTo? {height:90}:null]}>
                {replyTo?
                    <View style={[styles.replyContainer, replyContainerStyles]}>
                        <View>
                        <Text numberOfLines={1} style={{fontSize:15, color:"#444444"}}>
                            {conversation.filter(msg => msg.id === replyTo)[0].message} 
                        </Text>
                        </View>
                        <TouchableOpacity onPress={onCancelReply}>
                            <Image style={{height:20, width:20, marginLeft:10, padding:10, tintColor:'black'}} source={require('./close.png')} />
                        </TouchableOpacity>
                    </View>
                :null}
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput
                        style={[styles.msgInput, inputStyles]}
                        placeholder="type a message..."
                        multiline={true}
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity onPress={() => { if (message){
                        onSend({message, isReplyTo:replyTo})
                        setMessage('');
                        setReplyTo(null);
                        scrollToMessage((conversation.length-1).toString());
                        }}}>
                        <View style={[styles.sendBtn, sendButtonStyles]}>
                            {
                                SendIcon ? <SendIcon/>
                                    :
                                <Image style={styles.sendIcon} source={require('./paperplane.png')} />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    messageView: {
        height:62,
        width:'100%',
        position:'absolute',
        bottom:0,
        // flexDirection:'row',
        paddingHorizontal:10,
        paddingTop:10,
        alignItems:'center',
    },
    replyContainer: {
        width:'90%',
        backgroundColor:"#f3f3f3",
        borderRadius:5,
        marginHorizontal:10,
        paddingHorizontal:10,
        marginTop:2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexGrow:1,
        height:25
    },
    msgInput: {
        backgroundColor:"#e3e3e3",
        flex:5,
        borderRadius:10,
        paddingHorizontal:20,
        // elevation:1,
        marginRight:10,
        fontSize:17,
        alignItems:'center',
        textAlignVertical:'center',
        paddingBottom:5,
        marginVertical:5,
        maxHeight:50
    },
    sendBtn: {
        // flex:1,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        height:40,
        width:42,
        borderRadius:20
    },
    sendIcon: {
        height:33,
        width:33,
        marginLeft:-4,
        tintColor:'#fff'
    }
});

export default Chattify;