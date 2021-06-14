import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro8 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [contents, setContents] = useState(0);
    const [next, setNext] = useState(false);

    useEffect(() => {
        // console.log(contents);
        if (contents > 0) setNext(true);
        else setNext(false);
    }, [contents]);

    const onPress = (index) => {
        setContents(index);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='설문조사' navigation={navigation} isMain={false} />
            {/* Body */}
            <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Text style={{ width: '80%', fontSize: 34, marginVertical: 20, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>본인의 체형과 비슷한 그림을 선택해주세요.</Text>
                <ScrollView style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View flexDirection='row' style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center',}}>
                        <TouchableOpacity onPress={() => onPress(1)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginRight: 10,
                            backgroundColor: contents === 1 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../../assets/slimbody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>마른형</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(2)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                            backgroundColor: contents === 2 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../../assets/averagebody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>평균형</Text>
                        </TouchableOpacity>
                    </View>
                    <View flexDirection='row' style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => onPress(3)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginRight: 10,
                            backgroundColor: contents === 3 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../../assets/musclebody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>근육형</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(4)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                            backgroundColor: contents === 4 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../../assets/strongbody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>건장형</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 80 }} />
                </ScrollView>
                <FloatingButton title='다음' navigation={navigation} index='Intro9' category='body_shape' contents={contents} next={next} />
            </View>
        </View>
    );
}

export default Intro8;