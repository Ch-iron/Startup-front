import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro4 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [selfwrite, setSelfwrite] = useState(false);
    const [contents, setContents] = useState('선택안함');
    const [next, setNext] = useState(false);
    const data = [
        {
            label: '학생',
            value: 1,
        },
        {
            label: '인턴',
            value: 2,
        },
        {
            label: '직장인',
            value: 3,
        },
        {
            label: '자영업자',
            value: 4,
        },
        {
            label: '군인',
            value: 5,
        },
        {
            label: '기타',
            value: 6,
        },
    ];

    useEffect(() => {
        // console.log(contents);
        if (contents === '학생' || contents === '인턴' || contents === '직장인' || contents === '자영업자' || contents === '군인') {
            setSelfwrite(false);
            setNext(true);
        }
        else if (contents === '선택안함') {
            setSelfwrite(false);
            setNext(false);
        }
        else if (contents === '기타') {
            setSelfwrite(true);
            setNext(false);
        }
        if (contents.length === 0) {
            setNext(false);
        }
    }, [contents]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <View style={{ height: '15%', }}/>
                        <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>무슨 일을 하시나요?</Text>
                            <View style={{ width: '80%', marginTop: 10, }}>
                                <RadioButtonRN data={data} selectedBtn={(answer) => {
                                    setContents(answer.label);
                                }} textStyle={{ fontSize: 20 }} activeColor='#464646'
                                    animationTypes={['shake']} duration={100} boxStyle={{ borderWidth: 0, paddingVertical: 8 }} />
                                {selfwrite === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='직접입력' placeholderTextColor='#d2d2d2' onChangeText={(job) => {
                                        setContents(job);
                                        setNext(true);
                                    }}
                                        maxLength={10}
                                        style={{ width: '40%', paddingVertical: 4, borderBottomWidth: 1, position: 'absolute', bottom: 0, left: '28%' }} /> : null}
                            </View>
                        </View>
                        <FloatingButton title='다음' navigation={navigation} index='Intro5' category='job' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Intro4;