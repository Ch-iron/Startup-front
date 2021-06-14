import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-easy-toast';

const Survey_modal4 = ({ answer, setAnswer, modalVisible, setModalVisible }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [selfwrite, setSelfwrite] = useState(false);
    const [contents, setContents] = useState(answer);
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
        console.log(contents);
        if (contents === '학생' || contents === '인턴' || contents === '직장인' || contents === '자영업자' || contents === '군인') {
            setSelfwrite(false);
        }
        else if (contents === '선택안함') {
            setSelfwrite(false);
        }
        else if (contents === '기타') {
            setSelfwrite(true);
        }
    }, [contents]);

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
                        {contents !== '기타' || contents === '' ?
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', left: 16 }}>
                                <Icon name='chevron-back' size={33} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => toast.show('기타 직업을 입력해주세요!')} style={{ position: 'absolute', left: 16 }}>
                                <Icon name='chevron-back' size={33} />
                                <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={-50} />
                            </TouchableOpacity>
                        }
                        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>개인 정보 수정</Text>
                    </View>
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
                                    }}
                                        maxLength={10}
                                        style={{ width: '40%', paddingVertical: 4, borderBottomWidth: 1, position: 'absolute', bottom: 0, left: '28%' }} /> : null}
                            </View>
                        </View>
                        {contents !== '기타' || contents === '' ?
                            <TouchableOpacity onPress={() => {
                                setAnswer(contents);
                                setModalVisible(false);
                            }}
                                style={{
                                    justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                                    position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                                }}>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>완료</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                toast.show('기타 직업을 입력해주세요!');
                            }}
                                style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: 50, position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30, }}>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }} >완료</Text>
                                <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={-50} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey_modal4;