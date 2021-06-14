import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StatusBar, TextInput, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './components/Header';
import { UserContext } from '../context/UserContext';
import { ChatContext } from '../context/ChatContext';
import axios from "axios";
import ip from '../ip';

const windowWidth = Dimensions.get('window').width;

const Signup = ({ navigation, login_token, user_id }) => {
    const [info, actions] = useContext(UserContext);
    const [fcmtoken, setFcmtoken, isread_exist, setIsread_exist] = useContext(ChatContext);
    const [date, setDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [nick_name, setNick_name] = useState('');
    const [signup_complete, setSignup_complete] = useState(false);

    let birth = JSON.stringify(date).substr(1, 10);

    useEffect(() => {
        //6. 회원가입이 완료되었으면 회원정보 DB로 보내기
        if (signup_complete) {
            axios.post(ip + 'login/login', {
                info
            })
                .then((response) => {
                    console.log('실행되는가?');
                    axios.get(ip + 'login/getprofile?user_id=' + user_id)
                        .then(function (response) {
                            actions.setUser_id(response.data[0].user_id);
                            actions.setUser_index(response.data[0].user_index);
                            actions.setName(response.data[0].name);
                            actions.setNick_name(response.data[0].nick_name);
                            actions.setPhone_number(response.data[0].phone_number);
                            actions.setEmail(response.data[0].email);
                            actions.setGender(response.data[0].gender);
                            actions.setBirth(response.data[0].birth);
                            actions.setSurvey_check(response.data[0].survey_check);
                            actions.setLogin_type(response.data[0].login_type);
                            actions.setLogin_token(response.data[0].login_token);
                            actions.setUser_profile_photo(response.data[0].user_profile_photo);
                            console.log('로그인 진행중');
                            actions.setLogin_state(1);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [signup_complete]);

    useEffect(() => {
        //로그인시에 fcm토큰 업로드, 이미 저장되어있으면 아무것도 안함
        if (info.user_index !== 0) {
            axios.post(ip + 'fcm/upload-fcmtoken', {
                user_id: info.user_index,
                chat_token: fcmtoken
            })
                .then((response) => {
                    // console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            //bottomtab에 안읽음 표시하기 위함
            axios.get(ip + 'chat/isread-exist?user_id=' + info.user_index)
                .then(function (response) {
                    if (response.data[0].isread_exist === 1) {
                        setIsread_exist(1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log('로그인 완료');
            navigation.goBack();
        }
    }, [info.user_index]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                    <View style={{ flex: 1, width: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                        <Modal animationType='fade' visible={modalVisible} transparent={true} onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                                    <DatePicker date={date} onDateChange={setDate} androidVariant='nativeAndroid' mode='date' />
                                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 20, paddingHorizontal: '15%', paddingVertical: 3, }} onPress={() => { setModalVisible(!modalVisible) }}>
                                        <Text style={{ fontSize: 20, fontFamily: 'NanumSquare_acR' }}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, margin: 10 }} onPress={() => {
                                actions.setLoginmodalvisible(false);
                                navigation.goBack();
                            }}>
                                <Icon name='close-outline' size={40} />
                            </TouchableOpacity>
                            <Text style={{
                                width: '80%',
                                fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 45,
                                marginTop: '20%'
                            }}>Style Rec!pe{'\n'}간편하게 시작해요 :-)</Text>
                        </View>
                        <View style={{ width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', width: '70%', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={{ flex: 4, fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 26, }}>닉네임</Text>
                                <TextInput placeholder='최대 8자 입력 가능'
                                    style={{ flex: 6, fontSize: 20, fontFamily: 'NanumSquare_acR', textAlign: 'right', }}
                                    maxLength={8} onChangeText={setNick_name} />
                            </View>
                            <View style={{ flexDirection: 'row', width: '70%', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingBottom: 10 }}>
                                <Text style={{ flex: 4, fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 26, }}>생년월일</Text>
                                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                                    <Text style={{ flex: 6, fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 20 }}>{birth}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {nick_name !== '' ?
                            <TouchableOpacity onPress={() => {
                                actions.setLogin_token(login_token);
                                actions.setUser_id(user_id);
                                actions.setNick_name(nick_name);
                                actions.setBirth(birth);
                                actions.setUser_profile_photo('default');
                                //5. 회원가입 완료
                                setSignup_complete(true);
                            }}
                                style={{
                                    justifyContent: 'center', alignItems: 'center', width: '70%', height: 50,
                                    position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30,
                                }}>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }} >완료</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                toast.show('닉네임을 필수로 입력해주세요!');
                            }}
                                style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: 50, position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30, }}>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }} >완료</Text>
                                <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={-50} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Signup;