import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro2 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [contents, setContents] = useState(0);
    const [next, setNext] = useState(false);
    const data = [
        {
            label: '매우 많이 한다.',
            value: 1
        },
        {
            label: '조금 한다.',
            value: 2
        },
        {
            label: '거의 하지 않는다.',
            value: 3
        },
    ];

    useEffect(() => {
        // console.log(contents)
    }, [contents])

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='설문조사' navigation={navigation} isMain={false} />
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <View style={{ height: '15%', }}/>
                <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ width: '80%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>쇼핑을 위해 시간과 노력을 얼마나 투자하시나요?</Text>
                    <View style={{ width: '80%', marginTop: 10 }}>
                        <RadioButtonRN data={data} selectedBtn={(answer) => {
                            setContents(answer.value);
                            setNext(true);
                        }} textStyle={{ fontSize: 20 }} activeColor='#464646'
                            animationTypes={['shake']} duration={100} boxStyle={{ borderWidth: 0, paddingVertical: 8 }} />
                    </View>
                </View>
                <FloatingButton title='다음' navigation={navigation} index='Intro3' category='shopping_effort' contents={contents} next={next} />
            </View>
        </View>
    );
}

export default Intro2;