import React from "react";
import {View, Text, FlatList} from 'react-native';
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
]
const ChatScreen = () => {
    return (
        <View>
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
            />
        </View>
    )
}

export default ChatScreen;