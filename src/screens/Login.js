import { KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile, login, logout, unlink, } from '@react-native-seoul/kakao-login';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StatusBar, Platform, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Naver_logo from '../assets/naver_login_icon.svg';
import Kakao_logo from '../assets/kakao_login_icon.svg';
import Apple_logo from '../assets/apple_login_icon.svg';
import { UserContext } from '../context/UserContext';
import { ChatContext } from '../context/ChatContext';
import Signup from './Signup';
import ip from '../ip';

//5/13 애플 로그인, 자동로그인 추후 구현할것!!!
const iosKeys = {
    kConsumerKey: "VC5CPfjRigclJV_TFACU",
    kConsumerSecret: "f7tLFw0AHn",
    kServiceAppName: "테스트앱(iOS)",
    kServiceAppUrlScheme: "testapp" // only for iOS
};

const androidKeys = {
    kConsumerKey: "BBSDF7plU_e72x6LFtcx",
    kConsumerSecret: "Pg5t4aM2d4",
    kServiceAppName: "Style Recipe"
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

const Login = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [info, actions] = useContext(UserContext);
    const [fcmtoken, setFcmtoken, isread_exist, setIsread_exist] = useContext(ChatContext);
    const [signup, setSignup] = useState(false);
    const [login_token, setLogin_token] = useState('');
    const [user_id, setUser_id] = useState(0);

    useEffect(() => {
        //2. 로그인하여 토큰이 생기면 유저정보 가져오기
        if (login_token !== '' && info.login_type === 1) {
            getUserProfile();
        }
        else if (login_token !== '' && info.login_type === 2) {
            getKaProfile();
        }
    }, [login_token, info.login_type]);

    useEffect(() => {
        //3. 해당 로그인 id가 있는지 없는지로 회원가입여부를 판단
        if (user_id !== 0) {
            axios.get(ip + 'login/first-login?user_id=' + user_id)
                .then((response) => {
                    //4. 신규회원이면 Signup으로 이동
                    if (response.data[0].isFirst === 0) {
                        setSignup(true);
                    }
                    //4. 기존회원이면 login_state = 1로 변경하고 DB에서 유저정보 가져온 뒤 로그인 모달 치우기
                    else {
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
                                actions.setLogin_token(login_token);
                                actions.setUser_profile_photo(response.data[0].user_profile_photo);
                                actions.setLogin_state(1);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user_id]);

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

    const naverLogin = props => {
        return new Promise((resolve, reject) => {
            NaverLogin.login(props, (err, token) => {
                console.log(token);
                //1. 로그인하여 토큰얻기
                setLogin_token(token.accessToken);
                actions.setLogin_type(1);
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
            });
        });
    };

    const signInWithKakao = async () => {
        const KakaoOAuthToken = await login();

        setLogin_token(KakaoOAuthToken.accessToken);
        actions.setLogin_type(2);
    };

    const getUserProfile = async () => {
        const profileResult = await getProfile(login_token);
        if (profileResult.resultcode === "024") {
            // Alert.alert("로그인 실패", profileResult.message);
            Alert.alert('로그인 실패', '알 수 없는 오류로 인해 로그인에 실패하였습니다.')
            return;
        }
        actions.setName(profileResult.response.name);
        if (profileResult.response.gender === 'M') {
            actions.setGender(0);
        }
        else if (profileResult.response.gender === 'F') {
            actions.setGender(1);
        }
        tmp = profileResult.response.mobile.split('-');
        phone_number = tmp.join('');
        actions.setPhone_number(phone_number);
        actions.setEmail(profileResult.response.email);
        setUser_id(profileResult.response.id);
    };

    const getKaProfile = async () => {
        const KakaoProfile = await getKakaoProfile();
        console.log(KakaoProfile);
        actions.setName(KakaoProfile.nickname);
        if (KakaoProfile.gender === 'MALE') {
            actions.setGender(0);
        }
        else if (KakaoProfile.gender === 'FEMALE') {
            actions.setGender(1);
        }
        actions.setPhone_number('PhoneNumber');
        actions.setEmail(KakaoProfile.email);
        setUser_id(KakaoProfile.id);
    };

    const LoginButtonSvg = ({ type, company }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', aspectRatio: 6 / 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                if (company === '네이버') {
                    naverLogin(initials);
                }
                else if (company === '카카오') {
                    signInWithKakao();
                }
            }}>
                {type === 'naver' ?
                    <Naver_logo width={41} height={41} /> :
                    type === 'kakao' ?
                        <Kakao_logo width={41} height={41} /> :
                        <Apple_logo width={41} height={41} />
                }
                <Text style={{ fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginLeft: 10, fontSize: 26 }} >{company}로 시작하기</Text>
            </TouchableOpacity>
        );
    }

    return (
        !signup ?
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                {/* Body */}
                <View style={{ flex: 1, width: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, margin: 10 }} onPress={() => {
                        //모달 닫았을때 다시 안나타나게 하도록 하기 위한 변수셋팅
                        actions.setLoginmodalvisible(false);
                        navigation.goBack();
                    }}>
                        <Icon name='close-outline' size={40} />
                    </TouchableOpacity>
                    <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{
                            width: '80%',
                            fontFamily: 'NanumSquare_acB', includeFontPadding: false, fontSize: 45,
                            marginTop: '20%'
                        }}>Style Rec!pe{'\n'}간편하게 시작해요 :-)</Text>
                    </View>
                    {/* <Text style={{ textAlign: 'center', fontFamily: 'NotoSansKR-Regular', fontSize: 20, includeFontPadding: true, }}>로그인</Text> */}
                    <View style={{ width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>
                        <LoginButtonSvg type={'naver'} company='네이버' />
                        <LoginButtonSvg type={'kakao'} company='카카오' />
                        <LoginButtonSvg type={'apple'} company='Apple' />
                    </View>
                </View>
            </View> :
            <Signup navigation={navigation} login_token={login_token} user_id={user_id} />
    );
}

export default Login;