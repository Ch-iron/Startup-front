import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, Modal, Image, DeviceEventEmitter } from 'react-native';
import Header from '../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import Camera_Gallery_review from '../../Camera_Gallery_review';
import ip from '../../../ip';
import s3 from '../../../s3';

const Review = ({ navigation, route }) => {
    const [item, setItem] = useState('');
    const [rate, setRate] = useState(0);
    const [istouched, setIstouched] = useState(false);
    const [review, setReview] = useState('');
    const [review_complete, setReview_complete] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [photo4, setPhoto4] = useState('');
    const [photo5, setPhoto5] = useState('');
    const [index, setIndex] = useState(0);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const styling = route.params;

    console.log(styling);

    useEffect(() => {
        // console.log(index);
        if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5) {
            setModalVisible(true);
        }
        else
            setModalVisible(false);
    }, [index]);

    useEffect(() => {
        if(review_complete === true){
            // console.log('review_complete 리뷰창 : ' + review_complete);
            navigation.navigate({
                name: 'ChatRoom',
                params: {review_complete: review_complete},
                merge: true,
            })
        }
    }, [review_complete])

    const disable = (index) => {
        if (index === 1) return false;
        else if (index === 2) {
            if (photo1 === '') return true;
            else false;
        }
        else if (index === 3) {
            if (photo2 === '') return true;
            else false;
        }
        else if (index === 4) {
            if (photo3 === '') return true;
            else false;
        }
        else if (index === 5) {
            if (photo4 === '') return true;
            else false;
        }
    }

    const Add_photo = ({ index }) => {
        return (
            <View style={{ width: '15%', aspectRatio: 1 / 1, borderWidth: 1, borderColor: '#969696', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <TouchableOpacity onPress={() => { setIndex(index); }} disabled={disable(index)}>
                    <MaterialIcons name='add-a-photo' size={30} color='#969696' />
                </TouchableOpacity>
            </View>
        );
    }

    const Star = ({ num }) => {
        return (
            <TouchableOpacity onPress={() => {
                setRate(num);
                if (istouched === false) {
                    setIstouched(true);
                }
            }}>
                <Ionicons name='star' size={32} color={rate >= num ? '#ffd400' : '#969696'} />
            </TouchableOpacity>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                    {/* Header */}
                    <View style={{ flex: 9, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
                        <Header title="Review 작성" navigation={navigation} isMain={false} />
                    </View>
                    {/* Body */}
                    <Modal animationType='none' visible={modalVisible} transparent={true} onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <Camera_Gallery_review index={index} setIndex={setIndex} setPhoto1={setPhoto1} setPhoto2={setPhoto2} setPhoto3={setPhoto3} setPhoto4={setPhoto4} setPhoto5={setPhoto5} ordernum={styling.styling_id} />
                    </Modal>
                    {istouched === false ?
                        <View style={{ flex: 125, width: '100%', }}>
                            {/* 상단 여백 */}
                            <View style={{ flex: 1, width: '100%' }}></View>
                            {/* 중간 별 */}
                            <View style={{ flex: 2, width: '100%', }}>
                                <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>스타일링은 어떠셨어요?</Text>
                                    <Text style={{ fontSize: 17, color: '#969696', marginTop: 10, fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>{styling.nick_name} 어드바이저</Text>
                                </View>
                                <View style={{ flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 70, paddingBottom: 50, alignItems: 'center', justifyContent: 'space-evenly', }}>
                                    <Star num={1} />
                                    <Star num={2} />
                                    <Star num={3} />
                                    <Star num={4} />
                                    <Star num={5} />
                                </View>
                            </View>
                            {/* 하단 여백 */}
                            <View style={{ flex: 2, width: '100%' }}/>
                        </View> :
                        <View style={{ flex: 125, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                            {/* 상단 부분 */}
                            <View style={{ flex: 40, width: '100%', paddingTop: 50 }}>
                                {/* 별점 */}
                                <View style={{ flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 70, justifyContent: 'space-around', }}>
                                    <Star num={1} />
                                    <Star num={2} />
                                    <Star num={3} />
                                    <Star num={4} />
                                    <Star num={5} />
                                </View>
                                {/* 서술 내용 */}
                                <View style={{ flex: 5, width: '100%', paddingHorizontal: 20 }}>
                                    <Text style={{ marginBottom: 10, fontFamily: 'NanumSquare_acR', fontSize: 14 }}>{styling.nick_name} 어드바이저 - {styling.tpo}</Text>
                                    <TextInput style={{ height: 150, width: '100%', borderWidth: 1, borderColor: '#969696' }}
                                        multiline={true} textAlignVertical='top' onChangeText={setReview} backgroundColor='#ffffff' placeholder='전반적인 스타일링에 대해 솔직한 리뷰를 남겨주세요.' />
                                </View>
                                {/* 사진 첨부 */}
                                <View style={{ flex: 5, width: '100%', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-around', }}>
                                    {photo1 !== '' ?
                                        <TouchableOpacity onPress={() => { setIndex(1) }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }}>
                                            <FastImage source={{ uri: photo1.uri, cache: 'web' }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }} />
                                        </TouchableOpacity> : <Add_photo index={1} />
                                    }
                                    {photo2 !== '' ?
                                        <TouchableOpacity onPress={() => { setIndex(2) }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }}>
                                            <FastImage source={{ uri: photo2.uri, cache: 'web' }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }} />
                                        </TouchableOpacity> : <Add_photo index={2} />
                                    }
                                    {photo3 !== '' ?
                                        <TouchableOpacity onPress={() => { setIndex(3) }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }}>
                                            <FastImage source={{ uri: photo3.uri, cache: 'web' }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }} />
                                        </TouchableOpacity> : <Add_photo index={3} />
                                    }
                                    {photo4 !== '' ?
                                        <TouchableOpacity onPress={() => { setIndex(4) }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }}>
                                            <FastImage source={{ uri: photo4.uri, cache: 'web' }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }} />
                                        </TouchableOpacity> : <Add_photo index={4} />
                                    }
                                    {photo5 !== '' ?
                                        <TouchableOpacity onPress={() => { setIndex(5) }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }}>
                                            <FastImage source={{ uri: photo5.uri, cache: 'web' }} style={{ width: '15%', aspectRatio: 1 / 1, borderRadius: 5 }} />
                                        </TouchableOpacity> : <Add_photo index={5} />
                                    }
                                </View>
                            </View>
                            {/* 하단 여백 */}
                            <View style={{ flex: 13, width: '100%' }}></View>
                            {review !== '' ?
                                <TouchableOpacity onPress={() => {
                                    const review_photo = new FormData();

                                    if (photo1 !== '') {
                                        review_photo.append('image', {
                                            name: photo1.fileName,
                                            type: photo1.type,
                                            uri: photo1.uri
                                        });
                                    };
                                    if (photo2 !== '') {
                                        review_photo.append('image', {
                                            name: photo2.fileName,
                                            type: photo2.type,
                                            uri: photo2.uri
                                        });
                                    };
                                    if (photo3 !== '') {
                                        review_photo.append('image', {
                                            name: photo3.fileName,
                                            type: photo3.type,
                                            uri: photo3.uri
                                        });
                                    };
                                    if (photo4 !== '') {
                                        review_photo.append('image', {
                                            name: photo4.fileName,
                                            type: photo4.type,
                                            uri: photo4.uri
                                        });
                                    };
                                    if (photo5 !== '') {
                                        review_photo.append('image', {
                                            name: photo5.fileName,
                                            type: photo5.type,
                                            uri: photo5.uri
                                        });
                                    };

                                    axios.post(ip + 'mypage/review', {
                                        styling_id: styling.styling_id,
                                        user_id: styling.user_id,
                                        stylist_id: styling.stylist_id,
                                        user_rating: rate,
                                        user_photo: photo5 !== '' ?
                                            s3 + 'Review/' + styling.styling_id + '1.jpg,' +
                                            s3 + 'Review/' + styling.styling_id + '2.jpg,' +
                                            s3 + 'Review/' + styling.styling_id + '3.jpg,' +
                                            s3 + 'Review/' + styling.styling_id + '4.jpg,' +
                                            s3 + 'Review/' + styling.styling_id + '5.jpg' : photo4 !== '' ?
                                                s3 + 'Review/' + styling.styling_id + '1.jpg,' +
                                                s3 + 'Review/' + styling.styling_id + '2.jpg,' +
                                                s3 + 'Review/' + styling.styling_id + '3.jpg,' +
                                                s3 + 'Review/' + styling.styling_id + '4.jpg' : photo3 !== '' ?
                                                    s3 + 'Review/' + styling.styling_id + '1.jpg,' +
                                                    s3 + 'Review/' + styling.styling_id + '2.jpg,' +
                                                    s3 + 'Review/' + styling.styling_id + '3.jpg' : photo2 !== '' ?
                                                        s3 + 'Review/' + styling.styling_id + '1.jpg,' +
                                                        s3 + 'Review/' + styling.styling_id + '2.jpg' : photo1 !== '' ?
                                                            s3 + 'Review/' + styling.styling_id + '1.jpg' : 'No photo',
                                        user_review_text: review
                                    })
                                        .then((response) => {
                                            // console.log(response);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });

                                    axios.post(ip + 'mypage/image-upload-review', review_photo)
                                        .then((response) => {
                                            console.log(response);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                        setReview_complete(true);
                                }}
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                                        position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                                    }}>
                                    <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>완료</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => {
                                    toast.show('후기를 작성해주세요!');
                                }}
                                    style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: 50, position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30, }}>
                                    <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>완료</Text>
                                    <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={-50} />
                                </TouchableOpacity>
                            }
                        </View>}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Review;
