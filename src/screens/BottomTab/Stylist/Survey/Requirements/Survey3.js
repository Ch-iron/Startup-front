import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Survey3 = ({ navigation, }) => {
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
    const [istouched11, setIstouched11] = useState(false);
    const [istouched12, setIstouched12] = useState(false);
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

    const image_top = require('../../../../../assets/denim-jacket.png');

    const Category = ({ istouched, setIstouched, classify, image }) => {
        return (
            <TouchableOpacity style={{ width: '25%', aspectRatio: 1 / 1.4, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                if (!istouched) {
                    if (needlist.length === 3) {
                        setIstouched(false);
                    }
                    else {
                        setIstouched(true);
                        setIstouched10(false);
                        setIstouched11(false);
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
                    setNeedlist(needlist.filter((top) => top !== classify))
                }
            }}>
                <View style={{
                    width: '100%', aspectRatio: 1 / 1, backgroundColor: istouched === true ? '#d2d2d2' : '#ffffff',
                    borderWidth: 1, borderColor: '#d2d2d2', borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                }}>
                    <Image source={image} style={{ height: '70%', aspectRatio: 1 / 1 }} />
                </View>
                <Text style={{
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
                            <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>원하는 상의 종류</Text>
                            <Text style={{ width: '80%', fontSize: 20, fontFamily: 'NotoSansKR-Regular', color: '#8c8c8c', includeFontPadding: false, }}>최대 3가지 선택 가능</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <Category istouched={istouched1} setIstouched={setIstouched1} classify='반팔 티셔츠' image={image_top} />
                                <Category istouched={istouched2} setIstouched={setIstouched2} classify='긴팔 티셔츠' image={image_top} />
                                <Category istouched={istouched3} setIstouched={setIstouched3} classify='반팔 셔츠' image={image_top} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <Category istouched={istouched4} setIstouched={setIstouched4} classify='긴팔 셔츠' image={image_top} />
                                <Category istouched={istouched5} setIstouched={setIstouched5} classify='피케/카라 티셔츠' image={image_top} />
                                <Category istouched={istouched6} setIstouched={setIstouched6} classify='맨투맨' image={image_top} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <Category istouched={istouched7} setIstouched={setIstouched7} classify='후드' image={image_top} />
                                <Category istouched={istouched8} setIstouched={setIstouched8} classify='니트/스웨터' image={image_top} />
                                <Category istouched={istouched9} setIstouched={setIstouched9} classify='니트 베스트' image={image_top} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
                                <TouchableOpacity style={{ width: '25%', aspectRatio: 1 / 1.4, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                                    if (!istouched10) {
                                        setIstouched10(true);
                                        setIstouched1(false);
                                        setIstouched2(false);
                                        setIstouched3(false);
                                        setIstouched4(false);
                                        setIstouched5(false);
                                        setIstouched6(false);
                                        setIstouched7(false);
                                        setIstouched8(false);
                                        setIstouched9(false);
                                        setIstouched11(false);
                                        setIstouched12(false);
                                        setNeedlist(['알아서 해주세요!']);
                                        setEtc('');
                                    }
                                    else {
                                        setIstouched10(false);
                                        setNeedlist(needlist.filter((top) => top !== '알아서 해주세요!'))
                                    }
                                }}>
                                    <View style={{
                                        width: '100%', aspectRatio: 1 / 1, backgroundColor: istouched10 === true ? '#d2d2d2' : '#ffffff',
                                        borderWidth: 1, borderColor: '#d2d2d2', borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Image source={require('../../../../../assets/denim-jacket.png')} style={{ height: '70%', aspectRatio: 1 / 1 }} />
                                    </View>
                                    <Text style={{
                                        fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, paddingVertical: 10
                                    }}>알아서 해주세요!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '25%', aspectRatio: 1 / 1.4, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                                    if (!istouched11) {
                                        setIstouched11(true);
                                        setIstouched1(false);
                                        setIstouched2(false);
                                        setIstouched3(false);
                                        setIstouched4(false);
                                        setIstouched5(false);
                                        setIstouched6(false);
                                        setIstouched7(false);
                                        setIstouched8(false);
                                        setIstouched9(false);
                                        setIstouched10(false);
                                        setIstouched12(false);
                                        setNeedlist(['필요없어요!']);
                                        setEtc('');
                                    }
                                    else {
                                        setIstouched11(false);
                                        setNeedlist(needlist.filter((top) => top !== '필요없어요!'))
                                    }
                                }}>
                                    <View style={{
                                        width: '100%', aspectRatio: 1 / 1, backgroundColor: istouched11 === true ? '#d2d2d2' : '#ffffff',
                                        borderWidth: 1, borderColor: '#d2d2d2', borderRadius: 100, justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <Image source={require('../../../../../assets/denim-jacket.png')} style={{ height: '70%', aspectRatio: 1 / 1 }} />
                                    </View>
                                    <Text style={{
                                        fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, paddingVertical: 10
                                    }}>필요없어요!</Text>
                                </TouchableOpacity>
                                <View style={{ width: '25%', aspectRatio: 1 / 1.4, }}></View>
                            </View>
                            <View flexDirection='row' style={{ width: '100%', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: '100%', }} onPress={() => {
                                    if (!istouched12) {
                                        if (needlist.length === 3) {
                                            setIstouched12(false);
                                        }
                                        else {
                                            setIstouched12(true);
                                            setIstouched10(false);
                                            setIstouched11(false);
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
                                        setIstouched12(false);
                                        setNeedlist(needlist.filter((top) => top !== '기타'))
                                    }
                                }}>
                                    <View flexDirection='row' style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                                        {istouched12 === false ?
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
                                {istouched12 === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='직접입력' placeholderTextColor='#d2d2d2' onChangeText={(top) => setEtc(top)}
                                        maxLength={10}
                                        style={{ width: '40%', paddingVertical: 4, borderBottomWidth: 1, position: 'absolute', bottom: 0, left: '28%' }} /> : null}
                            </View>
                            <View style={{ width: '100%', height: 80 }} />
                        </ScrollView>
                        <FloatingButton title='다음' navigation={navigation} index='Survey4' category='need_top' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey3;