import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

// 기타(직접입력)한 값은 etc변수에 따로 담겨져있다!!!
// 제출하면 직접입력값이 배열에 저장되도록 할것!!!
// 기타는 배열에서 빠지도록 할것!!!
const Survey2 = ({ navigation, }) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const [etc, setEtc] = useState('');
    const [needlist, setNeedlist] = useState([]);
    const [istouched1, setIstouched1] = useState(false);
    const [istouched2, setIstouched2] = useState(false);
    const [istouched3, setIstouched3] = useState(false);
    const [istouched4, setIstouched4] = useState(false);
    const [istouched5, setIstouched5] = useState(false);
    const [istouched6, setIstouched6] = useState(false);
    const [istouched7, setIstouched7] = useState(false);
    const [istouched8, setIstouched8] = useState(false);
    const [istouched9, setIstouched9] = useState(false);
    const [istouched10, setIstouched10] = useState(false);
    const [next, setNext] = useState(false);

    const contents = {
        needlist: needlist,
        etc: etc,
    }

    useEffect(() => {
        console.log(contents);
        if (contents.needlist.length > 0) {
            if (contents.needlist.includes('기타')) {
                if (contents.etc.length >= 1) setNext(true);
                else if (contents.etc.length === 0) setNext(false);
            }
            else setNext(true);
        }
        else setNext(false);
    }, [contents]);

    const image_jacket = require('../../../../../assets/denim-jacket.png');

    const Category = ({ istouched, setIstouched, classify, image }) => {
        return (
            <TouchableOpacity style={{ width: '25%', aspectRatio: 1 / 1.4, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                if (!istouched) {
                    if (needlist.length === 3) {
                        setIstouched(false);
                    }
                    else {
                        setIstouched(true);
                        setIstouched8(false);
                        setIstouched9(false);
                        if (needlist[0] === '알아서 해주세요!' || needlist[0] === '필요없어요!') {
                            setNeedlist([classify]);
                        }
                        else {
                            setNeedlist([...needlist, classify]);
                        }
                    }
                }
                else {
                    setIstouched(false);
                    setNeedlist(needlist.filter((outer) => outer !== classify))
                }
            }}>
                <View style={{
                    width: '100%', aspectRatio: 1 / 1, backgroundColor: istouched === true ? '#d2d2d2' : '#ffffff',
                    borderWidth: 1, borderColor: '#d2d2d2', borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                }}>
                    <Image source={image} style={{ height: '70%', aspectRatio: 1 / 1 }} />
                </View>
                <Text style={{
                    width: '100%', textAlign: 'center',
                    fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, paddingVertical: 10
                }}>{classify}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <View style={{ width: '100%', marginVertical: 20, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>원하는 아우터 종류</Text>
                            <Text style={{ width: '80%', fontSize: 20, fontFamily: 'NotoSansKR-Regular', color: '#8c8c8c', includeFontPadding: false, }}>최대 3가지 선택 가능</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <Category istouched={istouched1} setIstouched={setIstouched1} classify='숏패딩' image={image_jacket} />
                                <Category istouched={istouched2} setIstouched={setIstouched2} classify='롱패딩' image={image_jacket} />
                                <Category istouched={istouched3} setIstouched={setIstouched3} classify='가죽 자켓' image={image_jacket} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <Category istouched={istouched4} setIstouched={setIstouched4} classify='블레이저' image={image_jacket} />
                                <Category istouched={istouched5} setIstouched={setIstouched5} classify='환절기 코트' image={image_jacket} />
                                <Category istouched={istouched6} setIstouched={setIstouched6} classify='겨울 코트' image={image_jacket} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <Category istouched={istouched7} setIstouched={setIstouched7} classify='캐주얼 자켓' image={image_jacket} />
                                <TouchableOpacity style={{ width: '25%', aspectRatio: 1 / 1.4, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                                    if (!istouched8) {
                                        setIstouched8(true);
                                        setIstouched1(false);
                                        setIstouched2(false);
                                        setIstouched3(false);
                                        setIstouched4(false);
                                        setIstouched5(false);
                                        setIstouched6(false);
                                        setIstouched7(false);
                                        setIstouched9(false);
                                        setIstouched10(false);
                                        setNeedlist(['알아서 해주세요!']);
                                        setEtc('');
                                    }
                                    else {
                                        setIstouched8(false);
                                        setNeedlist(needlist.filter((outer) => outer !== '알아서 해주세요!'))
                                    }
                                }}>
                                    <View style={{
                                        width: '100%', aspectRatio: 1 / 1, backgroundColor: istouched8 === true ? '#d2d2d2' : '#ffffff',
                                        borderWidth: 1, borderColor: '#d2d2d2', borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Image source={require('../../../../../assets/denim-jacket.png')} style={{ height: '70%', aspectRatio: 1 / 1 }} />
                                    </View>
                                    <Text style={{
                                        width: '100%', textAlign: 'center',
                                        fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, paddingVertical: 10
                                    }}>알아서 해주세요!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '25%', aspectRatio: 1 / 1.4, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                                    if (!istouched9) {
                                        setIstouched9(true);
                                        setIstouched1(false);
                                        setIstouched2(false);
                                        setIstouched3(false);
                                        setIstouched4(false);
                                        setIstouched5(false);
                                        setIstouched6(false);
                                        setIstouched7(false);
                                        setIstouched8(false);
                                        setIstouched10(false);
                                        setNeedlist(['필요없어요!']);
                                        setEtc('');
                                    }
                                    else {
                                        setIstouched8(false);
                                        setNeedlist(needlist.filter((outer) => outer !== '필요없어요!'))
                                    }
                                }}>
                                    <View style={{
                                        width: '100%', textAlign: 'center',
                                        width: '100%', aspectRatio: 1 / 1, backgroundColor: istouched9 === true ? '#d2d2d2' : '#ffffff',
                                        borderWidth: 1, borderColor: '#d2d2d2', borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Image source={require('../../../../../assets/denim-jacket.png')} style={{ height: '70%', aspectRatio: 1 / 1 }} />
                                    </View>
                                    <Text style={{
                                        fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, paddingVertical: 10
                                    }}>필요없어요!</Text>
                                </TouchableOpacity>
                            </View>
                            <View flexDirection='row' style={{ width: '100%', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: '100%', }} onPress={() => {
                                    if (!istouched10) {
                                        if (needlist.length === 3) {
                                            setIstouched10(false);
                                        }
                                        else {
                                            setIstouched10(true);
                                            setIstouched8(false);
                                            setIstouched9(false);
                                            if (needlist[0] === '알아서 해주세요!' || needlist[0] === '필요없어요!') {
                                                setNeedlist(['기타']);
                                            }
                                            else {
                                                setNeedlist([...needlist, '기타']);
                                            }
                                        }
                                    }
                                    else {
                                        setEtc('');
                                        setIstouched10(false);
                                        setNeedlist(needlist.filter((outer) => outer !== '기타'))
                                    }
                                }}>
                                    <View flexDirection='row' style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                                        {istouched10 === false ?
                                            <View style={{ width: '7%', aspectRatio: 1 / 1, borderRadius: 100, borderWidth: 1, borderColor: '#d2d2d2', marginLeft: 30, marginRight: 10 }}>
                                            </View> :
                                            <View style={{
                                                width: '7%', aspectRatio: 1 / 1, justifyContent: 'center', alignItems: 'center',
                                                borderRadius: 100, borderWidth: 1, borderColor: '#d2d2d2',
                                                marginLeft: 30, marginRight: 10
                                            }}>
                                                <View style={{
                                                    width: '80%', aspectRatio: 1 / 1, backgroundColor: '#464646',
                                                    borderRadius: 100,
                                                }}>
                                                </View>
                                            </View>}
                                        <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }} >기타</Text>
                                    </View>
                                </TouchableOpacity>
                                {istouched10 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='직접입력' placeholderTextColor='#d2d2d2' onChangeText={(outer) => setEtc(outer)}
                                        maxLength={10}
                                        style={{ width: '40%', paddingVertical: 4, borderBottomWidth: 1, position: 'absolute', bottom: 0, left: '28%' }} /> : null}
                            </View>
                            <View style={{ width: '100%', height: 80 }} />
                        </ScrollView>
                        <FloatingButton title='다음' navigation={navigation} index='Survey3' category='need_outer' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey2;