import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';

const Intro7 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [size_top, setSize_top] = useState(0);
    const [feeling_top, setFeeling_top] = useState(0);
    const [size_waist, setSize_waist] = useState(0);
    const [feeling_waist, setFeeling_waist] = useState(0);
    const [size_outer, setSize_outer] = useState(0);
    const [size_shoes, setSize_shoes] = useState(0);
    const [next, setNext] = useState(false);

    const contents = {
        size_top: size_top,
        feeling_top: feeling_top,
        size_waist: size_waist,
        feeling_waist: feeling_waist,
        size_outer: size_outer,
        size_shoes: size_shoes,
    }

    // const topData = [
    //     {
    //         id: 1,
    //         data: 90
    //     },
    //     {
    //         id: 2,
    //         data: 95
    //     },
    //     {
    //         id: 3,
    //         data: 100
    //     },
    //     {
    //         id: 4,
    //         data: 105
    //     },
    //     {
    //         id: 5,
    //         data: 110
    //     },
    // ];

    // const bottomData = [
    //     {
    //         id: 1,
    //         data: 28
    //     },
    //     {
    //         id: 2,
    //         data: 29
    //     },
    //     {
    //         id: 3,
    //         data: 30
    //     },
    //     {
    //         id: 4,
    //         data: 31
    //     },
    //     {
    //         id: 5,
    //         data: 32
    //     },
    //     {
    //         id: 6,
    //         data: 33
    //     },
    //     {
    //         id: 7,
    //         data: 34
    //     },
    //     {
    //         id: 8,
    //         data: 35
    //     },
    //     {
    //         id: 9,
    //         data: 36
    //     },
    // ];

    // const shoeData = [
    //     {
    //         id: 1,
    //         data: 250
    //     },
    //     {
    //         id: 2,
    //         data: 255
    //     },
    //     {
    //         id: 3,
    //         data: 260
    //     },
    //     {
    //         id: 4,
    //         data: 265
    //     },
    //     {
    //         id: 5,
    //         data: 270
    //     },
    //     {
    //         id: 6,
    //         data: 275
    //     },
    //     {
    //         id: 7,
    //         data: 280
    //     },
    //     {
    //         id: 8,
    //         data: 285
    //     },
    //     {
    //         id: 9,
    //         data: 290
    //     },
    //     {
    //         id: 10,
    //         data: 300
    //     },
    // ];

    // const feeling = [
    //     {
    //         id: 1,
    //         data: '딱 붙는 느낌'
    //     },
    //     {
    //         id: 2,
    //         data: '꼭 맞는 느낌'
    //     },
    //     {
    //         id: 3,
    //         data: '여유 있는 느낌'
    //     },
    // ];

    const onPress = (category, index) => {
        if (category === '상의') {
            setSize_top(index)
        }
        else if (category === '상의느낌') {
            setFeeling_top(index)
        }
        else if (category === '하의') {
            setSize_waist(index)
        }
        else if (category === '하의느낌') {
            setFeeling_waist(index)
        }
        else if (category === '아우터') {
            setSize_outer(index)
        }
        else if (category === '신발') {
            setSize_shoes(index)
        }

    }

    useEffect(() => {
        // console.log(contents);
        if (size_top > 0 && feeling_top > 0 && size_waist > 0 && feeling_waist > 0 && size_outer > 0 && size_shoes > 0) setNext(true);
        else setNext(false);
    }, [contents])

    const Button = ({ title, index, category }) => {
        return (
            <TouchableOpacity onPress={() => onPress(category, index)} style={{
                justifyContent: 'center', alignItems: 'center',
                paddingHorizontal: 16, paddingVertical: 8, marginLeft: index === 1 ? windowWidth / 14 + 10 : 10, marginRight: 4,
                borderWidth: 1, borderRadius: 30, borderColor: '#d2d2d2',
                backgroundColor:
                    category === '상의' ?
                        index === size_top ? '#d2d2d2' : '#ffffff' :
                        category === '상의느낌' ?
                            index === feeling_top ? '#d2d2d2' : '#ffffff' :
                            category === '하의' ?
                                index === size_waist ? '#d2d2d2' : '#ffffff' :
                                category === '하의느낌' ?
                                    index === feeling_waist ? '#d2d2d2' : '#ffffff' :
                                    category === '아우터' ?
                                        index === size_outer ? '#d2d2d2' : '#ffffff' :
                                        category === '신발' ?
                                            index === size_shoes ? '#d2d2d2' : '#ffffff' : '#ffffff'
            }} >
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>{title}</Text>
            </TouchableOpacity>
        );
    }

    // const ButtonScroll = ({ data, category }) => {
    //     return (
    //         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
    //             contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
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
    //         <View style={{ width: '100%', marginBottom: windowHeight / 50 }}>
    //             <Text style={{ fontSize: windowWidth / 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: windowWidth / 10, marginBottom: windowHeight / 50 }}>{title}</Text>
    //             <ButtonScroll data={data} category={category} />
    //         </View>
    //     );
    // }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='설문조사' navigation={navigation} isMain={false} />
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Text style={{ width: '80%', marginVertical: 20, fontSize: 34, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>사이즈 선택</Text>
                <View style={{ flex: 1, width: '100%', }}>
                    <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'flex-start' }}>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>상의 사이즈</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='90' index={1} category='상의' />
                                <Button title='95' index={2} category='상의' />
                                <Button title='100' index={3} category='상의' />
                                <Button title='105' index={4} category='상의' />
                                <Button title='110' index={5} category='상의' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>해당 사이즈를 입었을 때 어떤 느낌인가요?</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='딱 붙는 느낌' index={1} category='상의느낌' />
                                <Button title='꼭 맞는 느낌' index={2} category='상의느낌' />
                                <Button title='여유 있는 느낌' index={3} category='상의느낌' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>허리 사이즈</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='28' index={1} category='하의' />
                                <Button title='29' index={2} category='하의' />
                                <Button title='30' index={3} category='하의' />
                                <Button title='31' index={4} category='하의' />
                                <Button title='32' index={5} category='하의' />
                                <Button title='33' index={6} category='하의' />
                                <Button title='34' index={7} category='하의' />
                                <Button title='35' index={8} category='하의' />
                                <Button title='36' index={9} category='하의' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>해당 사이즈를 입었을 때 어떤 느낌인가요?</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='딱 붙는 느낌' index={1} category='하의느낌' />
                                <Button title='꼭 맞는 느낌' index={2} category='하의느낌' />
                                <Button title='여유 있는 느낌' index={3} category='하의느낌' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>아우터 사이즈</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='90' index={1} category='아우터' />
                                <Button title='95' index={2} category='아우터' />
                                <Button title='100' index={3} category='아우터' />
                                <Button title='105' index={4} category='아우터' />
                                <Button title='110' index={5} category='아우터' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginLeft: '10%', marginBottom: 20 }}>신발 사이즈</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', }} style={{}}>
                                <Button title='250' index={1} category='신발' />
                                <Button title='255' index={2} category='신발' />
                                <Button title='260' index={3} category='신발' />
                                <Button title='265' index={4} category='신발' />
                                <Button title='270' index={5} category='신발' />
                                <Button title='275' index={6} category='신발' />
                                <Button title='280' index={7} category='신발' />
                                <Button title='290' index={8} category='신발' />
                                <Button title='300' index={9} category='신발' />
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', height: 80 }}/>
                    </ScrollView>
                </View>
                <FloatingButton title='다음' navigation={navigation} index='Intro8' category='size' contents={contents} next={next} />
            </View>
        </View>
    );
}

export default Intro7;