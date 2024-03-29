import React, {useState} from 'react';
import Chattify from './components/Chattify';
import { Message } from './global/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const coversation:Message[] = [
  {id:'1', 'message':'Hey bro, how are you?', sender:'Cruzor Blade', time:'3 hours ago'},
  {id:'2', 'message':'I am good and you?', sender:'Epic Suave', time:'45 min ago'},
  {id:'3', 'message':'I am also good', sender:'Kyzer', time:'32 min ago'},
  {id:'4', 'message':'Are you ready for the night party? There will be a huge amount of people there', sender:'Cruzor Blade', time:'28 min ago'},
  {id:'5', 'message':'Booya!! More than ready. Trust me :)', sender:'Cruzor Blade', time:'23 min ago'},
  {id:'6', 'message':'What are you doing actually?', sender:'Epic Suave', time:'17 min ago'},
  {id:'7', 'message':'Nothing fancy, just typing some texts', sender:'Metanymous', time:'15 min ago'},
  {id:'8', 'message':'Can i help you?', sender:'Metanymous', time:'9 min ago'},
  {id:'9', 'message':'No it is ok. I am pretty sure i will be done before the night', sender:'Cruzor Blade', time:'5 min ago'},
  {id:'10', 'message':'Ah ok. Then, have a good day ;)', sender:'Epic Suave', time:'1 min ago'},
  {id:'11', 'message':'Hey bro, how are you?', sender:'Cruzor Blade', time:'3 hours ago'},
  {id:'12', 'message':'I am good and you?', sender:'Epic Suave', time:'45 min ago'},
  {id:'13', 'message':'I am also good', sender:'Kyzer', time:'32 min ago'},
  {id:'14', 'message':'Are you ready for the night party? There will be a huge amount of people there', sender:'Cruzor Blade', time:'28 min ago'},
  {id:'15', 'message':'Booya!! More than ready. Trust me :)', sender:'Cruzor Blade', time:'23 min ago'},
  {id:'21', 'message':'Booya!! More than ready. Trust me :)', sender:'Cruzor Blade', time:'23 min ago'},
  {id:'16', 'message':'What are you doing actually?', sender:'Epic Suave', time:'17 min ago'},
  {id:'17', 'message':'Nothing fancy, just typing some texts', sender:'Metanymous', time:'15 min ago', isReplyTo:'5'},
  {id:'18', 'message':'Can i help you?', sender:'Metanymous', time:'9 min ago', isReplyTo:'8'},
  {id:'19', 'message':'No it is ok. I am pretty sure i will be done before the night', sender:'Cruzor Blade', time:'5 min ago'},
  {id:'20', 'message':'Ah ok. Then, have a good day ;)', sender:'Epic Suave', time:'1 min ago', isReplyTo:'15'},
];


const App = () => {
  const [messages, setMessages] = useState(coversation)
  const onMsgSend = async(obj:{message:string, isReplyTo?:string}) => {
    let newMessage:Message = {
        ...obj,
        id: (10000*(Math.random())).toString(),
        time: '12 min ago',
        sender:'Cruzor Blade'
        
    };
    
    console.log('Message object: ', obj)
    setMessages((prevMgs) => [...prevMgs, newMessage]);
  }
  return (
    <GestureHandlerRootView style={{flex:1}}>
        <Chattify
            onSend={onMsgSend}
            messages={messages}
            keyExtractor={(item:Message) => item.id}
            isCurrentUser={(item:Message) => item.sender == 'Cruzor Blade'}
        />
    </GestureHandlerRootView>
  )
};

export default App;