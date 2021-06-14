import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Header from '../../../components/Header';
import { RequestContext } from '../../../../context/RequestContext';
import { UserContext } from '../../../../context/UserContext';
import FastImage from 'react-native-fast-image'

const Payment = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [pay_method, setPay_method] = useState('card');
    const [isaccept, setIsaccept] = useState(false);
    const [stylist, setStylist] = useState('');
    const [isLoading, setIsloading] = useState(true);

    const [survey, request, photo, actions] = useContext(RequestContext);
    const [info, useractions] = useContext(UserContext);

    useEffect(() => {
        console.log('stylist_id : ' + request.stylist_id);
        axios.get('http://15.165.242.227:3000/stylist/pay-stylist?stylist_id=' + request.stylist_id)
            .then(function (response) {
                console.log(response.data[0]);
                setStylist(response.data[0]);
                setIsloading(false);

            })
            .catch((error) => {
                console.log(error);
            });
        console.log(survey);
        console.log(request);
    }, []);

    const Rating = ({ rate, count }) => {
        const Star = ({ num }) => {
            return (
                <Icon name='star' size={17} color={rate >= num ? '#ffd400' : '#969696'} />
            );
        }

        return (
            <View style={{ marginTop: 5, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                <Star num={1} />
                <Star num={2} />
                <Star num={3} />
                <Star num={4} />
                <Star num={5} />
                <Text style={{ marginLeft: 5, fontSize: 14, color: '#969696' }}>({count})</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Modal animationType='none' visible={isLoading} transparent={true}>
                <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size='large' color='#000000' />
                </View>
            </Modal>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='결제하기' navigation={navigation} isMain={false} />
            {/* Body */}
            <ScrollView style={{ flex: 1, width: '100%', padding: '5%', backgroundColor: '#ffffff' }}
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 20, marginBottom: 8 }}>주문정보</Text>
                <View style={{
                    borderTopWidth: 4, borderBottomWidth: 4, width: '100%', minHeight: 110, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start',
                    paddingVertical: 10
                }}>
                    <FastImage source={{ uri: stylist.profile_photo, cache: 'web' }} style={{ width: '20%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: 10, marginRight: 10 }} />
                    <View style={{ width: '100%', flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: '7%' }}>
                            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false }}>{stylist.nick_name}</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> 어드바이저</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 14, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginTop: 5 }}>{stylist.profile_introduction}</Text>
                        <Rating rate={stylist.user_rating} count={stylist.count} />
                    </View>
                </View>
                <View style={{ borderBottomWidth: 4, width: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingVertical: 10 }}>
                    <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 20, includeFontPadding: false }}>결제자 정보</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 20, includeFontPadding: false }}>이름</Text>
                        <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 20, includeFontPadding: false }}>{info.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 20, includeFontPadding: false }}>핸드폰 번호</Text>
                        <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 20, includeFontPadding: false }}>{info.phone_number}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 20, includeFontPadding: false }}>결제금액</Text>
                        <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 20, includeFontPadding: false }}>15,000원</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 4, width: '100%', paddingVertical: 10 }}>
                    <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 20, paddingBottom: 10 }}>결제방법</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <TouchableOpacity style={{
                            width: '48%', borderWidth: 1, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', paddingVertical: 7,
                            backgroundColor: pay_method === 'card' ? '#000000' : '#ffffff',
                        }}
                            onPress={() => { setPay_method('card') }}>
                            <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 18, color: pay_method === 'card' ? '#ffffff' : '#000000', }}>신용/체크카드 (간편결제)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '48%', borderWidth: 1, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', paddingVertical: 7,
                            backgroundColor: pay_method === 'phone' ? '#000000' : '#ffffff',
                        }}
                            onPress={() => { setPay_method('phone') }}>
                            <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 18, color: pay_method === 'phone' ? '#ffffff' : '#000000', }}>휴대폰 결제</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                        <TouchableOpacity style={{
                            width: '48%', borderWidth: 1, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', paddingVertical: 7,
                            backgroundColor: pay_method === 'vbank' ? '#000000' : '#ffffff',
                        }}
                            onPress={() => { setPay_method('vbank') }}>
                            <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 18, color: pay_method === 'vbank' ? '#ffffff' : '#000000', }}>무통장입금 (가상계좌)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '48%', borderWidth: 1, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', paddingVertical: 7,
                            backgroundColor: pay_method === 'trans' ? '#000000' : '#ffffff',
                        }}
                            onPress={() => { setPay_method('trans') }}>
                            <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 18, color: pay_method === 'trans' ? '#ffffff' : '#000000', }}>실시간 계좌이체</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', width: '100%', marginTop: '5%', }} onPress={() => {
                    if (isaccept === false) setIsaccept(true);
                    else if (isaccept === true) setIsaccept(false);
                }} activeOpacity={0.8}>
                    <View style={{ width: '7%', aspectRatio: 1 / 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: '3%', borderRadius: 5 }}>
                        {isaccept === true ?
                            <Icon name='checkmark' size={20} style={{}} /> : null
                        }
                    </View>
                    <Text style={{ width: '90%', fontFamily: 'NanumSquare_ecR', fontSize: 20 }}>주문하실 상품 및 결제, 주문정보를 확인하였으며, 이에 동의합니다.(필수)</Text>
                </TouchableOpacity>
                <View style={{ width: '100%', height: 80, }} />
            </ScrollView>
            <TouchableOpacity style={{
                width: '100%', height: 60, backgroundColor: isaccept === true ? '#464646' : '#ffffff', justifyContent: 'center', alignItems: 'center',
                borderTopWidth: isaccept === true ? 0 : 1, borderTopColor: '#d2d2d2'
            }} disabled={isaccept === true ? false : true}
                onPress={() => {
                    axios.get('http://15.165.242.227:3000/stylist/ordernum')
                        .then(function (response) {
                            console.log(response.data);
                            actions.setOrdernum(response.data);
                            navigation.navigate('Payment_View', pay_method);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }} activeOpacity={0.8} >
                <Text style={{ color: isaccept === true ? '#ffffff' : '#d2d2d2', fontFamily: 'NanumSquare_acR', fontSize: 30 }}>15,000원 결제하기</Text>
            </TouchableOpacity>
        </View >
    );
}

export default Payment;