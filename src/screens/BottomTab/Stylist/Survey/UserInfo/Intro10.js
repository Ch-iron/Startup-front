import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro10 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [complex_top, setComplex_top] = useState('');
    const [complex_bottom, setComplex_bottom] = useState('');
    const [next, setNext] = useState(false);

    const complex_top_ex = '예시) \'배가 많이 나왔어요\', \'어깨가 좁아요\'... 등등\n없으면 없다고 적어주세요!';
    const complex_bottom_ex = '예시) \'허벅지가 두꺼워요\', \'많이 가늘어요\'... 등등\n없으면 없다고 적어주세요!';

    const contents = {
        complex_top: complex_top,
        complex_bottom: complex_bottom
    }

    useEffect(() => {
        // console.log(contents);
        if (contents.complex_top.length > 0 && contents.complex_bottom.length > 0) setNext(true);
        else setNext(false);
    }, [contents])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <View style={{ height: '5%', }}/>
                        <Text style={{ width: '80%', fontSize: 30, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, marginBottom: 10 }}>상체에 콤플렉스가 있으신가요?</Text>
                        <TextInput color='#000000' fontSize={18} placeholder={complex_top_ex} placeholderTextColor='#d2d2d2' multiline={true}
                            maxLength={100} textAlignVertical='top'
                            style={{ width: '80%', aspectRatio: 2.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} onChangeText={(complex) => setComplex_top(complex)} />
                        <View style={{ height: '3%', }}/>
                        <Text style={{ width: '80%', fontSize: 30, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, marginBottom: 10 }}>하체에 콤플렉스가 있으신가요?</Text>
                        <TextInput color='#000000' fontSize={18} placeholder={complex_bottom_ex} placeholderTextColor='#d2d2d2' multiline={true}
                            maxLength={100} textAlignVertical='top'
                            style={{ width: '80%', aspectRatio: 2.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} onChangeText={(complex) => setComplex_bottom(complex)} />
                        <FloatingButton title='다음' navigation={navigation} index='Intro11' category='complex' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Intro10;