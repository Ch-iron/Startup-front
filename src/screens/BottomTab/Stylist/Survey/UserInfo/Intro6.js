import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro6 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [next, setNext] = useState(false);

    const contents = {
        height: height,
        weight: weight
    }

    useEffect(() => {
        // console.log(contents);
        if (contents.height > 0 && contents.weight > 0) setNext(true);
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
                        <View style={{ height: '15%', }}/>
                        <View style={{ width: '100%', minHeight: 400, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ width: '80%', textAlign: 'center', fontSize: 34, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, textAlign: 'center'}}>키와 몸무게를 입력해주세요.</Text>
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
                        <FloatingButton title='다음' navigation={navigation} index='Intro7' category='body_info' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Intro6;