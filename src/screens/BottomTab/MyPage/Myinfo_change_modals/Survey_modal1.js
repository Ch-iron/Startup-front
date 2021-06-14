import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Survey_modal1 = ({ answer, setAnswer, modalVisible, setModalVisible }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [contents, setContents] = useState(answer);
    const data = [
        {
            label: '네. 쇼핑을 즐겨합니다.',
            value: 1
        },
        {
            label: '그럭저럭?',
            value: 2
        },
        {
            label: '아니요. 쇼핑을 즐겨하지 않습니다.',
            value: 3
        },
    ];

    useEffect(() => {
        console.log(answer)
    }, [answer])

    return (
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
                <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>쇼핑을 즐기는 편이신가요?</Text>
                    <View style={{ width: '80%', marginTop: 10 }}>
                        <RadioButtonRN data={data} selectedBtn={(answer) => {
                            setContents(answer.value);
                        }} textStyle={{ fontSize: 20 }} activeColor='#464646'
                            animationTypes={['shake']} duration={100} boxStyle={{ borderWidth: 0, paddingVertical: 8 }} />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    setAnswer(contents);
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
    );
}

export default Survey_modal1;