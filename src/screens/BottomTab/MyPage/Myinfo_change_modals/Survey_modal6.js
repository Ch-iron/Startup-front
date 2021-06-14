import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-easy-toast';

const Survey_modal6 = ({ answer1, answer2, setAnswer1, setAnswer2, modalVisible, setModalVisible }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [height, setHeight] = useState(answer1);
    const [weight, setWeight] = useState(answer2);

    const contents = {
        height: height,
        weight: weight
    }

    useEffect(() => {
        if (height === '') {
            setHeight(answer1);
        }
        if (weight === '') {
            setWeight(answer2);
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
                        <View style={{ height: '15%', }}/>
                        <View style={{ width: '100%', minHeight: 400, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ width: '80%', textAlign: 'center', fontSize: 34, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>키와 몸무게를 입력해주세요.</Text>
                            <View style={{ width: '80%', }}>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                    <TextInput color='#000000' placeholder="키(cm)" placeholderTextColor='#d2d2d2' keyboardType='numeric' onChangeText={(height) => setHeight(height)}
                                        style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 20, width: '100%' }} />
                                    {contents.height.length > 0 ? <Text style={{ fontSize: 20, position: 'absolute', right: 0 }}>cm</Text> : null}
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                    <TextInput color='#000000' placeholder="몸무게(kg)" placeholderTextColor='#d2d2d2' keyboardType='numeric' onChangeText={(weight) => setWeight(weight)}
                                        style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 20, width: '100%' }} />
                                    {contents.weight.length > 0 ? <Text style={{ fontSize: 20, position: 'absolute', right: 0 }}>kg</Text> : null}
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setAnswer1(contents.height);
                            setAnswer2(contents.weight);
                            setModalVisible(false);
                        }}
                            style={{
                                justifyContent: 'center', alignItems: 'center', width: '70%', height: '7%',
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

export default Survey_modal6;