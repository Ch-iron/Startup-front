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
            Alert.alert('??????!', '???????????? ????????? ?????? ?????????. ???????????? ?????? ??? ???????????? ??????????????????????',
                [
                    {
                        text: '????????????',
                        style: 'cancel',
                        onPress: () => { },
                    },
                    {
                        text: '?????????',
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
        if (index === '????????? ????????? ????????????????') {
            setModalVisible1(true);
        }
        else if (index === '????????? ????????? ????????? ????????????????') {
            setModalVisible2(true);
        }
        else if (index === '???????????????') {
            setModalVisible3(true);
        }
        else if (index === '??????') {
            setModalVisible4(true);
        }
        else if (index === '??????/?????? ??? ??????') {
            setModalVisible5(true);
        }
        else if (index === '???/?????????') {
            setModalVisible6(true);
        }
        else if (index === '??????') {
            setModalVisible8(true);
        }
        else if (index === '?????? ????????????') {
            setModalVisible10(true);
        }
        else if (index === '??????' || index === '??????' || index === '?????????' || index === '??????') {
            setModalVisible7(true);
        }
        else if (index === '?????? ?????? ?????????') {
            setModalVisible11(true);
        }
    }

    const onPress = (catalog) => {
        if (catalog === '????????????') {
            if (isunfold1 === false) setIsunfold1(true);
            else setIsunfold1(false);
        }
        else if (catalog === '?????????') {
            if (isunfold2 === false) setIsunfold2(true);
            else setIsunfold2(false);
        }
        else if (catalog === '???????????????') {
            if (isunfold3 === false) setIsunfold3(true);
            else setIsunfold3(false);
        }
    }

    const FoldIcon = ({ catalog }) => {
        if (catalog === '????????????') {
            return (
                <Icon name={isunfold1 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
        else if (catalog === '?????????') {
            return (
                <Icon name={isunfold2 ? 'chevron-up-outline' : 'chevron-down-outline'} size={28} />
            )
        }
        else if (catalog === '???????????????') {
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
                    disabled={info_index === '?????????' || info_index === '????????????' ? true : customer_info === '??? ????????? ????????????!' ? true : false}>
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
                    disabled={customer_info === '??? ????????? ????????????!' ? true : false}>
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
                    <Text style={{ fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17, }}>??? ????????? ????????????!</Text> :
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
                    <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>?????? ?????? ??????</Text>
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
                        <Text style={{ fontFamily: 'NanumSquare_acB', color: '#ffffff', fontSize: 20 }}>??????</Text>
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
                    {/* ????????? ?????? ??????*/}
                    <View style={{ flex: 1, width: '100%', }}>
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            <Text style={{ width: '100%', paddingLeft: 20, paddingVertical: 10, fontSize: 23, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>??? ?????? ??????</Text>
                            {/* ????????? ???????????? ????????? */}
                            <Info info_cata={'????????????'} />
                            {isunfold1 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'?????????'} customer_info={info.nick_name} />
                                    <Horizontal_Detail_info info_index={'????????????'} customer_info={info.birth.substr(0, 10)} />
                                    <Horizontal_Detail_info info_index={'????????? ????????? ????????????????'} customer_info={
                                        shopping_preference === 1 ? '??????' : shopping_preference === 2 ? '??????' : shopping_preference === 3 ? '??????' : '??? ????????? ????????????!'
                                    } />
                                    <Horizontal_Detail_info info_index={'????????? ????????? ????????? ????????????????'} customer_info={
                                        shopping_effort === 1 ? '??????' : shopping_effort === 2 ? '??????' : shopping_effort === 3 ? '??????' : '??? ????????? ????????????!'
                                    } />
                                    <Horizontal_Detail_info info_index={'???????????????'} customer_info={
                                        trend_sensitive === 1 ? '??????' : trend_sensitive === 2 ? '??????' : trend_sensitive === 3 ? '??????' : '??? ????????? ????????????!'
                                    } />
                                    <Horizontal_Detail_info info_index={'??????'} customer_info={
                                        job === '' ? '??? ????????? ????????????!' : job
                                    } />
                                    <Horizontal_Detail_info info_index={'??????/?????? ??? ??????'} customer_info={
                                        working_fashion === '' ? '??? ????????? ????????????!' : working_fashion
                                    } />
                                    <Horizontal_Detail_info info_index={'???/?????????'} customer_info={
                                        height === 0 || weight === 0 ? '??? ????????? ????????????!' : height + 'cm/' + weight + 'kg'
                                    } />
                                    <Horizontal_Detail_info info_index={'??????'} customer_info={
                                        body_shape === 1 ? '?????????' : body_shape === 2 ? '?????????' : body_shape === 3 ? '?????????' : body_shape === 4 ? '?????????' : '??? ????????? ????????????!'
                                    } />
                                    <Vertical_Detail_info info_index={'?????? ????????????'} customer_info={
                                        complex_top === '' || complex_bottom === '' ? '??? ????????? ????????????!' : complex_top + ', ' + complex_bottom
                                    } />
                                </View> : null
                            }
                            <Info info_cata={'?????????'} />
                            {isunfold2 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Horizontal_Detail_info info_index={'??????'} customer_info={
                                        size_top === 0 || feeling_top === 0 ? '??? ????????? ????????????!' :
                                            size_top === 1 ? feeling_top === 1 ? '90, ??? ?????? ??????' : feeling_top === 2 ? '90, ??? ?????? ??????' : '90, ?????? ?????? ??????' :
                                                size_top === 2 ? feeling_top === 1 ? '95, ??? ?????? ??????' : feeling_top === 2 ? '95, ??? ?????? ??????' : '95, ?????? ?????? ??????' :
                                                    size_top === 3 ? feeling_top === 1 ? '100, ??? ?????? ??????' : feeling_top === 2 ? '100, ??? ?????? ??????' : '100, ?????? ?????? ??????' :
                                                        size_top === 4 ? feeling_top === 1 ? '105, ??? ?????? ??????' : feeling_top === 2 ? '105, ??? ?????? ??????' : '105, ?????? ?????? ??????' :
                                                            feeling_top === 1 ? '110, ??? ?????? ??????' : feeling_top === 2 ? '110, ??? ?????? ??????' : '110, ?????? ?????? ??????'
                                    } />
                                    <Horizontal_Detail_info info_index={'??????'} customer_info={
                                        size_waist === 0 || feeling_waist === 0 ? '??? ????????? ????????????!' :
                                            size_waist === 1 ? feeling_waist === 1 ? '28, ??? ?????? ??????' : feeling_waist === 2 ? '28, ??? ?????? ??????' : '28, ?????? ?????? ??????' :
                                                size_waist === 2 ? feeling_waist === 1 ? '29, ??? ?????? ??????' : feeling_waist === 2 ? '29, ??? ?????? ??????' : '29, ?????? ?????? ??????' :
                                                    size_waist === 3 ? feeling_waist === 1 ? '30, ??? ?????? ??????' : feeling_waist === 2 ? '30, ??? ?????? ??????' : '30, ?????? ?????? ??????' :
                                                        size_waist === 4 ? feeling_waist === 1 ? '31, ??? ?????? ??????' : feeling_waist === 2 ? '31, ??? ?????? ??????' : '31, ?????? ?????? ??????' :
                                                            size_waist === 5 ? feeling_waist === 1 ? '32, ??? ?????? ??????' : feeling_waist === 2 ? '32, ??? ?????? ??????' : '32, ?????? ?????? ??????' :
                                                                size_waist === 6 ? feeling_waist === 1 ? '33, ??? ?????? ??????' : feeling_waist === 2 ? '33, ??? ?????? ??????' : '33, ?????? ?????? ??????' :
                                                                    size_waist === 7 ? feeling_waist === 1 ? '34, ??? ?????? ??????' : feeling_waist === 2 ? '34, ??? ?????? ??????' : '34, ?????? ?????? ??????' :
                                                                        size_waist === 8 ? feeling_waist === 1 ? '35, ??? ?????? ??????' : feeling_waist === 2 ? '35, ??? ?????? ??????' : '35, ?????? ?????? ??????' :
                                                                            feeling_waist === 1 ? '36, ??? ?????? ??????' : feeling_top === 2 ? '36, ??? ?????? ??????' : '36, ?????? ?????? ??????'
                                    } />
                                    <Horizontal_Detail_info info_index={'?????????'} customer_info={
                                        size_outer === 1 ? 90 : size_outer === 2 ? 95 :
                                            size_outer === 3 ? 100 : size_outer === 4 ? 105 :
                                                size_outer === 5 ? 110 : '??? ????????? ????????????!'
                                    } />
                                    <Horizontal_Detail_info info_index={'??????'} customer_info={
                                        size_shoes === 1 ? '250mm' : size_shoes === 2 ? '255mm' : size_shoes === 3 ? '260mm' : size_shoes === 4 ? '265mm' :
                                            size_shoes === 5 ? '270mm' : size_shoes === 6 ? '275mm' : size_shoes === 7 ? '280mm' : size_shoes === 8 ? '285mm' :
                                                size_shoes === 9 ? '290mm' : size_shoes === 10 ? '300mm' : '??? ????????? ????????????!'
                                    } />
                                </View> : null
                            }
                            {/* ?????? ???????????? ?????? ?????? */}
                            <Info info_cata={'???????????????'} />
                            {isunfold3 ?
                                <View style={{ marginBottom: 10 }}>
                                    <Vertical_Photo_info info_index={'?????? ?????? ??????'} />
                                    <View style={{ flex: 1, width: '100%', paddingVertical: 4 }}>
                                        <Text style={{ width: '100%', paddingBottom: 5, paddingHorizontal: 20, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 17 }}>?????? ?????? ?????????</Text>
                                        <View style={{ flex: 1, width: '100%', }}>
                                            {look_preference === '' ?
                                                <Text style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 2.5, fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 17, }}>??? ????????? ????????????!</Text> :
                                                <FlatList horizontal={true}
                                                    showsHorizontalScrollIndicator={true}
                                                    data={look_preference}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <TouchableOpacity style={{
                                                                width: 150, aspectRatio: 1 / 1, borderRadius: 10,
                                                                marginLeft: index === 0 ? 10 : 0,
                                                                marginRight: 10, justifyContent: 'center', alignItems: 'center'
                                                            }} onPress={() => { changeModal('?????? ?????? ?????????') }} activeOpacity={0.8}>
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
