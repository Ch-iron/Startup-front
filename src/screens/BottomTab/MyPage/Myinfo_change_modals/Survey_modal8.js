import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Survey_modal8 = ({ answer, setAnswer, modalVisible, setModalVisible }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [contents, setContents] = useState(answer);

    const onPress = (index) => {
        setContents(index);
    }

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
            <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Text style={{ width: '80%', fontSize: 34, marginVertical: 20, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>본인의 체형과 비슷한 그림을 선택해주세요.</Text>
                <ScrollView style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View flexDirection='row' style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => onPress(1)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginRight: 10,
                            backgroundColor: contents === 1 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../assets/slimbody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>마른형</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(2)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                            backgroundColor: contents === 2 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../assets/averagebody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>평균형</Text>
                        </TouchableOpacity>
                    </View>
                    <View flexDirection='row' style={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => onPress(3)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginRight: 10,
                            backgroundColor: contents === 3 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../assets/musclebody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>근육형</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(4)} style={{
                            width: '35%', height: '90%', borderWidth: 1.5, borderRadius: 10, borderColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', marginLeft: 10,
                            backgroundColor: contents === 4 ? '#dcdcdc' : '#ffffff'
                        }}>
                            <Image source={require('../../../../assets/strongbody.png')} style={{ width: '80%', height: '60%' }} />
                            <Text style={{ fontFamily: 'NotoSansKR-Regular', fontSize: 26, includeFontPadding: false, marginTop: 10 }}>건장형</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 80 }} />
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    setAnswer(contents);
                    setModalVisible(false);
                }}
                    style={{
                        justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                        position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                    }}>
                    <Text style={{ color: '#ffffff', fontSize: windowWidth / 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Survey_modal8;