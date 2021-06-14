import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Survey7 = ({ navigation, }) => {
    const [topfit, setTopfit] = useState([]);
    const [istouched1, setIstouched1] = useState(false);
    const [istouched2, setIstouched2] = useState(false);
    const [istouched3, setIstouched3] = useState(false);
    const [istouched4, setIstouched4] = useState(false);
    const [etc, setEtc] = useState('');
    const [next, setNext] = useState(false);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const contents = {
        fit: topfit,
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

    const image_regular = require('../../../../../assets/regular.png');
    const image_over = require('../../../../../assets/over.png');
    const image_slim = require('../../../../../assets/slim.png');

    const Fit = ({ istouched, setIstouched, fit, fit_des, image }) => {
        return (
            <TouchableOpacity style={{ justfyContent: 'flex-start', alignItems: 'center', width: '100%', aspectRatio: 1 / 1, }}
                onPress={() => {
                    if (!istouched) {
                        setIstouched(true);
                        setTopfit([...topfit, fit]);
                    }
                    else {
                        setIstouched(false);
                        setTopfit(topfit.filter((fits) => fits !== fit))
                    }
                }} activeOpacity={0.8}>
                <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: '100%', height: '80%' }} source={image} resizeMode='cover' />
                    {istouched === true ? <Icon name='checkmark-circle' size={35} style={{ position: 'absolute', right: 0, top: 0 }} /> : null}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
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
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <Text style={{ width: '80%', marginVertical: 20, fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>원하는 상의 핏을 골라주세요</Text>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Fit istouched={istouched1} setIstouched={setIstouched1} fit='레귤러핏' fit_des='편안하고 넉넉한 핏' image={image_regular} />
                            <Fit istouched={istouched2} setIstouched={setIstouched2} fit='오버핏' fit_des='몸매가 부각되지 않는 핏' image={image_over} />
                            <Fit istouched={istouched3} setIstouched={setIstouched3} fit='슬림핏' fit_des='몸에 딱 맞는 스타일로 슬림한 핏' image={image_slim} />
                            <View style={{ justfyContent: 'center', alignItems: 'center', width: '100%', }}>
                                <TouchableOpacity onPress={() => {
                                    if (!istouched4) {
                                        setIstouched4(true);
                                        setTopfit([...topfit, '기타']);
                                    }
                                    else {
                                        setIstouched4(false);
                                        setEtc('');
                                        setTopfit(topfit.filter((fit) => fit !== '기타'))
                                    }
                                }}>
                                    <View flexDirection='row' style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>기타 </Text>
                                        <Text style={{ color: '#8c8c8c', fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>(터치해주세요)</Text>
                                        {istouched4 === true ?
                                            <Icon name='checkmark-circle' size={35} style={{ marginLeft: 10 }} /> : null}
                                    </View>
                                </TouchableOpacity>
                                {istouched4 === true ? <TextInput color='#000000' fontSize={18} placeholder='직접 입력해주세요.' placeholderTextColor='#d2d2d2' multiline={true}
                                    maxLength={100} textAlignVertical='top' onChangeText={(fit) => setEtc(fit)}
                                    style={{ width: '70%', aspectRatio: 2.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} /> : null}
                            </View>
                            <View style={{ width: '100%', height: 80 }} />
                        </ScrollView>
                        <FloatingButton title='다음' navigation={navigation} index='Survey8' category='wanted_fitting_top' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey7;