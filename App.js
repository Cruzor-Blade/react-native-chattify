import React from 'react';
import { View, Text } from 'react-native';
import Svg,
{ Rect,
  Circle
} from 'react-native-svg';
import { Bubble } from './react-native-chattify';
import ChatScreen from './react-native-chattify/src/components/ChatScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <ChatScreen/>
    </GestureHandlerRootView>
  )
}

export default App;