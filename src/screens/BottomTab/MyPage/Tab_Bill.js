import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, Alert } from 'react-native';
import { IndexContext } from '../../../context/BottomTabIndex';
import axios from 'axios';
import ip from '../../../ip';

const Billing = ({ loading, billing, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [index, setIndex] = useContext(IndexContext);

    const Bill = ({ item }) => {
        const [styling_state, setStyling_state] = useState(item.styling_state);

        return (
            // {/* Payment Body1 */}
            <View style={{ width: '100%', height: 110, padding: 7, marginTop: 10, backgroundColor: '#ffffff', alignitems: 'flex-start', justifyContent: 'flex-start', }}>
                {/* Payment Body1 Top*/}
                <View style={{ flex: 1, width: '100%', backgroundColor: '#ffffff', flexDirection: 'row', alignitems: 'center', justifyContent: 'center', }}  >
                    {/* Payment Body1 left top */}
                    <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center', }} >
                        <Text style={{
                            fontSize: 20, fontFamily: 'NanumSquare_acR', color: styling_state === 4 || styling_state === 5 ? '#d2d2d2' : '#000000', includeFontPadding: false, textDecorationLine: styling_state === 4 || styling_state === 5 ? 'line-through' : 'none'
                        }}>어드바이저 {item.nick_name}</Text>
                    </View>
                    {/* Payment Body1 right top */}
                    <View style={{ width: '50%', alignItems: 'flex-end', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acR', color: styling_state === 4 || styling_state === 5 ? '#d2d2d2' : '#000000', textAlign: 'right', includeFontPadding: false, textDecorationLine: styling_state === 4 || styling_state === 5 ? 'line-through' : 'none' }}>
                            주문번호 : {item.styling_id}
                        </Text>
                        <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acR', color: styling_state === 4 || styling_state === 5 ? '#d2d2d2' : '#000000', textAlign: 'right', includeFontPadding: false, textDecorationLine: styling_state === 4 || styling_state === 5 ? 'line-through' : 'none' }}>{
                            JSON.stringify(item.timestamp).substr(1, 10) + ' ' + JSON.stringify(item.timestamp)[12] +
                            JSON.stringify(item.timestamp)[13] + JSON.stringify(item.timestamp)[14] +
                            JSON.stringify(item.timestamp)[15] + JSON.stringify(item.timestamp)[16]
                        }</Text>
                    </View>
                </View>
                {/* Payment state*/}
                <View style={{ flex: 1, width: '100%', alignItems: 'flex-start', justifyContent: 'center', }}>
                    <Text style={{ color: '#000000', fontFamily: 'NanumSquare_acR', fontSize: 17.5, includeFontPadding: false, }}>{
                        styling_state === 1 ? '접수중' :
                            styling_state === 2 ? '진행중' :
                                styling_state === 3 ? '완료' :
                                    styling_state === 4 ? '취소진행중' : '취소완료'
                    }</Text>
                </View>
                {/* Payment Body 1 bottom*/}
                <View style={{ flex: 1, flexDirection: 'row', width: '100%', }}>
                    {/* Payment Body 1 left bottom*/}
                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Review', item);
                            }} style={{
                                borderWidth: 1, paddingHorizontal: 10, height: '80%', borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                                borderColor: styling_state === 3 ? item.review_write === 1 ? '#dcdcdc' : '#000000' : '#dcdcdc'
                            }}
                            disabled={styling_state === 3 ? item.review_write === 1 ? true : false : true} activeOpacity={0.8}>
                            <Text style={{ color: styling_state === 3 ? item.review_write === 1 ? '#dcdcdc' : '#000000' : '#dcdcdc', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 15 }}>후기 작성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('취소', '접수중 상태일때만 취소가 가능합니다. 정말로 주문을 취소하시겠습니까?',
                                    [
                                        {
                                            text: '아니요',
                                            onDismiss: () => { },
                                        },
                                        {
                                            text: '네, 취소할게요',
                                            onPress: () => {
                                                Alert.alert('취소완료!', '저희에게 취소하였다고 알려주셔야 완전 취소가 가능합니다! 확인하였습니까?',
                                                    [
                                                        {
                                                            text: '네, 알려주겠습니다',
                                                            onPress: () => {
                                                                setStyling_state(4);
                                                                axios.post(ip + 'mypage/order-cancel', { styling_id: item.styling_id })
                                                                    .then((response) => {
                                                                        // console.log(response);
                                                                    })
                                                                    .catch((error) => {
                                                                        console.log(error);
                                                                    });
                                                            },
                                                        }
                                                    ]);
                                            },
                                        }
                                    ]);
                            }} style={{
                                borderWidth: 1, paddingHorizontal: 10, height: '80%', borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                                borderColor: styling_state === 1 ? '#000000' : '#dcdcdc'
                            }}
                            disabled={styling_state === 1 ? false : true} activeOpacity={0.8}>
                            <Text style={{ color: styling_state === 1 ? '#000000' : '#dcdcdc', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 15 }}>주문 취소</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Payment Body1 right bottom */}
                    <View style={{ width: '55%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                        <Text style={{ fontSize: 20, fontFamily: 'NanumSquare_acEB', color: styling_state === 4 || styling_state === 5 ? '#d2d2d2' : '#000000', includeFontPadding: false, textDecorationLine: styling_state === 4 || styling_state === 5 ? 'line-through' : 'none' }}>
                            결제금액 : {item.payment_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원
              </Text>
                        <Text style={{ fontFamily: 'NanumSquare_acR', color: styling_state === 4 || styling_state === 5 ? '#d2d2d2' : '#aaaaaa', fontSize: 10, includeFontPadding: false, textDecorationLine: styling_state === 4 || styling_state === 5 ? 'line-through' : 'none' }}>({item.payment_way})</Text>
                    </View>
                </View>
            </View>
        );
    }
    const renderItem = useCallback(({ item }) => {
        return (
            <Bill item={item} />
        );
    }, []);

    const keyExtractor = useCallback((item) => item.styling_id, []);

    return (
        loading ?
            <View style={{ flex: 1, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size='large' color='#000000' />
            </View> : billing === 'No Billing' ?
                <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <View style={{ height: '20%' }} />
                    <Text style={{ width: '80%', textAlign: 'center', fontFamily: 'NanumSquare_acR', fontSize: 28, marginBottom: 20 }}>아직 등록하신 요청서가 없어요 :-)</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Stylist');
                        setIndex('Stylist');
                    }} activeOpacity={0.8}
                        style={{ borderRadius: 10, backgroundColor: '#000000', width: '60%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                        <Text style={{ fontFamily: 'NanumSquare_acR', color: '#ffffff', fontSize: 20 }}>예약하러가기</Text>
                    </TouchableOpacity>
                </View> :
                <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea' }}>
                    <FlatList
                        data={billing}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        style={{ width: '100%' }}
                    />
                </View>
    );
}

export default Billing;