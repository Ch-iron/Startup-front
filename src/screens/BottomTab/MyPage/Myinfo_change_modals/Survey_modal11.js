import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Survey_modal11 = ({ answer, setAnswer, modalVisible, setModalVisible }) => {
    const [istouched1, setIstouched1] = useState(false);
    const [istouched2, setIstouched2] = useState(false);
    const [istouched3, setIstouched3] = useState(false);
    const [istouched4, setIstouched4] = useState(false);
    const [istouched5, setIstouched5] = useState(false);
    const [istouched6, setIstouched6] = useState(false);
    const [istouched7, setIstouched7] = useState(false);
    const [istouched8, setIstouched8] = useState(false);
    const [istouched9, setIstouched9] = useState(false);
    const [istouched10, setIstouched10] = useState(false);
    const [istouched11, setIstouched11] = useState(false);
    const [istouched12, setIstouched12] = useState(false);

    const [contents, setContents] = useState(answer);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log(contents);

    useEffect(() => {
        contents.map((look) => {
            parseInt(look);
            if (look === '1') setIstouched1(true);
            else if (look === '2') setIstouched2(true);
            else if (look === '3') setIstouched3(true);
            else if (look === '4') setIstouched4(true);
            else if (look === '5') setIstouched5(true);
            else if (look === '6') setIstouched6(true);
            else if (look === '7') setIstouched7(true);
            else if (look === '8') setIstouched8(true);
            else if (look === '9') setIstouched9(true);
            else if (look === '10') setIstouched10(true);
            else if (look === '11') setIstouched11(true);
            else if (look === '12') setIstouched12(true);
        })
    }, []);

    useEffect(() => {
        if (contents.length === 0) {
            setContents(answer);
        }
        console.log(contents);
    }, [contents]);

    const image1 = require('../../../../assets/style1.png');
    const image2 = require('../../../../assets/style2.png');
    const image3 = require('../../../../assets/style3.png');
    const image4 = require('../../../../assets/style4.png');
    const image5 = require('../../../../assets/style5.png');
    const image6 = require('../../../../assets/style6.png');
    const image7 = require('../../../../assets/style7.png');
    const image8 = require('../../../../assets/style8.png');
    const image9 = require('../../../../assets/style9.png');
    const image10 = require('../../../../assets/style10.png');
    const image11 = require('../../../../assets/style11.png');
    const image12 = require('../../../../assets/style12.png');

    const Look = ({ istouched, setIstouched, imagesource, index, }) => {
        return (
            <TouchableOpacity style={{ width: '49%', aspectRatio: 1 / 1, marginHorizontal: 2, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    if (!istouched) {
                        setIstouched(true);
                        setContents([...contents, index]);
                    }
                    else {
                        setIstouched(false);
                        setContents(contents.filter((style) => style !== index))
                    }
                }} activeOpacity={0.8}>
                <Image source={imagesource} style={{ width: '100%', height: '100%', }} />
                {istouched === true ? <Icon name='checkmark-circle' size={35} style={{ position: 'absolute', top: 0, right: 0 }} /> : null}
            </TouchableOpacity>
        );
    }

    const Row = ({ touched1, touched2, setIstouched1, setIstouched2, image1, image2, index1, index2 }) => {
        return (
            <View flexDirection='row' style={{ marginBottom: 4 }}>
                <Look istouched={touched1} setIstouched={setIstouched1} imagesource={image1} index={index1} />
                <Look istouched={touched2} setIstouched={setIstouched2} imagesource={image2} index={index2} />
            </View>
        );
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
                <View style={{ width: '100%', marginVertical: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ width: '80%', fontSize: 30, textAlign: 'center', fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>선호하는 스타일을 골라주세요.</Text>
                    <Text style={{ width: '80%', textAlign: 'center', fontSize: 18, fontFamily: 'NotoSansKR-Medium', color: '#8c8c8c', includeFontPadding: false, }}>(복수선택가능)</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: '100%', height: windowHeight, }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Row touched1={istouched1} touched2={istouched2} setIstouched1={setIstouched1} setIstouched2={setIstouched2} image1={image1} image2={image2} index1='1' index2='2' />
                    <Row touched1={istouched3} touched2={istouched4} setIstouched1={setIstouched3} setIstouched2={setIstouched4} image1={image3} image2={image4} index1='3' index2='4' />
                    <Row touched1={istouched5} touched2={istouched6} setIstouched1={setIstouched5} setIstouched2={setIstouched6} image1={image5} image2={image6} index1='5' index2='6' />
                    <Row touched1={istouched7} touched2={istouched8} setIstouched1={setIstouched7} setIstouched2={setIstouched8} image1={image7} image2={image8} index1='7' index2='8' />
                    <Row touched1={istouched9} touched2={istouched10} setIstouched1={setIstouched9} setIstouched2={setIstouched10} image1={image9} image2={image10} index1='9' index2='10' />
                    <Row touched1={istouched11} touched2={istouched12} setIstouched1={setIstouched11} setIstouched2={setIstouched12} image1={image11} image2={image12} index1='11' index2='12' />
                    <View style={{ width: '100%', height: 80 }}/>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    setAnswer(contents);
                    setModalVisible(false);
                }}
                    style={{
                        justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                        position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                    }}>
                    <Text style={{ color: '#ffffff', fontSize:20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Survey_modal11;