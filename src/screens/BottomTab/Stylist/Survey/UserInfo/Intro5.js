import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro5 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [selfwrite, setSelfwrite] = useState(false);
    const [contents, setContents] = useState('선택안함');
    const [next, setNext] = useState(false);

    const data = [
        {
            label: '캐주얼(제한 없음)',
            value: 1,
        },
        {
            label: '유연한 비즈니스 캐주얼\n(티셔츠, 청바지 가능)',
            value: 2,
        },
        {
            label: '엄격한 비즈니스 캐주얼\n(셔츠, 면바지 or 슬랙스 필수)',
            value: 3,
        },
        {
            label: '정장',
            value: 4,
        },
        {
            label: '기타',
            value: 5,
        },
    ];

    useEffect(() => {
        // console.log(contents);
        if (contents === '캐주얼(제한 없음)' || contents === '유연한 비즈니스 캐주얼\n(티셔츠, 청바지 가능)' || contents === '엄격한 비즈니스 캐주얼\n(셔츠, 면바지 or 슬랙스 필수)' || contents === '정장') {
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
                        <View style={{ height: '15%', }}/>
                        <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>직장/학교에는 어떤 옷을 입고 가시나요?</Text>
                            <View style={{ width: '80%', marginTop: 10, }}>
                                <RadioButtonRN data={data} selectedBtn={(answer) => {
                                    setContents(answer.label);
                                }} textStyle={{ fontSize: 20 }} activeColor='#464646'
                                    animationTypes={['shake']} duration={100} boxStyle={{ borderWidth: 0, paddingVertical: 8 }} />

                                {selfwrite === true ?
                                    <TextInput color='#000000' fontSize={18} placeholder='직접입력' placeholderTextColor='#d2d2d2' onChangeText={(working_fashion) => {
                                        setContents(working_fashion);
                                        setNext(true);
                                    }}
                                        maxLength={10}
                                        style={{ width: '40%', paddingVertical: 4, borderBottomWidth: 1, position: 'absolute', bottom: 0, left: '28%' }} /> : null}

                            </View>
                        </View>
                        <FloatingButton title='다음' navigation={navigation} index='Intro6' category='working_fashion' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Intro5;