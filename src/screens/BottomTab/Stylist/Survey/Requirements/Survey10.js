import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Survey10 = ({ navigation, }) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const [contents, setContents] = useState('');
    const [next, setNext] = useState(false);

    useEffect(() => {
        console.log(contents)
        if (contents.length > 0) setNext(true);
        else setNext(false);
    }, [contents])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <View style={{ height: '10%' }}/>
                        <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', }}>스타일리스트에게{'\n'}하고 싶은 말이 있으면 입력해 주세요.</Text>
                        <TextInput color='#000000' fontSize={18} placeholder="예시) '피부톤', '소개팅룩이 필요해요', '과감한 스타일은 싫어요'... 등등" placeholderTextColor='#d2d2d2' multiline={true}
                            maxLength={100} textAlignVertical='top' onChangeText={(request) => setContents(request)}
                            style={{ width: '80%', aspectRatio: 1.5 / 1, paddingVertical: 4, borderWidth: 1, borderColor: '#969696' }} />
                        <FloatingButton title='다음' navigation={navigation} index='Final_Survey' category='requirements' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey10;