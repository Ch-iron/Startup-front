import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Survey8 = ({ navigation, }) => {
    const [bottomfit, setBottomfit] = useState('');
    const [istouched1, setIstouched1] = useState(false);
    const [istouched2, setIstouched2] = useState(false);
    const [istouched3, setIstouched3] = useState(false);
    const [istouched4, setIstouched4] = useState(false);
    const [istouched5, setIstouched5] = useState(false);
    const [etc, setEtc] = useState('');
    const [next, setNext] = useState(false);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const contents = {
        fit: bottomfit,
        etc: etc,
    }

    useEffect(() => {
        console.log(contents);
        if (contents.fit.length > 0) {
            if (contents.fit.includes('기타')) {
                if (contents.etc.length >= 1) setNext(true);
                else if (contents.etc.length === 0) setNext(false);
            }
            else setNext(true);
        }
        else setNext(false);
    }, [contents]);

    const image_wide = require('../../../../../assets/widefit.png');
    const image_regular = require('../../../../../assets/regularfit.png');
    const image_taifud = require('../../../../../assets/taifudfit.png');
    const image_slim = require('../../../../../assets/slimfit.png');

    const Fit = ({ istouched, setIstouched, fit, fit_des, image }) => {
        return (
            <TouchableOpacity style={{ justfyContent: 'flex-start', alignItems: 'center', width: '100%', aspectRatio: 1 / 1, }}
                onPress={() => {
                    if (!istouched) {
                        setIstouched(true);
                        setBottomfit([...bottomfit, fit]);
                    }
                    else {
                        setIstouched(false);
                        setBottomfit(bottomfit.filter((fits) => fits !== fit))
                    }
                }} activeOpacity={0.8}>
                <View style={{ width: '70%', height: '80%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image style={{ width: '100%', height: '100%' }} source={image} resizeMode='cover' />
                    {istouched === true ? <Icon name='checkmark-circle' size={35} style={{ position: 'absolute', right: 0, top: 0 }} /> : null}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                    <Text style={{ fontSize: 30, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>{fit}</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>{fit_des}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 135, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <Text style={{ width: '80%', fontSize: 35, marginVertical: 20, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>원하는 하의 핏을 골라주세요</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Fit istouched={istouched1} setIstouched={setIstouched1} fit='와이드' fit_des='허벅지부터 밑단까지 크게 떨어지는 핏' image={image_wide} />
                            <Fit istouched={istouched2} setIstouched={setIstouched2} fit='레귤러' fit_des='허벅지부터 밑단까지 일정하게 떨어지는 핏' image={image_regular} />
                            <Fit istouched={istouched3} setIstouched={setIstouched3} fit='테이퍼드' fit_des='전체적으로 여유있지만 아래로 가면서 좁아지는 핏' image={image_taifud} />
                            <Fit istouched={istouched4} setIstouched={setIstouched4} fit='슬림' fit_des='전체적으로 슬림하고 딱 맞게 실루엣이 잡힌 핏' image={image_slim} />
                            <View style={{ justfyContent: 'center', alignItems: 'center', width: '100%', }}>
                                <TouchableOpacity onPress={() => {
                                    if (!istouched5) {
                                        setIstouched5(true);
                                        setBottomfit([...bottomfit, '기타']);
                                    }
                                    else {
                                        setIstouched5(false);
                                        setEtc('');
                                        setBottomfit(bottomfit.filter((fit) => fit !== '기타'))
                                    }
                                }}>
                                    <View flexDirection='row' style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>기타 </Text>
                                        <Text style={{ color: '#8c8c8c', fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>(터치해주세요)</Text>
                                        {istouched5 === true ?
                                            <Icon name='checkmark-circle' size={35} style={{ marginLeft: 10 }} /> : null}
                                    </View>
                                </TouchableOpacity>
                                {istouched5 === true ? <TextInput color='#000000' fontSize={18} placeholder="직접 입력해주세요." placeholderTextColor='#d2d2d2' multiline={true}
                                    maxLength={100} textAlignVertical='top' onChangeText={(fit) => setEtc(fit)}
                                    style={{ width: '70%', aspectRatio: 2.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} /> : null}

                            </View>
                            <View style={{ width: '100%', height: 80 }}></View>
                        </ScrollView>
                        <FloatingButton title='다음' navigation={navigation} index='Survey9' category='wanted_fitting_bottom' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey8;