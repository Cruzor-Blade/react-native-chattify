import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';

const Bubble = ({message, sender, time}) => {
    return (
        <View style={{alignSelf:'flex-end', flexDirection:'row'}}>
            <View style={styles.container}>
                <Text style={styles.message}>{message || 'Hello hda saj kjsa jsa kusajisa usa  sdjkh sakhsa kusa mhisa sahjk sajhj sahjhn sjuian there'}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>
                        {sender || 'Cruzor Blade'}
                    </Text>
                    <Text style={styles.bottomText}>
                        {time || '12 min ago'}
                    </Text>
                </View>
            </View>
            <Image style={styles.chatside} source={require('./chatside.png')} />
        </View>
    )
}

export default Bubble;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#006AFF',
        // minHeight:80,
        marginRight:14,
        maxWidth:'73%',
        minWidth:'50%',
        // justifyContent:'space-between',
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
        width:170,
        right:20,
        marginVertical:3
    },
    bottomText: {
        fontSize:13,
        color:'#D3D3D3'
    },
    chatside:{
        tintColor:'#006AFF',
        height:50,
        width:15,
        resizeMode:'stretch',
        position:'absolute',
        right:0,
        bottom:0
    }
})
