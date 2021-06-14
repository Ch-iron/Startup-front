import { KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile, login, logout, unlink, } from '@react-native-seoul/kakao-login';
import React, { useState, useEffect, useContext } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, Alert, Dimensions, ActivityIndicator, FlatList, Modal, TouchableWithoutFeedback, } from 'react-native';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import Header from '../../components/Header';
import BottomTabBar from '../../components/BottomTabBar';
import { UserContext } from '../../../context/UserContext';
import { IndexContext } from '../../../context/BottomTabIndex';
import Requirements from './Tab_Requirement';
import Suggestion from './Tab_Suggestion';
import Billing from './Tab_Bill';
import ip from '../../../ip';
import s3 from '../../../s3';

const My_Page = ({ navigation, route }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [info, actions] = useContext(UserContext);
  const [index, setIndex] = useContext(IndexContext);
  const [tabindex, setTabindex] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const [requireLoading, setRequireLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [requirement_count, setRequirement_count] = useState(0);

  const [suggestionLoading, setSuggestionLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestion_count, setSuggestion_count] = useState(0);

  const [billingLoading, setBillingLoading] = useState(true);
  const [billing, setBilling] = useState([]);
  const [billing_count, setBilling_count] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [profile_photo, setProfile_photo] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      //로그인이 되어있다면 해당 유저의 요청서, 제안서, 결제내역 개수를 가져오기
      if (info.login_state === 1) {
        // console.log(info.user_profile_photo);
        axios.get(ip + 'mypage/requirement-suggestion-billing-count?user_id=' + info.user_index)
          .then(function (response) {
            // console.log(response.data);
            setRequirement_count(response.data[2][0].requirement_count);
            setSuggestion_count(response.data[0][0].suggestion_count);
            setBilling_count(response.data[1][0].payment_count)
          })
          .catch((error) => {
            console.log(error);
          });

        //현재 탭이 어디인가에 따라서 가져오는 정보 달라짐, 1번탭은 요청서, 2번탭은 제안서, 3번탭은 결제내역 가져옴
        if (tabindex === 1) {
          axios.get(ip + 'mypage/requirement?user_id=' + info.user_index)
            .then(function (response) {
              // console.log(response.data[0])
              if (response.data[0] === undefined) {
                setRequirements('No Requirement');
              }
              else {
                setRequirements(response.data);
              }
              setRequireLoading(false);
              setSuggestionLoading(true);
              setBillingLoading(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else if (tabindex === 2) {
          axios.get(ip + 'mypage/suggestion?user_id=' + info.user_index)
            .then(function (response) {
              // console.log(response.data);
              if (response.data[0] === undefined) {
                setSuggestions('No Suggestion');
              }
              else {
                setSuggestions(response.data);
              }
              setSuggestionLoading(false);
              setRequireLoading(true);
              setBillingLoading(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        else if (tabindex === 3) {
          axios.get(ip + 'mypage/billing?user_id=' + info.user_index)
            .then(function (response) {
              // console.log(response.data);
              if (response.data[0] === undefined) {
                setBilling('No Billing');
              }
              else {
                setBilling(response.data);
              }
              setBillingLoading(false);
              setRequireLoading(true);
              setSuggestionLoading(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setLoading(false);
      }
      //8. 로그인 상태가 아니라면 로그인 모달 띄우기
      else if (info.login_state === 0 && info.loginmodalvisible === true) {
        navigation.navigate('LoginModal');
        setLoading(true);
      }
    }
    //해결은 하였으나 채팅창에서 마이페이지 바로 넘어오거나 그 반대의 경우 둘다 로그인 모달이 안떠오른다. ????
    else if (!isFocused) {
      actions.setLoginmodalvisible(true);
    }
  }, [isFocused])

  useEffect(() => {
    // console.log(requirements);
    if (tabindex === 1) {
      axios.get(ip + 'mypage/requirement?user_id=' + info.user_index)
        .then(function (response) {
          // console.log(response.data[0])
          if (response.data[0] === undefined) {
            setRequirements('No Requirement');
          }
          else {
            setRequirements(response.data);
          }
          setRequireLoading(false);
          setSuggestionLoading(true);
          setBillingLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (tabindex === 2) {
      axios.get(ip + 'mypage/suggestion?user_id=' + info.user_index)
        .then(function (response) {
          // console.log(response.data);
          if (response.data[0] === undefined) {
            setSuggestions('No Suggestion');
          }
          else {
            setSuggestions(response.data);
          }
          setSuggestionLoading(false);
          setRequireLoading(true);
          setBillingLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (tabindex === 3) {
      axios.get(ip + 'mypage/billing?user_id=' + info.user_index)
        .then(function (response) {
          // console.log(response.data);
          if (response.data[0] === undefined) {
            setBilling('No Billing');
          }
          else {
            setBilling(response.data);
          }
          setBillingLoading(false);
          setRequireLoading(true);
          setSuggestionLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tabindex])

  useEffect(() => {
    // console.log('프로필 사진uri: ' + info.user_profile_photo);
    axios.post(ip + 'mypage/update-user-profile', {
      user_index: info.user_index,
      user_profile_photo: info.user_profile_photo
    }).then(function (response) {
      // console.log(response);
    })
      .catch((error) => {
        console.log('update_user_profile : ' + error);
      });
  }, [info.user_profile_photo])

  useEffect(() => {
    // console.log(profile_photo);
    if (profile_photo !== '') {
      const profile_photo_obj = new FormData();

      profile_photo_obj.append('image', {
        name: profile_photo.fileName,
        type: profile_photo.type,
        uri: profile_photo.uri,
      })

      axios.post(ip + 'mypage/image-upload-user-profile', profile_photo_obj)
        .then(function (response) {
          // console.log(response);
          actions.setUser_profile_photo(s3 + 'User/Profile/' + info.user_index + '-profile.jpg' + '?cache=' + Math.random());
        })
        .catch((error) => {
          console.log('upload_user_profile : ' + error);
        });
    }
  }, [profile_photo]);

  //리뷰쓰고 돌아왔을때 실행
  useEffect(() => {
    if (route.params?.review_complete === true) {
      // console.log('review_complete: ' + route.params?.review_complete);
      // setBillingLoading(true);
      axios.get(ip + 'mypage/billing?user_id=' + info.user_index)
        .then(function (response) {
          // console.log(response.data);
          if (response.data[0] === undefined) {
            setBilling('No Billing');
          }
          else {
            setBilling(response.data);
          }
          setBillingLoading(false);
          setRequireLoading(true);
          setSuggestionLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: '후기작성이 완료되었습니다.',
        visibilityTime: 1000,
        autoHide: true,
      });
    }
    // setReview_complete(false);
  }, [route.params?.review_complete]);

  const naverLogout = () => {
    NaverLogin.logout();
    actions.setLogin_token('');
    actions.setUser_id(0);
    actions.setUser_index(0);
    actions.setLogin_type(0);
    actions.setLogin_state(0);
  };

  const signOutWithKakao = async () => {
    const message = await logout();
    actions.setLogin_token('');
    actions.setUser_id(0);
    actions.setUser_index(0);
    actions.setLogin_type(0);
    actions.setLogin_state(0);
  };

  const TabBarButton = ({ index, num, form }) => {
    return (
      <TouchableOpacity onPress={() => { setTabindex(index); }}
        style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: tabindex === index ? 5 : 0, }}>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 20, color: tabindex === index ? '#000000' : '#b4b4b4', includeFontPadding: false }}>{num}</Text>
          <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 12, color: tabindex === index ? '#000000' : '#b4b4b4', includeFontPadding: false }}>{form}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const TabBar = () => {
    return (
      <View style={{ height: 70, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dcdcdc', }}>
        <TabBarButton index={1} num={requirement_count} form='요청서' />
        <TabBarButton index={2} num={suggestion_count} form='제안서' />
        <TabBarButton index={3} num={billing_count} form='결제내역' />
      </View>
    );
  }

  const Form = () => {
    if (tabindex === 1) {
      return (
        <Requirements loading={requireLoading} requirements={requirements} navigation={navigation} />
      );
    }
    else if (tabindex === 2) {
      return (
        <Suggestion loading={suggestionLoading} suggestions={suggestions} navigation={navigation} />
      );
    }
    else if (tabindex === 3) {
      return (
        <Billing loading={billingLoading} billing={billing} navigation={navigation} />
      );
    }
  }

  const ProfileModal = () => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        setModalVisible(false);
      }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ width: '70%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
            <Text style={{ width: '100%', textAlign: 'center', paddingVertical: 10, fontSize: 28, fontFamily: 'NanumSquare_acR', borderBottomWidth: 3 }}>프로필 사진 업로드</Text>
            <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              actions.setUser_profile_photo('default');
              setProfile_photo('');
              setModalVisible(false);
            }}>
              <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR' }}>기본 프로필 사용하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              launchImageLibrary({ mediaType: 'photo', }, (response) => {
                // console.log(response);
                if (!response.didCancel) {
                  response.fileName = info.user_index + '-profile.jpg';
                  setProfile_photo(response);
                }
              });
              setModalVisible(false);
            }}>
              <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR' }}>갤러리에서 선택하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {/* Header */}
      <View style={{
        minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
        justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
      }}>
        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>My Page</Text>
      </View>
      {/* Body */}
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Modal animationType='none' transparent={true} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalFeed);
        }}>
          <ProfileModal />
        </Modal>
        {info.login_state === 0 ?
          <View style={{ width: '100%', height: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 30 }}>로그인이 필요합니다.</Text>
            <TouchableOpacity style={{ backgroundColor: '#000000', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 5, marginTop: 10, justifyContent: 'center', alignItems: 'center', }}
              onPress={() => { navigation.navigate('LoginModal') }}>
              <Text style={{ fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 20, color: '#ffffff' }}>로그인</Text>
            </TouchableOpacity>
          </View> :
          isLoading ?
            <View style={{ flex: 1, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center', }}>
              <ActivityIndicator size='large' color='#000000' />
            </View> :
            <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
              {/* User profile Section */}
              <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#ffffff', borderBottomWidth: 2, borderBottomColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center', }}>
                {/*User image*/}
                {info.user_profile_photo === 'default' ?
                  <TouchableOpacity style={{ marginLeft: '5%', marginRight: 5, marginVertical: 10, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                    setModalVisible(true);
                  }} activeOpacity={0.8}>
                    <Icon name='person-circle-outline' size={70} style={{ color: '#787878', }} />
                    <View style={{
                      width: 20, backgroundColor: '#d2d2d2', aspectRatio: 1 / 1, borderRadius: 200,
                      justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, bottom: 10,
                    }}>
                      <Icon name='add' size={22} style={{ color: '#ffffff', }} />
                    </View>
                  </TouchableOpacity> :
                  <TouchableOpacity style={{ marginLeft: '5%', marginRight: 5, marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                    setModalVisible(true);
                  }} activeOpacity={0.8}>
                    <FastImage source={{ uri: info.user_profile_photo, cache: 'web' }} style={{
                      width: 65, aspectRatio: 1 / 1, borderRadius: 200,
                    }} />
                    <View style={{
                      width: 20, backgroundColor: '#d2d2d2', aspectRatio: 1 / 1, borderRadius: 200,
                      justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, bottom: 5,
                    }}>
                      <Icon name='add' size={22} style={{ color: '#ffffff', }} />
                    </View>
                  </TouchableOpacity>

                }
                {/*User name*/}
                <View style={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                  <Text style={{ maxWidth: '80%', fontSize: 20, fontFamily: 'NanumSquare_acEB', includeFontPadding: false, marginRight: 5 }}>{info.nick_name}</Text>
                  <Text style={{ minWidth: 17, fontSize: 20, fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>님</Text>
                </View>

                {/*프로필 옆 버튼들*/}
                <View style={{}}>
                  <TouchableOpacity onPress={() => { navigation.navigate('Myinfo') }} style={{
                    borderWidth: 1, borderRadius: 7, padding: 4, marginRight: 10, marginBottom: 5, borderColor: '#d2d2d2'
                  }}>
                    <Text style={{ width: '100%', fontFamily: 'NanumSquare_acR', fontSize: 14, includeFontPadding: false, color: '#b4b4b4' }}>내 정보 수정하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    if (info.login_type === 1) {
                      naverLogout();
                    }
                    else if (info.login_type === 2) {
                      signOutWithKakao();
                    }
                  }} style={{ borderWidth: 1, borderRadius: 7, padding: 4, marginRight: 10, marginTop: 5, borderColor: '#d2d2d2' }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'NanumSquare_acR', fontSize: 14, includeFontPadding: false, color: '#b4b4b4' }}>로그아웃</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TabBar />
              <Form />
            </View>
        }
      </View>
      {/* BottomTab */}
      {/* <View style={{ flex: 10, width: '100%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#d2d2d2', backgroundColor: '#ffffff' }}>
        <BottomTabBar navigation={navigation} tabindex={2} />
      </View> */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

export default My_Page;