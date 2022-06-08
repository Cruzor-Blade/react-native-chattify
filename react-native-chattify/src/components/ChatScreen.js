import React from "react";
import {View, FlatList, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import Bubble from "./Bubble";

const coversation = [
    {id:1, 'message':'Hey bro, how are you?', sender:'Cruzor Blade', time:'3 hours ago'},
    {id:2, 'message':'I am good and you?', sender:'Epic Suave', time:'45 min ago'},
    {id:4, 'message':'I am also good', sender:'Kyzer', time:'32 min ago'},
    {id:1, 'message':'Are you ready for the night party? There will be a huge amount of people there', sender:'Cruzor Blade', time:'28 min ago'},
    {id:1, 'message':'Booya!! More than ready. Trust me :)', sender:'Cruzor Blade', time:'23 min ago'},
    {id:2, 'message':'What are you doing actually?', sender:'Epic Suave', time:'17 min ago'},
    {id:3, 'message':'Nothing fancy, just typing some texts', sender:'Metanymous', time:'15 min ago'},
    {id:3, 'message':'Can i help you?', sender:'Metanymous', time:'9 min ago'},
    {id:1, 'message':'No it is ok. I am pretty sure i will be done before the night', sender:'Cruzor Blade', time:'5 min ago'},
    {id:2, 'message':'Ah ok. Then, have a good day ;)', sender:'Epic Suave', time:'1 min ago'},
];

const ChatScreen = () => {
    return (
        <View style={{flexDirection:'column'}}>
            <View style={styles.messageView}>
                <TextInput
                    style={styles.msgInput}
                    placeholder="type a message..."
                    multiline={true}
                />
                <TouchableOpacity>
                    <View style={styles.sendBtn}>
                        <Image style={styles.sendIcon} source={require('./paperplane.png')} />
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
            data={coversation}
            keyExtractor={item => item.message.toString()}
            renderItem={({item}) => 
                <Bubble
                    sender={item.sender}
                    message={item.message}
                    time={item.time}
                    isCurrentUser={item.id == 1}
                />
            }
            style={{marginBottom:50}}
            contentContainerStyle={{paddingBottom:10}}
            />
        </View>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    messageView: {
        height:60,
        width:'100%',
        // borderWidth:1,
        // backgroundColor:'blue',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        paddingHorizontal:10,
        // paddingVertical:6,
        paddingTop:10,
        alignItems:'center',
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