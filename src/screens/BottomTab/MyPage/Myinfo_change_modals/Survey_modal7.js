import React, { useState, useEffect, } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Survey_modal7 = ({ answer1, setAnswer1, answer2, setAnswer2, answer3, setAnswer3, answer4, setAnswer4, answer5, setAnswer5, answer6, setAnswer6, modalVisible, setModalVisible }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [size_top, setSize_top] = useState(answer1);
    const [feeling_top, setFeeling_top] = useState(answer2);
    const [size_waist, setSize_waist] = useState(answer3);
    const [feeling_waist, setFeeling_waist] = useState(answer4);
    const [size_outer, setSize_outer] = useState(answer5);
    const [size_shoes, setSize_shoes] = useState(answer6);

    const contents = {
        size_top: size_top,
        feeling_top: feeling_top,
        size_waist: size_waist,
        feeling_waist: feeling_waist,
        size_outer: size_outer,
        size_shoes: size_shoes,
    }

    const topData = [
        {
            id: 1,
            data: 90
        },
        {
            id: 2,
            data: 95
        },
        {
            id: 3,
            data: 100
        },
        {
            id: 4,
            data: 105
        },
        {
            id: 5,
            data: 110
        },
    ];

    const bottomData = [
        {
            id: 1,
            data: 28
        },
        {
            id: 2,
            data: 29
        },
        {
            id: 3,
            data: 30
        },
        {
            id: 4,
            data: 31
        },
        {
            id: 5,
            data: 32
        },
        {
            id: 6,
            data: 33
        },
        {
            id: 7,
            data: 34
        },
        {
            id: 8,
            data: 35
        },
        {
            id: 9,
            data: 36
        },
    ];

    const shoeData = [
        {
            id: 1,
            data: 250
        },
        {
            id: 2,
            data: 255
        },
        {
            id: 3,
            data: 260
        },
        {
            id: 4,
            data: 265
        },
        {
            id: 5,
            data: 270
        },
        {
            id: 6,
            data: 275
        },
        {
            id: 7,
            data: 280
        },
        {
            id: 8,
            data: 285
        },
        {
            id: 9,
            data: 290
        },
        {
            id: 10,
            data: 300
        },
    ];

    const feeling = [
        {
            id: 1,
            data: '??? ?????? ??????'
        },
        {
            id: 2,
            data: '??? ?????? ??????'
        },
        {
            id: 3,
            data: '?????? ?????? ??????'
        },
    ];

    const onPress = (category, index) => {
        if (category === '??????') {
            setSize_top(index)
        }
        else if (category === '????????????') {
            setFeeling_top(index)
        }
        else if (category === '??????') {
            setSize_waist(index)
        }
        else if (category === '????????????') {
            setFeeling_waist(index)
        }
        else if (category === '?????????') {
            setSize_outer(index)
        }
        else if (category === '??????') {
            setSize_shoes(index)
        }

    }

    const Button = ({ title, index, category }) => {
        return (
            <TouchableOpacity onPress={() => onPress(category, index)} style={{
                justifyContent: 'center', alignItems: 'center',
                paddingHorizontal: 16, paddingVertical: 8, marginLeft: index === 1 ? windowWidth / 14 + 10 : 10, marginRight: 4,
                borderWidth: 1, borderRadius: 30, borderColor: '#d2d2d2',
                backgroundColor:
                    category === '??????' ?
                        index === size_top ? '#d2d2d2' : '#ffffff' :
                        category === '????????????' ?
                            index === feeling_top ? '#d2d2d2' : '#ffffff' :
                            category === '??????' ?
                                index === size_waist ? '#d2d2d2' : '#ffffff' :
                                category === '????????????' ?
                                    index === feeling_waist ? '#d2d2d2' : '#ffffff' :
                                    category === '?????????' ?
                                        index === size_outer ? '#d2d2d2' : '#ffffff' :
                                        category === '??????' ?
                                            index === size_shoes ? '#d2d2d2' : '#ffffff' : '#ffffff'
            }} >
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>{title}</Text>
            </TouchableOpacity>
        );
    }

    // const ButtonScroll = ({ data, category }) => {
    //     return (
    //         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{ marginLeft: windowWidth / 14, }}>
    //             {data.map((choice) => {
    //                 return (
    //                     <Button title={choice.data} key={choice.id} index={choice.id} category={category} />
    //                 )
    //             })}
    //         </ScrollView>
    //     );
    // }

    // const Ask = ({ title, data, category }) => {
    //     return (
    //         <View style={{ height: '15%', width: '100%', }}>
    //             <Text style={{ fontSize: windowWidth / 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: windowWidth / 10, marginBottom: windowHeight / 50 }}>{title}</Text>
    //             <ButtonScroll data={data} category={category} />
    //         </View>
    //     );
    // }

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
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>?????? ?????? ??????</Text>
            </View>
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Text style={{ width: '80%', marginVertical: 20, fontSize: 34, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>????????? ??????</Text>
                <View style={{ flex: 1, width: '100%', }}>
                    <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'flex-start' }}>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>?????? ?????????</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='90' index={1} category='??????' />
                                <Button title='95' index={2} category='??????' />
                                <Button title='100' index={3} category='??????' />
                                <Button title='105' index={4} category='??????' />
                                <Button title='110' index={5} category='??????' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>?????? ???????????? ????????? ??? ?????? ????????????????</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='??? ?????? ??????' index={1} category='????????????' />
                                <Button title='??? ?????? ??????' index={2} category='????????????' />
                                <Button title='?????? ?????? ??????' index={3} category='????????????' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>?????? ?????????</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='28' index={1} category='??????' />
                                <Button title='29' index={2} category='??????' />
                                <Button title='30' index={3} category='??????' />
                                <Button title='31' index={4} category='??????' />
                                <Button title='32' index={5} category='??????' />
                                <Button title='33' index={6} category='??????' />
                                <Button title='34' index={7} category='??????' />
                                <Button title='35' index={8} category='??????' />
                                <Button title='36' index={9} category='??????' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>?????? ???????????? ????????? ??? ?????? ????????????????</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='??? ?????? ??????' index={1} category='????????????' />
                                <Button title='??? ?????? ??????' index={2} category='????????????' />
                                <Button title='?????? ?????? ??????' index={3} category='????????????' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>????????? ?????????</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='90' index={1} category='?????????' />
                                <Button title='95' index={2} category='?????????' />
                                <Button title='100' index={3} category='?????????' />
                                <Button title='105' index={4} category='?????????' />
                                <Button title='110' index={5} category='?????????' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>?????? ?????????</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='250' index={1} category='??????' />
                                <Button title='255' index={2} category='??????' />
                                <Button title='260' index={3} category='??????' />
                                <Button title='265' index={4} category='??????' />
                                <Button title='270' index={5} category='??????' />
                                <Button title='275' index={6} category='??????' />
                                <Button title='280' index={7} category='??????' />
                                <Button title='290' index={8} category='??????' />
                                <Button title='300' index={9} category='??????' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', height: 80 }} />
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => {
                    setAnswer1(contents.size_top);
                    setAnswer2(contents.feeling_top);
                    setAnswer3(contents.size_waist);
                    setAnswer4(contents.feeling_waist);
                    setAnswer5(contents.size_outer);
                    setAnswer6(contents.size_shoes);
                    setModalVisible(false);
                }}
                    style={{
                        justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                        position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                    }}>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>??????</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Survey_modal7;