import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import Header from '../../../components/Header';
import FloatingButton from '../../../components/FloatingButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { RequestContext } from '../../../../context/RequestContext';
import { UserContext } from '../../../../context/UserContext';

const Final_Survey = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [survey, request, photo, requestactions] = useContext(RequestContext);
    const [info, actions] = useContext(UserContext);

    useEffect(() => {
        requestactions.setUser_id(info.user_index);
    }, [])

    return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                {/* Header */}
                <View style={{ flex: 9, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                </View>
                {/* Body */}
                <View style={{ flex: 135, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                    <View style={{ height: '30%' }} />
                    <Icon name='flag-outline' size={100} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 100 }}>
                        <Text style={{ width: '70%', textAlign: 'center', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false }}>제출완료!</Text>
                        <Text style={{ width: '70%', textAlign: 'center', fontSize: 18, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginTop: 10 }}>설문이 저장되었습니다.{'\n'}결제 시 요청서가 자동으로 접수됩니다.</Text>
                    </View>
                    <FloatingButton title='결제하기' navigation={navigation} index='Payment' next={true} />
                </View>
            </View >
    );
}

export default Final_Survey;