import React, { useState, useEffect, useContext, } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Dimensions, Modal, Alert, BackHandler, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { UserContext } from '../../../context/UserContext';
import Camera_Gallery from '../../Camera_Gallery';
import Survey_modal1 from './Myinfo_change_modals/Survey_modal1';
import Survey_modal2 from './Myinfo_change_modals/Survey_modal2';
import Survey_modal3 from './Myinfo_change_modals/Survey_modal3';
import Survey_modal4 from './Myinfo_change_modals/Survey_modal4';
import Survey_modal5 from './Myinfo_change_modals/Survey_modal5';
import Survey_modal6 from './Myinfo_change_modals/Survey_modal6';
import Survey_modal7 from './Myinfo_change_modals/Survey_modal7';
import Survey_modal8 from './Myinfo_change_modals/Survey_modal8';
import Survey_modal10 from './Myinfo_change_modals/Survey_modal10';
import Survey_modal11 from './Myinfo_change_modals/Survey_modal11';
import ip from '../../../ip';

const Myinfo = ({ navigation }) => {
    const [info, infoactions] = useContext(UserContext);

    const [isunfold1, setIsunfold1] = useState(false);
    const [isunfold2, setIsunfold2] = useState(false);
    const [isunfold3, setIsunfold3] = useState(false);

    const [shopping_preference, setShopping_preference] = useState(0);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [shopping_effort, setShopping_effort] = useState(0);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [trend_sensitive, setTrend_sensitive] = useState(0);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [job, setJob] = useState('');
    const [modalVisible4, setModalVisible4] = useState(false);
    const [working_fashion, setWorking_fashion] = useState('');
    const [modalVisible5, setModalVisible5] = useState(false);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [size_top, setSize_top] = useState(0);
    const [feeling_top, setFeeling_top] = useState(0);
    const [size_waist, setSize_waist] = useState(0);
    const [feeling_waist, setFeeling_waist] = useState(0);
    const [size_outer, setSize_outer] = useState(0);
    const [size_shoes, setSize_shoes] = useState(0);
    const [modalVisible7, setModalVisible7] = useState(false);
    const [body_shape, setBody_shape] = useState(0);
    const [modalVisible8, setModalVisible8] = useState(false);
    const [body_photo1, setBody_photo1] = useState('');
    const [body_photo2, setBody_photo2] = useState('');
    const [body_photo3, setBody_photo3] = useState('');
    const [body_image1, setBody_image1] = useState('');
    const [body_image2, setBody_image2] = useState('');
    const [body_image3, setBody_image3] = useState('');
    const [modalVisible9, setModalVisible9] = useState(false);
    const [index, setIndex] = useState(0);
    const [complex_top, setComplex_top] = useState('');
    const [complex_bottom, setComplex_bottom] = useState('');
    const [modalVisible10, setModalVisible10] = useState(false);
    const [look_preference, setLook_preference] = useState('');
    const [modalVisible11, setModalVisible11] = useState(false);

    const [isLoading, setIsloading] = useState(true);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        if (info.survey_check === 1) {
            axios.get(ip + 'login/survey?user_id=' + info.user_index)
                .then(function (response) {
                    console.log(response.data[0]);
                    setShopping_preference(response.data[0].shopping_preference);
                    setShopping_effort(response.data[0].shopping_effort);
                    setTrend_sensitive(response.data[0].trend_sensitive);
                    setJob(response.data[0].job);
                    setWorking_fashion(response.data[0].working_fashion);
                    setHeight(response.data[0].height);
                    setWeight(response.data[0].weight);
                    setSize_top(response.data[0].size_top);
                    setFeeling_top(response.data[0].feeling_top);
                    setSize_waist(response.data[0].size_waist);
                    setFeeling_waist(response.data[0].feeling_waist);
                    setSize_outer(response.data[0].size_outer);
                    setSize_shoes(response.data[0].size_shoes);
                    setBody_shape(response.data[0].body_shape);
                    setBody_photo1(response.data[0].body_photo1);
                    setBody_photo2(response.data[0].body_photo2);
                    setBody_photo3(response.data[0].body_photo3);
                    setComplex_top(response.data[0].complex_top);
                    setComplex_bottom(response.data[0].complex_bottom);
                    setLook_preference(response.data[0].look_preference.split(','));
                    setIsloading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (info.survey_check === 0) {
            setIsloading(false);
        }
    }, []);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert('주의!', '수정하던 정보를 잃게 됩니다. 저장하지 않고 이 페이지를 나가시겠습니까?',
                [
                    {
                        text: '머무르기',
                        style: 'cancel',
                        onPress: () => { },
                    },
                    {
                        text: '나가기',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action),
                    }
                ],
                {
                    cancelable: true
                });
        })
    }, [navigation])

    useEffect(() => {
        if (index === 1 || index === 2 || index === 3)
            setModalVisible9(true);
        else
            setModalVisible9(false);
    }, [index]);

    const changeModal = (index) => {
        if (index === '쇼핑을 즐기는 편이신가요?') {
            setModalVisible1(true);
        }
        else if (index === '쇼핑에 얼마나 노력을 들이시나요?') {
            setModalVisible2(true);
        }
        else if (index === '유행민감도') {
            setModalVisible3(true);
        }
        else if (index === '직업') {
            setModalVisible4(true);
        }
        else if (index === '출근/등교 시 복장') {
            setModalVisible5(true);
        }
        else if (index === '키/몸무게') {
            setModalVisible6(true);
        }
        else if (index === '체형') {
            setModalVisible8(true);
        }
        else if (index === '신체 콤플렉스') {
            setModalVisible10(true);
        }
        else if (index === '상의' || index === '하의' || index === '아우터' || index === '신발') {
            setModalVisible7(true);
        }
        else if (index === '평소 선호 스타일') {
            setModalVisible11(true);
        }
    }

    const onPress = (catalog) => {
        if (catalog === '기본정보') {
            if (isunfold1 === false) setIsunfold1(true);
            else setIsunfold1(false);
        }
        else if (catalog === '사이즈') {
            if (isunfold2 === false) setIsunfold2(true);
            else setIsunfold2(false);
        }
        else if (catalog === '선호스타일') {
            if (isunfold3 === false) setIsunfold3(true);
            else setIsunfold3(false);
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
        else if (catalog === '선호스타일') {
            return (
                <Icon name={isunfold3 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
    }

    const Info = ({ info_cata }) => {
        return (
            <TouchableOpacity style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                borderBottomWidth: 1, borderBottomColor: '#eaeaea', paddingHorizontal: 20,
            }} onPress={() => { onPress(info_cata); }} activeOpacity={0.8}>
                <Text style={{ width: '80%', fontSize: 25, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{info_cata}</Text>
                <View style={{ width: '20%', alignItems: 'flex-end', }}>
                    <FoldIcon catalog={info_cata} />
                </View>
            </TouchableOpacity>
        );
    }


    const Horizontal_Detail_info = ({ info_index, customer_info }) => {
        return (
            <View style={{ flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 4 }}>
                <View style={{ flex: 1, width: '50%' }}>
                    <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>{info_index}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, width: '50%', alignItems: 'flex-end' }} onPress={() => { changeModal(info_index) }}
                    disabled={info_index === '닉네임' || info_index === '생년월일' ? true : customer_info === '첫 예약이 필요해요!' ? true : false}>
                    <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17, textAlign: 'right' }}>{customer_info}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const Vertical_Detail_info = ({ info_index, customer_info }) => {
        return (
            <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, paddingVertical: 4 }}>
                <View style={{ flex: 1, width: '100%', paddingBottom: 5 }}>
                    <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>{info_index}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, width: '100%' }} onPress={() => { changeModal(info_index) }}
                    disabled={customer_info === '첫 예약이 필요해요!' ? true : false}>
                    <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17 }}>{customer_info}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const Body_Image = ({ index, body_image, body_photo }) => {
        return (
            <TouchableOpacity style={{ width: '30%', }} onPress={() => { setIndex(index) }} activeOpacity={0.8}>
                {body_image === '' ?
                    <FastImage source={{ uri: body_photo, cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} resizeMode='stretch' /> :
                    <FastImage source={{ uri: body_image.uri, cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: 10, }} resizeMode='stretch' />
                }
            </TouchableOpacity>
        );
    }

    const Vertical_Photo_info = ({ info_index, }) => {
        return (
            <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, paddingVertical: 2.5, }}>
                <Text style={{ color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17, width: '100%', marginBottom: 5 }}>{info_index}</Text>
                {body_photo1 === '' && body_photo2 === '' && body_photo3 === '' ?
                    <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17, }}>첫 예약이 필요해요!</Text> :
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                        <Body_Image index={1} body_image={body_image1} body_photo={body_photo1} />
                        <Body_Image index={2} body_image={body_image2} body_photo={body_photo2} />
                        <Body_Image index={3} body_image={body_image3} body_photo={body_photo3} />
                    </View>
                }
            </View>
        )
    }

    return (
        isLoading ? <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', }} >
            <ActivityIndicator size='large' color='#000000' />
        </View > :
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#ffffff' }}>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                {/* Header */}
                <View style={{
                    minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                    justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }} style={{ position: 'absolute', left: 16 }}>
                        <Icon name='chevron-back' size={33} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>개인 정보 수정</Text>
                    <TouchableOpacity onPress={() => {
                        const image = new FormData();
                        if (body_image1 !== '') {
                            image.append('image', {
                                name: body_image1.fileName,
                                type: body_image1.type,
                                uri: body_image1.uri
                            });
                        }
                        if (body_image2 !== '') {
                            image.append('image', {
                                name: body_image2.fileName,
                                type: body_image2.type,
                                uri: body_image2.uri
                            });
                        }
                        if (body_image3 !== '') {
                            image.append('image', {
                                name: body_image3.fileName,
                                type: body_image3.type,
                                uri: body_image3.uri
                            });
                        }
                        axios.post(ip + 'mypage/information', {
                            user_id: info.user_index,
                            shopping_preference: shopping_preference,
                            shopping_effort: shopping_effort,
                            trend_sensitive: trend_sensitive,
                            job: job,
                            working_fashion: working_fashion,
                            height: height,
                            weight: weight,
                            body_shape: body_shape,
                            body_photo1: body_photo1,
                            body_photo2: body_photo2,
                            body_photo3: body_photo3,
                            size_top: size_top,
                            feeling_top: feeling_top,
                            size_waist: size_waist,
                            feeling_waist: feeling_waist,
                            size_outer: size_outer,
                            size_shoes: size_shoes,
                            complex_top: complex_top,
                            complex_bottom: complex_bottom,
                            look_preference: look_preference.join(','),
                        })
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        axios.post(ip + 'stylist/image-upload-body', image)
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        navigation.goBack();
                    }}
                        style={{ position: 'absolute', right: 10, borderRadius: 20, backgroundColor: '#464646', paddingHorizontal: 15, paddingVertical: 4 }}>
                        <Text style={{ fontFamily: 'NanumSquare_acB', color: '#ffffff', fontSize: 20 }}>저장</Text>
                    </TouchableOpacity>
                </View>

                {/* Body */}
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    < Modal animationType='slide' visible={modalVisible1} onRequestClose={() => {
                        setModalVisible1(false);
                    }}>
                        <Survey_modal1 answer={shopping_preference} setAnswer={setShopping_preference} modalVisible={modalVisible1} setModalVisible={setModalVisible1} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible2} onRequestClose={() => {
                        setModalVisible2(false);
                    }}>
                        <Survey_modal2 answer={shopping_effort} setAnswer={setShopping_effort} modalVisible={modalVisible2} setModalVisible={setModalVisible2} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible3} onRequestClose={() => {
                        setModalVisible3(false);
                    }}>
                        <Survey_modal3 answer={trend_sensitive} setAnswer={setTrend_sensitive} modalVisible={modalVisible3} setModalVisible={setModalVisible3} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible4} onRequestClose={() => {
                        setModalVisible4(false);
                    }}>
                        <Survey_modal4 answer={job} setAnswer={setJob} modalVisible={modalVisible4} setModalVisible={setModalVisible4} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible5} onRequestClose={() => {
                        setModalVisible5(false);
                    }}>
                        <Survey_modal5 answer={working_fashion} setAnswer={setWorking_fashion} modalVisible={modalVisible5} setModalVisible={setModalVisible5} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible6} onRequestClose={() => {
                        setModalVisible6(false);
                    }}>
                        <Survey_modal6 answer1={height} setAnswer1={setHeight} answer2={weight} setAnswer2={setWeight} modalVisible={modalVisible6} setModalVisible={setModalVisible6} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible7} onRequestClose={() => {
                        setModalVisible7(false);
                    }}>
                        <Survey_modal7 answer1={size_top} setAnswer1={setSize_top} answer2={feeling_top} setAnswer2={setFeeling_top}
                            answer3={size_waist} setAnswer3={setSize_waist} answer4={feeling_waist} setAnswer4={setFeeling_waist}
                            answer5={size_outer} setAnswer5={setSize_outer} answer6={size_shoes} setAnswer6={setSize_shoes}
                            modalVisible={modalVisible7} setModalVisible={setModalVisible7} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible8} onRequestClose={() => {
                        setModalVisible8(false);
                    }}>
                        <Survey_modal8 answer={body_shape} setAnswer={setBody_shape} modalVisible={modalVisible8} setModalVisible={setModalVisible8} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible10} onRequestClose={() => {
                        setModalVisible10(false);
                    }}>
                        <Survey_modal10 answer1={complex_top} setAnswer1={setComplex_top} answer2={complex_bottom} setAnswer2={setComplex_bottom} modalVisible={modalVisible10} setModalVisible={setModalVisible10} />
                    </Modal>
                    <Modal animationType='slide' visible={modalVisible11} onRequestClose={() => {
                        setModalVisible11(false);
                    }}>
                        <Survey_modal11 answer={look_preference} setAnswer={setLook_preference} modalVisible={modalVisible11} setModalVisible={setModalVisible11} />
                    </Modal>
                    <Modal animationType='fade' visible={modalVisible9} transparent={true} onRequestClose={() => {
                        setModalVisible(!modalVisible9);
                    }}>
                        <Camera_Gallery index={index} setIndex={setIndex} setPhoto1={setBody_image1} setPhoto2={setBody_image2} setPhoto3={setBody_image3} modalVisible={modalVisible9} setModalVisible={setModalVisible9} />
                    </Modal>
                    {/* 요청서 정보 부분*/}
                    <View style={{ flex: 1, width: '100%', }}>
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            <Text style={{ width: '100%', paddingLeft: 20, paddingVertical: 10, fontSize: 23, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>내 정보 수정</Text>
                            {/* 아래의 디테일한 정보들 */}
                            <Info info_cata={'기본정보'} />
                            {isunfold1 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'닉네임'} customer_info={info.nick_name} />
                                    <Horizontal_Detail_info info_index={'생년월일'} customer_info={info.birth.substr(0, 10)} />
                                    <Horizontal_Detail_info info_index={'쇼핑을 즐기는 편이신가요?'} customer_info={
                                        shopping_preference === 1 ? '높음' : shopping_preference === 2 ? '보통' : shopping_preference === 3 ? '낮음' : '첫 예약이 필요해요!'
                                    } />
                                    <Horizontal_Detail_info info_index={'쇼핑에 얼마나 노력을 들이시나요?'} customer_info={
                                        shopping_effort === 1 ? '높음' : shopping_effort === 2 ? '보통' : shopping_effort === 3 ? '낮음' : '첫 예약이 필요해요!'
                                    } />
                                    <Horizontal_Detail_info info_index={'유행민감도'} customer_info={
                                        trend_sensitive === 1 ? '높음' : trend_sensitive === 2 ? '보통' : trend_sensitive === 3 ? '낮음' : '첫 예약이 필요해요!'
                                    } />
                                    <Horizontal_Detail_info info_index={'직업'} customer_info={
                                        job === '' ? '첫 예약이 필요해요!' : job
                                    } />
                                    <Horizontal_Detail_info info_index={'출근/등교 시 복장'} customer_info={
                                        working_fashion === '' ? '첫 예약이 필요해요!' : working_fashion
                                    } />
                                    <Horizontal_Detail_info info_index={'키/몸무게'} customer_info={
                                        height === 0 || weight === 0 ? '첫 예약이 필요해요!' : height + 'cm/' + weight + 'kg'
                                    } />
                                    <Horizontal_Detail_info info_index={'체형'} customer_info={
                                        body_shape === 1 ? '마른형' : body_shape === 2 ? '평균형' : body_shape === 3 ? '근육형' : body_shape === 4 ? '건장형' : '첫 예약이 필요해요!'
                                    } />
                                    <Vertical_Detail_info info_index={'신체 콤플렉스'} customer_info={
                                        complex_top === '' || complex_bottom === '' ? '첫 예약이 필요해요!' : complex_top + ', ' + complex_bottom
                                    } />
                                </View> : null
                            }
                            <Info info_cata={'사이즈'} />
                            {isunfold2 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'상의'} customer_info={
                                        size_top === 0 || feeling_top === 0 ? '첫 예약이 필요해요!' :
                                            size_top === 1 ? feeling_top === 1 ? '90, 딱 붙는 느낌' : feeling_top === 2 ? '90, 꼭 맞는 느낌' : '90, 여유 있는 느낌' :
                                                size_top === 2 ? feeling_top === 1 ? '95, 딱 붙는 느낌' : feeling_top === 2 ? '95, 꼭 맞는 느낌' : '95, 여유 있는 느낌' :
                                                    size_top === 3 ? feeling_top === 1 ? '100, 딱 붙는 느낌' : feeling_top === 2 ? '100, 꼭 맞는 느낌' : '100, 여유 있는 느낌' :
                                                        size_top === 4 ? feeling_top === 1 ? '105, 딱 붙는 느낌' : feeling_top === 2 ? '105, 꼭 맞는 느낌' : '105, 여유 있는 느낌' :
                                                            feeling_top === 1 ? '110, 딱 붙는 느낌' : feeling_top === 2 ? '110, 꼭 맞는 느낌' : '110, 여유 있는 느낌'
                                    } />
                                    <Horizontal_Detail_info info_index={'하의'} customer_info={
                                        size_waist === 0 || feeling_waist === 0 ? '첫 예약이 필요해요!' :
                                            size_waist === 1 ? feeling_waist === 1 ? '28, 딱 붙는 느낌' : feeling_waist === 2 ? '28, 꼭 맞는 느낌' : '28, 여유 있는 느낌' :
                                                size_waist === 2 ? feeling_waist === 1 ? '29, 딱 붙는 느낌' : feeling_waist === 2 ? '29, 꼭 맞는 느낌' : '29, 여유 있는 느낌' :
                                                    size_waist === 3 ? feeling_waist === 1 ? '30, 딱 붙는 느낌' : feeling_waist === 2 ? '30, 꼭 맞는 느낌' : '30, 여유 있는 느낌' :
                                                        size_waist === 4 ? feeling_waist === 1 ? '31, 딱 붙는 느낌' : feeling_waist === 2 ? '31, 꼭 맞는 느낌' : '31, 여유 있는 느낌' :
                                                            size_waist === 5 ? feeling_waist === 1 ? '32, 딱 붙는 느낌' : feeling_waist === 2 ? '32, 꼭 맞는 느낌' : '32, 여유 있는 느낌' :
                                                                size_waist === 6 ? feeling_waist === 1 ? '33, 딱 붙는 느낌' : feeling_waist === 2 ? '33, 꼭 맞는 느낌' : '33, 여유 있는 느낌' :
                                                                    size_waist === 7 ? feeling_waist === 1 ? '34, 딱 붙는 느낌' : feeling_waist === 2 ? '34, 꼭 맞는 느낌' : '34, 여유 있는 느낌' :
                                                                        size_waist === 8 ? feeling_waist === 1 ? '35, 딱 붙는 느낌' : feeling_waist === 2 ? '35, 꼭 맞는 느낌' : '35, 여유 있는 느낌' :
                                                                            feeling_waist === 1 ? '36, 딱 붙는 느낌' : feeling_top === 2 ? '36, 꼭 맞는 느낌' : '36, 여유 있는 느낌'
                                    } />
                                    <Horizontal_Detail_info info_index={'아우터'} customer_info={
                                        size_outer === 1 ? 90 : size_outer === 2 ? 95 :
                                            size_outer === 3 ? 100 : size_outer === 4 ? 105 :
                                                size_outer === 5 ? 110 : '첫 예약이 필요해요!'
                                    } />
                                    <Horizontal_Detail_info info_index={'신발'} customer_info={
                                        size_shoes === 1 ? '250mm' : size_shoes === 2 ? '255mm' : size_shoes === 3 ? '260mm' : size_shoes === 4 ? '265mm' :
                                            size_shoes === 5 ? '270mm' : size_shoes === 6 ? '275mm' : size_shoes === 7 ? '280mm' : size_shoes === 8 ? '285mm' :
                                                size_shoes === 9 ? '290mm' : size_shoes === 10 ? '300mm' : '첫 예약이 필요해요!'
                                    } />
                                </View> : null
                            }
                            {/* 사진 들어가는 정보 수정 */}
                            <Info info_cata={'선호스타일'} />
                            {isunfold3 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Vertical_Photo_info info_index={'고객 전신 사진'} />
                                    <View style={{ flex: 1, width: '100%', paddingVertical: 4 }}>
                                        <Text style={{ width: '100%', paddingBottom: 5, paddingHorizontal: 20, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>평소 선호 스타일</Text>
                                        <View style={{ flex: 1, width: '100%', }}>
                                            {look_preference === '' ?
                                                <Text style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 2.5, fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17, }}>첫 예약이 필요해요!</Text> :
                                                <FlatList horizontal={true}
                                                    showsHorizontalScrollIndicator={true}
                                                    data={look_preference}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <TouchableOpacity style={{
                                                                width: 150, aspectRatio: 1 / 1, borderRadius: 10,
                                                                marginLeft: index === 0 ? 10 : 0,
                                                                marginRight: 10, justifyContent: 'center', alignItems: 'center'
                                                            }} onPress={() => { changeModal('평소 선호 스타일') }} activeOpacity={0.8}>
                                                                <FastImage source={item === '1' ? require('../../../assets/style1.png') : item === '2' ? require('../../../assets/style2.png') :
                                                                    item === '3' ? require('../../../assets/style3.png') : item === '4' ? require('../../../assets/style4.png') :
                                                                        item === '5' ? require('../../../assets/style5.png') : item === '6' ? require('../../../assets/style6.png') :
                                                                            item === '7' ? require('../../../assets/style7.png') : item === '8' ? require('../../../assets/style8.png') :
                                                                                item === '9' ? require('../../../assets/style9.png') : item === '10' ? require('../../../assets/style10.png') :
                                                                                    item === '11' ? require('../../../assets/style11.png') : require('../../../assets/style12.png')
                                                                } style={{
                                                                    width: '100%', aspectRatio: 1 / 1, borderRadius: 10,
                                                                }} />
                                                            </TouchableOpacity>
                                                        );
                                                    }}
                                                    keyExtractor={(item) => item}
                                                    style={{ width: '100%', flex: 1 }} contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                />
                                            }
                                        </View>
                                    </View>
                                </View> : null
                            }
                        </ScrollView>
                    </View>
                </View>
            </View >
    );
};

export default Myinfo;
