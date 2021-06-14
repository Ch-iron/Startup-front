import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StatusBar, FlatList, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Dimensions, Modal, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Select_stylist_feed from './Select_stylist_feed';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';
import { UserContext } from '../../../../../context/UserContext';

const Survey1 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [tpoanswer, setTpoanswer] = useState('');
    // const [contents, setContents] = useState('');
    const [etc, setEtc] = useState('');
    const [istouched, setIstouched] = useState(false);
    const [next, setNext] = useState(false);
    const [index, setIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFeed, setModalfeed] = useState(false);
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');

    const [info, useractions] = useContext(UserContext);

    useEffect(() => {
        if (index === 1 || index === 2 || index === 3)
            setModalVisible(true);
        else
            setModalVisible(false);
    }, [index]);

    let date = Date.now();

    const contents = {
        tpo: tpoanswer === '기타' ? etc : tpoanswer,
        photo1: photo1,
        photo2: photo2,
        photo3: photo3,
    }

    useEffect(() => {
        console.log(contents);
        console.log(etc);
        if (tpoanswer.length > 0) {
            if (tpoanswer === '기타') {
                if (etc.length > 0) setNext(true);
                else setNext(false);
            }
            else setNext(true);
        }
        else setNext(false);
    }, [contents, etc]);

    const tpo = [
        {
            id: 1,
            tpo: '데일리'
        },
        {
            id: 2,
            tpo: '소개팅'
        },
        {
            id: 3,
            tpo: '데이트'
        },
        {
            id: 4,
            tpo: '출근'
        },
        {
            id: 5,
            tpo: '하객'
        },
        {
            id: 6,
            tpo: '면접'
        },
        {
            id: 7,
            tpo: '상견례'
        },
        {
            id: 8,
            tpo: '발표'
        },
        {
            id: 9,
            tpo: '여행'
        },
        {
            id: 10,
            tpo: '운동'
        },
        {
            id: 11,
            tpo: '신학기'
        },
        {
            id: 12,
            tpo: '파티'
        },
    ];

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
    }

    const UploadButton = ({ index }) => {
        return (
            <TouchableOpacity style={{ width: '28%', aspectRatio: 1 / 1, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}
                onPress={() => { setIndex(index) }} disabled={disable(index)}>
                <Icon name='add-circle' size={70} />
            </TouchableOpacity >
        );
    }

    const UploadModal = () => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                setIndex(0);
            }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ width: '80%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                        <Text style={{ width: '100%', textAlign: 'center', paddingVertical: 10, fontSize: 28, fontFamily: 'NanumSquare_acR', borderBottomWidth: 3 }}>사진 업로드</Text>
                        <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                            setModalfeed(true);
                        }}>
                            <Text style={{width: '100%', textAlign: 'center', fontSize: 28, fontFamily: 'NanumSquare_acR' }}>스타일리스트 피드에서 선택하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingVertical: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                            launchImageLibrary({ mediaType: 'photo', }, (response) => {
                                // console.log(response);
                                if (!response.didCancel) {
                                    if (index === 1) {
                                        response.fileName = `${date}${info.user_index}-1.jpg`;
                                        setPhoto1(response);
                                    }
                                    else if (index === 2) {
                                        response.fileName = `${date}${info.user_index}-2.jpg`;
                                        setPhoto2(response);
                                    }
                                    else if (index === 3) {
                                        response.fileName = `${date}${info.user_index}-3.jpg`;
                                        setPhoto3(response);
                                    }
                                }
                            });
                            setIndex(0);
                        }}>
                            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR' }}>갤러리에서 선택하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    const renderItem = ({ item, index }) => {
        const Button = ({ title, }) => {
            return (
                <TouchableOpacity style={{
                    width: '16%', marginLeft: 10, marginBottom: 10, backgroundColor: title === tpoanswer ? '#d2d2d2' : '#ffffff', paddingVertical: 8,
                    borderWidth: 1, borderRadius: 30, borderColor: '#d2d2d2', justifyContent: 'center', alignItems: 'center',
                }} onPress={() => {
                    setTpoanswer(title);
                    setIstouched(false);
                }}>
                    <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>{title}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <Button title={item.tpo} index={item.id} />
        );
    };

    const keyExtractor = useCallback((item) => item.id, []);

    const Photo = ({ index, photo }) => {
        return (
            photo !== '' ?
                <TouchableOpacity onPress={() => { setIndex(index) }} style={{ width: '28%', aspectRatio: 1 / 1, marginRight: 5 }}>
                    <FastImage source={{ uri: photo.uri }} style={{ width: '100%', aspectRatio: 1 / 1, marginRight: 5, borderRadius: 10, }} resizeMode='stretch'/>
                </TouchableOpacity> : <UploadButton index={index} />

        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                    {/* Header */}
                    <Header title='설문조사' navigation={navigation} isMain={false} />
                    {/* Body */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                        <Modal animationType='slide' visible={modalFeed} onRequestClose={() => {
                            setModalfeed(!modalFeed);
                        }}>
                            <Select_stylist_feed index={index} setIndex={setIndex} setModalfeed={setModalfeed} setPhoto1={setPhoto1} setPhoto2={setPhoto2} setPhoto3={setPhoto3} />
                        </Modal>
                        <Modal animationType='none' visible={modalVisible} transparent={true} onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <UploadModal />
                        </Modal>
                        <Text style={{ width: '85%', marginVertical: 20, fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>TPO 선택</Text>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                            <FlatList
                                data={tpo}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                numColumns={5}
                            />
                        </View>
                        <View flexDirection='row' style={{ width: '100%', marginTop: 10, }}>
                            <TouchableOpacity style={{ width: '100%', }} onPress={() => {
                                if (!istouched) {
                                    setIstouched(true);
                                    setTpoanswer('기타');
                                }
                                else {
                                    setEtc('');
                                    setIstouched(false);
                                }
                            }
                            }>
                                <View flexDirection='row' style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                                    {istouched === false ?
                                        <View style={{ width: '7%', aspectRatio: 1 / 1, borderRadius: 100, borderWidth: 1, borderColor: '#d2d2d2', marginLeft: 30, marginRight: 10 }}/> :
                                        <View style={{
                                            width: '7%', aspectRatio: 1 / 1, justifyContent: 'center', alignItems: 'center',
                                            borderRadius: 100, borderWidth: 1, borderColor: '#d2d2d2',
                                            marginLeft: 30, marginRight: 10
                                        }}>
                                            <View style={{
                                                width: '80%', aspectRatio: 1 / 1, backgroundColor: '#464646',
                                                borderRadius: 100,
                                            }}/>
                                        </View>}
                                    <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>기타</Text>
                                </View>
                            </TouchableOpacity>
                            {istouched === true ?
                                <TextInput color='#000000' fontSize={18} placeholder='직접입력' placeholderTextColor='#d2d2d2' onChangeText={(tpo) => setEtc(tpo)}
                                    maxLength={10}
                                    style={{ width: '40%', paddingVertical: 4, borderBottomWidth: 1, position: 'absolute', bottom: 0, left: '28%' }} /> : null}
                        </View>
                        <View style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ width: '85%', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>참고사진 업로드</Text>
                        </View>
                        <View flexDirection='row'>
                            <Photo index={1} photo={photo1} />
                            <Photo index={2} photo={photo2} />
                            <Photo index={3} photo={photo3} />
                        </View>
                        <FloatingButton title='다음' navigation={navigation} index='Survey2' category='tpo' contents={contents} next={next} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Survey1;