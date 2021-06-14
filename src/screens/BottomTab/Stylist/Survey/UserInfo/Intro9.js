import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Header from '../../../../components/Header';
import FloatingButton from '../../../../components/FloatingButton';
import Camera_Gallery from '../../../../Camera_Gallery';
import { UserContext } from '../../../../../context/UserContext';
import s3 from '../../../../../s3';

const Intro9 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [info, useractions] = useContext(UserContext);

    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [photo3, setPhoto3] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const [next, setNext] = useState(false);

    useEffect(() => {
        if (photo1 !== '' && photo2 !== '' && photo3 !== '')
            setNext(true);
    }, [photo1, photo2, photo3]);

    useEffect(() => {
        if (index === 1 || index === 2 || index === 3)
            setModalVisible(true);
        else
            setModalVisible(false);
    }, [index]);

    const contents = {
        body_photo1: s3 + 'User/Body/' + info.user_index + '-body1.jpg',
        body_photo2: s3 + 'User/Body/' + info.user_index + '-body2.jpg',
        body_photo3: s3 + 'User/Body/' + info.user_index + '-body3.jpg',
        body_image1: photo1,
        body_image2: photo2,
        body_image3: photo3,
    }

    const UploadButton = ({ index }) => {
        return (
            <TouchableOpacity style={{ width: '28%', aspectRatio: 1 / 1, borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }} onPress={() => {
                setIndex(index);
            }}>
                <Icon name='add-circle' size={70} />
            </TouchableOpacity>
        );
    }

    const Photo = ({ index, photo }) => {
        return (
            photo !== '' ?
                <TouchableOpacity onPress={() => { setIndex(index) }} style={{ width: '28%', aspectRatio: 1 / 1, marginHorizontal: 5, borderRadius: 10 }}>
                    <FastImage source={{ uri: photo.uri }} style={{ height: '100%', aspectRatio: 1 / 1, marginHorizontal: 5, borderRadius: 10 }} resizeMode='stretch'/>
                </TouchableOpacity> : <UploadButton index={index} />
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='설문조사' navigation={navigation} isMain={false} />
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <Modal animationType='none' visible={modalVisible} transparent={true} onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <Camera_Gallery index={index} setIndex={setIndex} setPhoto1={setPhoto1} setPhoto2={setPhoto2} setPhoto3={setPhoto3} />
                </Modal>
                <View style={{ height: '5%', }}/>
                <Text style={{ width: '100%', textAlign: 'center', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, }}>전신 사진 업로드</Text>
                <Icon name='camera-outline' size={100} />
                <Text style={{ width: '85%', fontSize: 26, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, }}>정확한 스타일링을 위해 최대한 사실적인 사진을 올려주시는게 좋습니다 :-D</Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                    <Photo index={1} photo={photo1} />
                    <Photo index={2} photo={photo2} />
                    <Photo index={3} photo={photo3} />
                </View>
                <FloatingButton title='다음' navigation={navigation} category='body_photo' contents={contents} index='Intro10' next={next} />
            </View>
        </View>
    );
}

export default Intro9;