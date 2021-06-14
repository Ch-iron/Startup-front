import React, { useState, useContext, useEffect } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import ImageView from "react-native-image-viewing";
import { UserContext } from '../../../context/UserContext';
import ip from '../../../ip';

const Suggestion_Requirement = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [info, actions] = useContext(UserContext);

    const [isunfold1, setIsunfold1] = useState(false);
    const [isunfold2, setIsunfold2] = useState(false);
    const [isunfold3, setIsunfold3] = useState(false);
    const [isunfold4, setIsunfold4] = useState(false);
    const [isunfold5, setIsunfold5] = useState(false);
    const [requirement, setRequirement] = useState('');
    const [isLoading, setIsloading] = useState(true);
    const [request_style, setRequest_style] = useState([]);
    const [bodyvisible, setIsBodyVisible] = useState(false);
    const [stylevisible, setIsStyleVisible] = useState(false);
    const [style, setStyle] = useState([]);
    const [imageindex, setImageindex] = useState(0);

    const styling_id = route.params;

    const bodyimages = [
        {
            uri: requirement.body_photo1,
        },
        {
            uri: requirement.body_photo2,
        },
        {
            uri: requirement.body_photo3,
        },
    ]

    useEffect(() => {
        axios.get(ip + 'mypage/suggestion-requirement?styling_id=' + styling_id)
            .then(function (response) {
                console.log(response.data[0])
                setRequirement(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log(requirement);
        if (requirement !== '') {
            if (requirement.request_style !== 'No photos') {
                setRequest_style(requirement.request_style.split(','))
            }
            else {
                setRequest_style('No photos');
            }
        }
        setIsloading(false);
    }, [requirement]);

    useEffect(() => {
        if (isLoading === false) {
            console.log(request_style);
            if (request_style !== 'No photos') {
                request_style.map((style) => {
                    setStyle((curr) => [...curr, { uri: style }])
                })
            }
        }
    }, [isLoading]);

    const onPress = (catalog) => {
        if (catalog === '기본정보') {
            if (isunfold1 === false) setIsunfold1(true);
            else setIsunfold1(false);
        }
        else if (catalog === '사이즈') {
            if (isunfold2 === false) setIsunfold2(true);
            else setIsunfold2(false);
        }
        else if (catalog === '예산') {
            if (isunfold3 === false) setIsunfold3(true);
            else setIsunfold3(false);
        }
        else if (catalog === '원하는 제품') {
            if (isunfold4 === false) setIsunfold4(true);
            else setIsunfold4(false);
        }
        else if (catalog === '요청사항&선호스타일') {
            if (isunfold5 === false) setIsunfold5(true);
            else setIsunfold5(false);
        }
    }

    const FoldIcon = ({ catalog }) => {
        if (catalog === '기본정보') {
            return (
                <Icon name={isunfold1 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
        else if (catalog === '사이즈') {
            return (
                <Icon name={isunfold2 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
        else if (catalog === '예산') {
            return (
                <Icon name={isunfold3 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
        else if (catalog === '원하는 제품') {
            return (
                <Icon name={isunfold4 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
        else if (catalog === '요청사항&선호스타일') {
            return (
                <Icon name={isunfold5 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
    }

    const Info = ({ info_cata }) => {
        return (
            <TouchableOpacity style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                borderBottomWidth: 1, borderBottomColor: '#eaeaea', paddingHorizontal: 20
            }} onPress={() => { onPress(info_cata); }}>
                <View style={{ width: '80%', }}>
                    <Text style={{ fontSize: 25, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{info_cata}</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'flex-end', }}>
                    <FoldIcon catalog={info_cata} />
                </View>
            </TouchableOpacity>
        );
    }

    const Horizontal_Detail_info = ({ info_index, customer_info }) => {
        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 4, }}>
                <View style={{ flex: 1, width: '50%' }}>
                    <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>{info_index}</Text>
                </View>
                <View style={{ flex: 1, width: '50%', alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17 }}>{customer_info}</Text>
                </View>
            </View>
        )
    }

    const Vertical_Detail_info = ({ info_index, customer_info }) => {
        return (
            <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, paddingVertical: 4 }}>
                <View style={{ flex: 1, width: '100%', paddingBottom: 5 }}>
                    <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>{info_index}</Text>
                </View>
                <View style={{ flex: 1, width: '100%' }}>
                    <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17 }}>{customer_info}</Text>
                </View>
            </View>
        )
    }

    return (
        isLoading ?
            <View style={{ flex: 52, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size='large' color='#000000' />
            </View> :
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#ffffff' }}>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                {/* Header */}
                <View style={{
                    minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                    justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 16 }}>
                        <Icon name='chevron-back' size={33} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>요청서</Text>
                </View>
                {/* Body */}
                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                    {/* 어드바이저 프로필 부분 */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', }}>
                            <FastImage source={{ uri: requirement.profile_photo, cache: 'web' }}
                                style={{ height: '50%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: '8%', marginTop: 20, marginRight: 10, }}
                            />
                            <View style={{ width: '100%', flex: 1, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: 32 }}>
                                    <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{requirement.nick_name}</Text>
                                    <Text style={{ fontSize: 16.5, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> 어드바이저</Text>
                                </View>
                                <Text style={{ width: '90%', fontSize: 15, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginTop: 5 }}>
                                    {requirement.profile_introduction}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* 프로필과 밑부분 간의 공백 */}
                    <View style={{ width: '100%', height: 8, backgroundColor: '#eaeaea' }} />


                    {/* 요청서 정보 부분*/}
                    <View style={{ flex: 4.5, width: '100%', }}>
                        <ScrollView>
                            <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'center', alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 23, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>보낸 요청서</Text>
                            </View>
                            {/* 아래의 디테일한 정보들 */}
                            <Info info_cata={'기본정보'} />
                            {isunfold1 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'출생년도'} customer_info={info.birth.substr(0, 4) + '년'} />
                                    <Horizontal_Detail_info info_index={'유행민감도'} customer_info={
                                        requirement.trend_sensitive === 1 ? '높음' : requirement.trend_sensitive === 2 ? '보통' : '낮음'
                                    } />
                                    <Horizontal_Detail_info info_index={'직업'} customer_info={requirement.job} />
                                    <Horizontal_Detail_info info_index={'키/몸무게'} customer_info={requirement.height + 'cm / ' + requirement.weight + 'kg'} />
                                    <Horizontal_Detail_info info_index={'체형'} customer_info={
                                        requirement.body_shape === 1 ? '마른형' : requirement.body_shape === 2 ? '평균형' : requirement.body_shape === 3 ? '근육형' :
                                            '건장형'
                                    } />
                                    <Vertical_Detail_info info_index={'신체 콤플렉스'} customer_info={'상체 : ' + requirement.complex_top + '\n' + '하체 : ' + requirement.complex_bottom} />
                                    <Horizontal_Detail_info info_index={'원하는 핏'} customer_info={'상의 ' + requirement.wanted_fitting_top + ' / 하의 ' + requirement.wanted_fitting_bottom} />
                                </View> : null
                            }

                            <Info info_cata={'사이즈'} />
                            {isunfold2 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'상의'} customer_info={
                                        requirement.size_top === 1 ? requirement.feeling_top === 1 ? '90, 딱 붙는 느낌' : requirement.feeling_top === 2 ? '90, 꼭 맞는 느낌' : '90, 여유 있는 느낌' :
                                            requirement.size_top === 2 ? requirement.feeling_top === 1 ? '95, 딱 붙는 느낌' : requirement.feeling_top === 2 ? '95, 꼭 맞는 느낌' : '95, 여유 있는 느낌' :
                                                requirement.size_top === 3 ? requirement.feeling_top === 1 ? '100, 딱 붙는 느낌' : requirement.feeling_top === 2 ? '100, 꼭 맞는 느낌' : '100, 여유 있는 느낌' :
                                                    requirement.size_top === 4 ? requirement.feeling_top === 1 ? '105, 딱 붙는 느낌' : requirement.feeling_top === 2 ? '105, 꼭 맞는 느낌' : '105, 여유 있는 느낌' :
                                                        requirement.feeling_top === 1 ? '110, 딱 붙는 느낌' : requirement.feeling_top === 2 ? '110, 꼭 맞는 느낌' : '110, 여유 있는 느낌'

                                    } />
                                    <Horizontal_Detail_info info_index={'하의'} customer_info={
                                        requirement.size_waist === 1 ? requirement.feeling_waist === 1 ? '28, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '28, 꼭 맞는 느낌' : '28, 여유 있는 느낌' :
                                            requirement.size_waist === 2 ? requirement.feeling_waist === 1 ? '29, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '29, 꼭 맞는 느낌' : '29, 여유 있는 느낌' :
                                                requirement.size_waist === 3 ? requirement.feeling_waist === 1 ? '30, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '30, 꼭 맞는 느낌' : '30, 여유 있는 느낌' :
                                                    requirement.size_waist === 4 ? requirement.feeling_waist === 1 ? '31, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '31, 꼭 맞는 느낌' : '31, 여유 있는 느낌' :
                                                        requirement.size_waist === 5 ? requirement.feeling_waist === 1 ? '32, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '32, 꼭 맞는 느낌' : '32, 여유 있는 느낌' :
                                                            requirement.size_waist === 6 ? requirement.feeling_waist === 1 ? '33, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '33, 꼭 맞는 느낌' : '33, 여유 있는 느낌' :
                                                                requirement.size_waist === 7 ? requirement.feeling_waist === 1 ? '34, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '34, 꼭 맞는 느낌' : '34, 여유 있는 느낌' :
                                                                    requirement.size_waist === 8 ? requirement.feeling_waist === 1 ? '35, 딱 붙는 느낌' : requirement.feeling_waist === 2 ? '35, 꼭 맞는 느낌' : '35, 여유 있는 느낌' :
                                                                        requirement.feeling_waist === 1 ? '36, 딱 붙는 느낌' : requirement.feeling_top === 2 ? '36, 꼭 맞는 느낌' : '36, 여유 있는 느낌'
                                    } />
                                    <Horizontal_Detail_info info_index={'아우터'} customer_info={
                                        requirement.size_outer === 1 ? 90 : requirement.size_outer === 2 ? 95 : requirement.size_outer === 3 ? 100 : requirement.size_outer === 4 ? 105 : 110
                                    } />
                                    <Horizontal_Detail_info info_index={'신발'} customer_info={
                                        requirement.size_shoes === 1 ? '250mm' : requirement.size_shoes === 2 ? '255mm' : requirement.size_shoes === 3 ? '260mm' : requirement.size_shoes === 4 ? '265mm' :
                                            requirement.size_shoes === 5 ? '270mm' : requirement.size_shoes === 6 ? '275mm' : requirement.size_shoes === 7 ? '280mm' : requirement.size_shoes === 8 ? '285mm' :
                                                requirement.size_shoes === 9 ? '290mm' : '300mm'
                                    } />
                                </View> : null
                            }

                            <Info info_cata={'예산'} />
                            {isunfold3 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'아우터'} customer_info={requirement.budget_outer} />
                                    <Horizontal_Detail_info info_index={'상의'} customer_info={requirement.budget_top} />
                                    <Horizontal_Detail_info info_index={'하의'} customer_info={requirement.budget_bottom} />
                                    <Horizontal_Detail_info info_index={'신발'} customer_info={requirement.budget_shoes} />
                                    <Horizontal_Detail_info info_index={'ACC'} customer_info={requirement.budget_acc} />
                                </View> : null
                            }

                            <Info info_cata={'원하는 제품'} />
                            {isunfold4 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'아우터'} customer_info={requirement.need_outer} />
                                    <Horizontal_Detail_info info_index={'상의'} customer_info={requirement.need_top} />
                                    <Horizontal_Detail_info info_index={'하의'} customer_info={requirement.need_bottom} />
                                    <Horizontal_Detail_info info_index={'신발'} customer_info={requirement.need_shoes} />
                                    <Horizontal_Detail_info info_index={'ACC'} customer_info={requirement.need_acc} />
                                </View> : null
                            }

                            <Info info_cata={'요청사항&선호스타일'} />
                            {isunfold5 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'TPO'} customer_info={requirement.tpo} />
                                    <Vertical_Detail_info info_index={'요청사항'} customer_info={requirement.requirement} />
                                    <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, paddingVertical: 2.5, }}>
                                        <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17, width: '100%', marginBottom: 5 }}>고객 전신 사진</Text>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                            <TouchableOpacity onPress={() => {
                                                setImageindex(0);
                                                setIsBodyVisible(true);
                                            }} style={{ width: '30%' }}>
                                                <FastImage source={{ uri: requirement.body_photo1, cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setImageindex(1);
                                                setIsBodyVisible(true);
                                            }} style={{ width: '30%' }}>
                                                <FastImage source={{ uri: requirement.body_photo2, cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setImageindex(2);
                                                setIsBodyVisible(true);
                                            }} style={{ width: '30%' }}>
                                                <FastImage source={{ uri: requirement.body_photo3, cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <ImageView
                                        images={bodyimages}
                                        imageIndex={imageindex}
                                        visible={bodyvisible}
                                        onRequestClose={() => setIsBodyVisible(false)}
                                    />
                                    <View style={{ flex: 1, width: '100%', paddingVertical: 4 }}>
                                        <Text style={{ width: '100%', paddingBottom: 5, paddingHorizontal: 20, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>평소 선호 스타일</Text>
                                        <View style={{ flex: 1, width: '100%', }}>
                                            <FlatList horizontal={true}
                                                showsHorizontalScrollIndicator={true}
                                                data={requirement.look_preference.split(',')}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={{
                                                            width: 150, aspectRatio: 1 / 1, borderRadius: 10,
                                                            marginLeft: index === 0 ? 10 : 0,
                                                            marginRight: 10, justifyContent: 'center', alignItems: 'center'
                                                        }}>
                                                            <FastImage source={item === '1' ? require('../../../assets/style1.png') : item === '2' ? require('../../../assets/style2.png') :
                                                                item === '3' ? require('../../../assets/style3.png') : item === '4' ? require('../../../assets/style4.png') :
                                                                    item === '5' ? require('../../../assets/style5.png') : item === '6' ? require('../../../assets/style6.png') :
                                                                        item === '7' ? require('../../../assets/style7.png') : item === '8' ? require('../../../assets/style8.png') :
                                                                            item === '9' ? require('../../../assets/style9.png') : item === '10' ? require('../../../assets/style10.png') :
                                                                                item === '11' ? require('../../../assets/style11.png') : require('../../../assets/style12.png')
                                                            } style={{
                                                                width: '100%', aspectRatio: 1 / 1, borderRadius: 10,
                                                            }} />
                                                        </View>
                                                    );
                                                }}
                                                keyExtractor={(item) => item}
                                                style={{ width: '100%', flex: 1 }} contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, paddingVertical: 2.5, }}>
                                        <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17, width: '100%', marginBottom: 5 }}>의뢰 스타일</Text>
                                        {request_style === 'No photos' ?
                                            <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17 }}>참고사진을 올리지 않았습니다.</Text> :
                                            request_style.length === 1 ?
                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                    <TouchableOpacity onPress={() => {
                                                        setIsStyleVisible(true);
                                                        setImageindex(0);
                                                    }} style={{ width: '30%' }}>
                                                        <FastImage source={{ uri: request_style[0], cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                                    </TouchableOpacity>
                                                </View> :
                                                request_style.length === 2 ?
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                        <TouchableOpacity onPress={() => {
                                                            setIsStyleVisible(true);
                                                            setImageindex(0);
                                                        }} style={{ width: '30%' }}>
                                                            <FastImage source={{ uri: request_style[0], cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            setIsStyleVisible(true);
                                                            setImageindex(1);
                                                        }} style={{ width: '30%' }}>
                                                            <FastImage source={{ uri: request_style[1], cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                                        </TouchableOpacity>
                                                    </View> :
                                                    request_style.length === 3 ?
                                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                                            <TouchableOpacity onPress={() => {
                                                                setIsStyleVisible(true);
                                                                setImageindex(0);
                                                            }} style={{ width: '30%' }}>
                                                                <FastImage source={{ uri: request_style[0], cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                setIsStyleVisible(true);
                                                                setImageindex(1);
                                                            }} style={{ width: '30%' }}>
                                                                <FastImage source={{ uri: request_style[1], cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => {
                                                                setIsStyleVisible(true);
                                                                setImageindex(2);
                                                            }} style={{ width: '30%' }}>
                                                                <FastImage source={{ uri: request_style[2], cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} />
                                                            </TouchableOpacity>
                                                        </View> : null
                                        }
                                    </View>
                                    <ImageView
                                        images={style}
                                        imageIndex={imageindex}
                                        visible={stylevisible}
                                        onRequestClose={() => setIsStyleVisible(false)}
                                    />
                                </View> : null
                            }
                        </ScrollView>
                    </View>
                </View>
            </View >
    );
};

export default Suggestion_Requirement;
