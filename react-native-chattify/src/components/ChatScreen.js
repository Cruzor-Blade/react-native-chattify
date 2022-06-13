import React, {useState} from "react";
import {View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import Bubble from "./Bubble";



const ChatScreen = ({onSend, chatContainerStyles, messages, inputStyles, sendIcon, sendButtonStyles, replyContainerStyles, keyExtractor, isCurrentUser, containerStyles}) => {
    const [replyTo, setReplyTo] = useState(null);
    const [message, setMessage] = useState('');

    const onReply = (id) => {
        // "worklet"; //This specifies that the function is to be ran on the UI thread
        setReplyTo(id);
    };

    const onCancelReply = () => {
        setReplyTo(null);
    }
    return (
        <View style={[{flex:1}, containerStyles]}>
            <FlatList
            data={messages}
            keyExtractor={keyExtractor}
            renderItem={({item}) => 
                <Bubble
                    onReply={onReply}
                    id={item.id}
                    sender={item.sender}
                    message={item.message}
                    time={item.time}
                    isCurrentUser={isCurrentUser(item)}
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
                            {messages.filter(msg => msg.id === replyTo)[0].message} 
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
                        onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity onPress={() => { if (message) onSend({message, replyTo})}}>
                        <View style={[styles.sendBtn, sendButtonStyles]}>
                            {
                                sendIcon ? sendIcon()
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

export default ChatScreen;

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
        marginVertical:5
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
})