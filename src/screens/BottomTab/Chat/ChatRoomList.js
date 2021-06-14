import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, StatusBar, Text, Dimensions, TouchableOpacity, ActivityIndicator, FlatList, Image, } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../../context/UserContext';
import { ChatContext } from '../../../context/ChatContext';
import { IndexContext } from '../../../context/BottomTabIndex';
import ip from '../../../ip';

const Chat = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [info, actions] = useContext(UserContext);
  const [index, setIndex] = useContext(IndexContext);
  const [fcmtoken, setFcmtoken, isread_exist, setIsread_exist] = useContext(ChatContext);

  //해당 유저에 맞는 채팅방 목록 DB에서 불러와서 저장하기
  const [chatList, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (info.login_state === 1) {
        axios.get(ip + 'chat/chatlist?user_id=' + info.user_index)
          .then(function (response) {
            // console.log(response.data[0]);
            if (response.data[0].length === 0) {
              setChatlist('No Chat');
            }
            else {
              // console.log(response.data);
              setChatlist(response.data[0]);
            }
            //채팅방 목록 가져오기
            if (response.data[1][0].isread_exist === 1) {
              setIsread_exist(1);
            }
            else if (response.data[1][0].isread_exist === 0) {
              setIsread_exist(0);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // 로그인 상태가 아니라면 로그인 모달 띄우기
      else if (info.login_state === 0 && info.loginmodalvisible === true) {
        navigation.navigate('LoginModal');
        setLoading(true);
      }
    }
    else if (!isFocused) {
      actions.setLoginmodalvisible(true);
    }
  }, [isFocused])

  const renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity style={{
        width: '100%', height: 83, padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dcdcdc',
        justifyContent: 'flex-start', alignItems: 'center',
      }} onPress={() => {
        navigation.navigate('ChatRoom', item);
      }}>
        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'flex-start', alignItems: 'center', }}>
          {item.user_profile_photo === 'default' ? <Icon name='person-circle-outline' size={65} style={{ color: '#787878', }} /> :
            <FastImage source={{ uri: item.user_profile_photo, cache: 'web' }} style={{ height: '90%', aspectRatio: 1 / 1, borderRadius: 100 }} />
          }
          <View style={{ marginLeft: 10, width: '80%', }}>
            <Text style={{ fontSize: 18, fontFamily: 'NanumSquare_acEB', marginBottom: 1, color: '#000000', }}>{item.nick_name}</Text>
            {item.message_type === 'image' ?
              <Text style={{ width: '100%', color: '#000000', fontSize: 13.5, fontFamily: 'NanumSquare_acR', }}>(사진)</Text> :
              <Text numberOfLines={2} style={{ width: '100%', color: '#000000', fontSize: 13.5, fontFamily: 'NanumSquare_acR', }}>{item.chat_text}</Text>
            }
          </View>
        </View>
        <Text style={{ color: '#000000', fontSize: 11, position: 'absolute', right: 13, top: 11, }}>{item.timestamp.slice(0, 16)}</Text>
        {item.is_read === 0 ?
          <Icon name='alert-circle' size={30} style={{ position: 'absolute', right: 10, bottom: 10 }} color='red' /> : null
        }
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index, []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
      {/* Header */}
      <View style={{
        minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
        justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
      }}>
        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>Chatting</Text>
      </View>
      {/* Body */}
      <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
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
            </View> : chatList === 'No Chat' ?
              <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'flex-start', alignItems: 'center', }}>
                <View style={{ height: '20%' }} />
                <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 30, marginBottom: 20 }}>스타일 레시피 시작해볼까요?</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Stylist');
                  setIndex('Stylist');
                }}
                  style={{ borderRadius: 10, backgroundColor: '#000000', width: '60%', justifyContent: 'center', alignItems: 'center', paddingVertical: windowHeight / 50 }}>
                  <Text style={{ fontFamily: 'NanumSquare_acR', color: '#ffffff', fontSize: 20 }}>예약하러가기</Text>
                </TouchableOpacity>
              </View> :
              <View style={{ flex: 1, width: '100%', backgroundColor: '#FFFFFF' }}>
                <FlatList
                  data={chatList}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
              </View>
        }
      </View>
      {/* BottomTab */}
      {/* <View style={{ flex: 10, width: '100%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#d2d2d2', backgroundColor: '#ffffff' }}>
        <BottomTabBar navigation={navigation} tabindex={2}/>
      </View> */}
    </View>
  );
}

export default Chat;