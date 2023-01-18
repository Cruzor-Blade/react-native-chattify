### React Native's Chat Components Reimplemeted !


> React native chattify is there to help you build Chat applications in Neact Native very-easily

React Native Chattify provides a very easy way to build beautiful and user friendly chat interfaces in React Native.
The package was written using latest React Native builds, hence, very capable of up to date and up to day user tasks.

## Installation

You should note that this package requires [react-native-reanimated@>=2.5.0](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) and [react-native-gesture-handler@>=2.5.0](https://docs.swmansion.com/react-native-gesture-handler/docs/installation) to be installed in order to work properly.

If these conditions are satisfied in your environment, then, you can proceed by running
```
npm install react-native-chattify
```

## Documentation

You can import the Chattify component from the app as follow:
```
import Chattify from 'react-native-chattify'
```

then, to use it, 
```
<Chattify
    onSend={onMsgSend} //function called when the send button is pressed
    messages={messages} //takes a messages array
    keyExtractor={(item:Message) => item.id}
    isCurrentUser={(item:Message) => item.sender == 'Cruzor Blade'} //Function to check if a message have been sent by the current user
/>
```

The props available are:
```
/** Function to call after pressing the message send button */
onSend:(obj: any) => Promise<void>
/** Styles for the content container of FlatList renderer */
chatContainerStyles?:StyleProp<ViewStyle>,
/** Styles for the bubble reply view */
bubbleReplyStyles?:StyleProp<ViewStyle>
/** Styles for the bubble reply texts */
bubbleReplyTextStyles?:StyleProp<TextStyle>
/** Messages array */
messages:Message[],
/** Text input styles */
inputStyles?:StyleProp<TextStyle>
SendIcon?:React.ElementType
sendButtonStyles?:StyleProp<ViewStyle>
replyContainerStyles?:StyleProp<ViewStyle>
keyExtractor:(item: Message) => string
/** Boolean that tells if the current message have been sent by the current user*/
isCurrentUser: (item: Message) => boolean
/** Styles for the container view of the chat */
containerStyles?:StyleProp<ViewStyle>
/** Placeholder for the bottom input */
placeholder?:string
/** Enable multiline on the bottom input */
multiline?:boolean
```
## Examples

You can try the example project by installing the dependencies into the package folder, and then running the project.

## License

React Native Chattify is licensed under [The MIT License](LICENSE).

## Credits

This project has been built and is maintained by [Cruzor Blade](https://github.com/cruzor-blade), or [Sonkeng Mbogning](https://www.linkedin.com/in/brice-donald-nelson-sonkeng-mbogning-aa6877274).