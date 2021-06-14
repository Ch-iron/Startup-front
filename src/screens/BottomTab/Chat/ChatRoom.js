import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { View, StatusBar, Text, Dimensions, TouchableOpacity, ActivityIndicator, FlatList, TextInput, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-easy-toast';
import ReviewToast from 'react-native-toast-message';
import { UserContext } from '../../../context/UserContext';
import SystemBubble from './SystemBubble';
import SpeechBubble from './SpeechBubble';
import ImgPickerModal from './ImgPickerModal';
import { io } from 'socket.io-client';
import ip from '../../../ip';

const ChatRoom = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [info, actions] = useContext(UserContext);

    const room_state = route.params;
    console.log(room_state);

    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isend, setIsend] = useState(room_state.is_end);

    let socket;

    const initiateSocket = (room) => {
        socket = io('http://15.165.242.227:3001');

        socket.emit('join room', room);

        console.log('Connecting socket...');
        console.log('Join room : ', room);

        socket.on('new message', (message) => {
            // console.log(messages);
            // console.log(message[0]);
            setMessages((curr) => [...curr, message[0]]);
            //채팅 읽음 처리
            axios.get(ip + 'chat/update-isread?styling_id=' + room_state.styling_id + '&user_id=' + info.user_index)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    const disconnectSocket = () => {
        console.log('Disconnecting socket...');
        socket.emit('disconnect room');
        socket.disconnect();
    };

    //채팅방 들어오면 소켓열기
    useEffect(() => {
        initiateSocket(room_state.styling_id);
        axios.get(ip + 'chat/chat-message?styling_id=' + room_state.styling_id)
            .then(function (response) {
                // console.log(response.data);
                setMessages(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        //채팅 읽음 처리
        axios.get(ip + 'chat/update-isread?styling_id=' + room_state.styling_id + '&user_id=' + info.user_index)
            .then(function (response) {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        return disconnectSocket;
    }, []);

    //리뷰쓰고 돌아왔을때 실행
    useEffect(() => {
        if (route.params?.review_complete === true) {
            ReviewToast.show({
                type: 'success',
                position: 'bottom',
                text1: '후기작성이 완료되었습니다.',
                visibilityTime: 1000,
                autoHide: true,
            });
        }
        // setReview_complete(false);
    }, [route.params?.review_complete]);

    const flatListRef = useRef();

    const CustomMessage = useCallback(({ item, checkDay }) => {
        const isActiveUser = item.send_id === info.user_index;
        const messageContent = isActiveUser
            ? { flexDirection: 'row-reverse', } : { flexDirection: 'row', };
        const [changeDay, setChangeDay] = useState(checkDay);

        return (
            <View style={{ width: '100%' }}>
                {changeDay ?
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: windowWidth / 30, color: '#97A0C6', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>
                            {moment(item.timestamp).format('YYYY년 MM월 DD일')}
                        </Text>
                    </View> : null}
                <View style={messageContent}>
                    {item.message_type === 'system' ?
                        <SystemBubble item={item} user_id={info.user_index} navigation={navigation} /> :
                        <SpeechBubble item={item} isActiveUser={isActiveUser} />
                    }
                    <View style={{ flexDirection: 'column-reverse', marginHorizontal: 5, marginBottom: 5 }}>
                        <Text style={{ color: '#97A0C6', fontSize: windowWidth / 30, fontFamily: 'NanumSquare_acR', }}>
                            {moment(item.timestamp).format('a hh:mm')}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }, []);

    let date = '0';

    const renderItem = useCallback(({ item }) => {
        const day = JSON.stringify(item.timestamp);
        let checkDay = false;
        if (date !== day[10]) {
            checkDay = true;
            date = day[10];
        }
        return <CustomMessage item={item} checkDay={checkDay} />;
    }, []);

    const keyExtractor = useCallback((item) => (item.text_index), []);

    const Message_Input = () => {
        const [text, setText] = useState('');
        const [images, setImages] = useState([]);
        const [image_text, setImage_text] = useState('');
        const [sendMode, setSendMode] = useState(false);
        const [sendType, setSendType] = useState('text');
        const [modalVisible, setModalVisible] = useState(false);
        const handleTextChange = (text) => {
            if (text.length === 0) setSendMode(false);
            else setSendMode(true);
            setText(text);
        };
        const handleSubmit = () => {
            if (isend === 0) {
                if (text.length !== 0) {
                    //메시지 DB로 보내기
                    if (sendType === 'text') {
                        axios.post(ip + 'chat/chat-message', {
                            chat_index: room_state.styling_id,
                            chat_text: text,
                            send_id: info.user_index,
                            message_type: sendType,
                        })
                            .then((response) => {
                                console.log(response);
                                //상대방에게 채팅 알람 보내기
                                if (info.user_index === room_state.user_id) {
                                    axios.get(ip + 'fcm/push-notification-chat?user_id=' + room_state.user_id2 + '&nick_name=' + room_state.nick_name + '&chat_text=' + text)
                                        .then(function (response) {
                                            console.log(response);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                                else if (info.user_index === room_state.user_id2) {
                                    axios.get(ip + 'fcm/push-notification-chat?user_id=' + room_state.user_id + '&nick_name=' + room_state.nick_name + '&chat_text=' + text)
                                        .then(function (response) {
                                            console.log(response);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        setText('');
                        setSendMode(false);
                    }
                    else if (sendType === 'image') {
                        const chat_images = new FormData();
                        //S3로 이미지 전송, DB로 메시지 삽입(소켓으로 해당 데이터 emit)
                        images.map((image) => {
                            chat_images.append('image', {
                                name: image.name,
                                type: image.type,
                                uri: image.uri
                            });
                        });
                        axios.post(ip + 'chat/image-upload-chat', chat_images)
                            .then((response) => {
                                console.log(response);
                                axios.post(ip + 'chat/chat-message', {
                                    chat_index: room_state.styling_id,
                                    chat_text: image_text,
                                    send_id: info.user_index,
                                    message_type: sendType,
                                })
                                    .then((response) => {
                                        console.log(response);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        // console.log(images);
                        setSendType('text');
                    }
                }
            }
            else if (isend === 1) {
                toast.show('완료된 상담입니다.');
            }
        };
        return (
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: '#ffffff', }}>
                {/* Camera Button */}
                <Modal
                    animationType="none"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                    visible={modalVisible}>
                    <ImgPickerModal setSendType={setSendType} setText={setText} setImages={setImages} setImage_text={setImage_text} setSendMode={setSendMode} styling_id={room_state.styling_id} setModalVisible={setModalVisible} />
                </Modal>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', }} onPress={() => { setModalVisible(true); }}>
                    <Icon color='#BBBBBB' name='camera-outline' size={25} />
                </TouchableOpacity>
                <TextInput
                    placeholder={'내용을 입력하세요.'}
                    onChangeText={handleTextChange}
                    style={{ flex: 6, height: '100%', paddingLeft: 7, fontSize: 18, fontFamily: 'NanumSquare_acR', }}
                    value={text}
                    multiline={true}
                />
                <TouchableOpacity onPress={handleSubmit} disabled={sendMode ? false : true}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: sendMode ? '#000000' : '#ffffff', }}>
                    <Icon name='paper-plane-outline' size={25} color={sendMode ? '#ffffff' : '#BBBBBB'} />
                </TouchableOpacity>
                <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={-50} />
            </View>
        );
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <View style={{
                minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 16 }}>
                    <Icon name='chevron-back' size={33} />
                </TouchableOpacity>
                {room_state.user_profile_photo === 'default' ? <Icon name='person-circle-outline' size={38} style={{ color: '#787878', }} /> :
                    <FastImage source={{ uri: room_state.user_profile_photo, cache: 'web' }} style={{ height: 38, aspectRatio: 1 / 1, borderRadius: 100, marginRight: 5 }} />
                }
                <Text style={{ fontSize: 29, fontFamily: 'NanumSquare_acB', includeFontPadding: false }}>{room_state.nick_name}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 10, borderRadius: 20, backgroundColor: '#464646', paddingHorizontal: 12, paddingVertical: 4 }}
                    onPress={() => {
                        Alert.alert('상담 완료', '정말로 상담이 완료되었나요?',
                            [
                                {
                                    text: '아니요',
                                    style: 'cancel',
                                    onPress: () => { },
                                },
                                {
                                    text: '네, 완료되었습니다',
                                    style: 'destructive',
                                    onPress: () => {
                                        axios.post(ip + 'chat/chat-message', {
                                            chat_index: room_state.styling_id,
                                            chat_text: '상담 완료',
                                            send_id: info.user_index,
                                            message_type: 'system',
                                        })
                                            .then((response) => {
                                                console.log(response);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                        //DB에 isend체크하기
                                        axios.get(ip + 'chat/update-isend?styling_id=' + room_state.styling_id)
                                            .then(function (response) {
                                                console.log(response);
                                                setIsend(1);
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    },
                                }
                            ]);
                    }}>
                    <Text style={{ fontFamily: 'NanumSquare_acB', color: '#ffffff', fontSize: 20 }}>상담 완료</Text>
                </TouchableOpacity>
            </View>
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#eaeaea' }}>
                {isLoading ?
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size='large' color='#d2d2d2' />
                    </View> :
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        onContentSizeChange={() =>
                            flatListRef.current.scrollToEnd({ animated: false })
                        }
                        style={{ width: '100%', }}
                    />
                }
            </View>
            <Message_Input />
            <ReviewToast ref={(ref) => ReviewToast.setRef(ref)} />
        </View>
    );
}

export default ChatRoom;