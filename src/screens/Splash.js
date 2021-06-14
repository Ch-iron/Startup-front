import React from 'react';
import { View, StatusBar, Text, } from 'react-native';

const Splash = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#000000',}}>
            <StatusBar hidden={true} backgroundColor='#ffffff'/>
            <View style={{width: '10%', aspectRatio: 1/8, borderColor: '#ffffff', borderLeftWidth: 3, borderRightWidth: 3, borderBottomWidth: 3, position: 'absolute', top: 0, right: 50}}></View>
            <View style={{width: '10%', aspectRatio: 1/1, borderColor: '#ffffff', borderWidth: 3, borderRadius: 100, position: 'absolute', top: 350, right: 50}}></View>
            <Text style={{color: '#ffffff', fontFamily: 'GodoM', fontSize: 40, position: 'absolute', bottom: 300, marginLeft: 20}}>당신을 위한</Text>
            <Text style={{color: '#ffffff', fontFamily: 'GodoM', fontSize: 40, position: 'absolute', bottom: 260, marginLeft: 20}}>패션 어드바이저</Text>
            <Text style={{color: '#ffffff', fontFamily: 'Montserrat-Bold', fontSize: 45, position: 'absolute', bottom: 200, marginLeft: 20}}>STYLE REC!PE</Text>
            <Text style={{color: '#d2d2d2', fontSize: 15, position: 'absolute', bottom: 10, left: 160}}>FA:AD copyright</Text>
        </View>
    );
}

export default Splash;