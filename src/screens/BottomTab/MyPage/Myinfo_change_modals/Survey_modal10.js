import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Survey_modal10 = ({ answer1, answer2, setAnswer1, setAnswer2, modalVisible, setModalVisible }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [complex_top, setComplex_top] = useState(answer1);
    const [complex_bottom, setComplex_bottom] = useState(answer2);

    const complex_top_ex = '예시) \'배가 많이 나왔어요\', \'어깨가 좁아요\'... 등등\n없으면 없다고 적어주세요!';
    const complex_bottom_ex = '예시) \'허벅지가 두꺼워요\', \'많이 가늘어요\'... 등등\n없으면 없다고 적어주세요!';

    const contents = {
        complex_top: complex_top,
        complex_bottom: complex_bottom
    }

    useEffect(() => {
        if (complex_top === '') {
            setComplex_top(answer1);
        }
        if (complex_bottom === '') {
            setComplex_bottom(answer2);
        }
    }, [contents])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <View style={{
                        minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                        justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
                    }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', left: 16 }}>
                            <Icon name='chevron-back' size={33} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>개인 정보 수정</Text>
                    </View>
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <View style={{ height: '5%', }} />
                        <Text style={{ width: '80%', fontSize: 30, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, marginBottom: 10 }}>상체에 콤플렉스가 있으신가요?</Text>
                        <TextInput color='#000000' fontSize={18} placeholder={complex_top_ex} placeholderTextColor='#d2d2d2' multiline={true}
                            maxLength={100} textAlignVertical='top'
                            style={{ width: '80%', aspectRatio: 2.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} onChangeText={(complex) => setComplex_top(complex)} />
                        <View style={{ height: '3%', }} />
                        <Text style={{ width: '80%', fontSize: 30, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, marginBottom: 10 }}>하체에 콤플렉스가 있으신가요?</Text>
                        <TextInput color='#000000' fontSize={18} placeholder={complex_bottom_ex} placeholderTextColor='#d2d2d2' multiline={true}
                            maxLength={100} textAlignVertical='top'
                            style={{ width: '80%', aspectRatio: 2.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} onChangeText={(complex) => setComplex_bottom(complex)} />
                        <TouchableOpacity onPress={() => {
                            setAnswer1(contents.complex_top);
                            setAnswer2(contents.complex_bottom);
                            setModalVisible(false);
                        }}
                            style={{
                                justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                                position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                            }}>
                            <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey_modal10;