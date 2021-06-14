import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import FloatingButton from '../../../components/FloatingButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { RequestContext } from '../../../../context/RequestContext';
import { UserContext } from '../../../../context/UserContext';

const Payment_Fail = ({ navigation, }) => {
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
            <View style={{
                minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2',
            }}>
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>결제실패</Text>
            </View>
            {/* Body */}
            <View style={{ flex: 135, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <View style={{ height: '30%' }} />
                <Icon name='close-outline' size={100} />
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 100, }}>
                    <Text style={{ width: '70%', textAlign: 'center', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false }}>결제실패!</Text>
                    <Text style={{ width: '70%', textAlign: 'center', fontSize: 18, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginTop: 10 }}>결제가 실패하였습니다.{'\n'}뒤로 돌아가서 결제를 다시 진행해주세요.</Text>
                </View>
                <FloatingButton title='뒤로가기' navigation={navigation} index='Payment' next={true} />
            </View>
        </View >
    );
}

export default Payment_Fail;