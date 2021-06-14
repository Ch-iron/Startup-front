import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import ip from '../../../ip';

// type에 따라 요청서 확인 중, 스타일링 완료, 상담 완료 Bubble 을 return 해야한다.

const SystemBubble = ({ item, navigation, user_id }) => {
  const SelectButton = ({ handleClick, text }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handleClick}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  let requestReviewContent;

  switch (item.chat_text) {
    case '요청서 확인 중':
      requestReviewContent = {
        header: '요청서 확인 중',
        main: `어드바이저가 요청서를 확인 중 입니다.\n\n접수 후 최대 24시간 이내 스타일링이 완료될 예정이며 접수 완료 시에는 수정이 불가하오니 확인 부탁드립니다.\n\n- 요청일시 : ${1}\n- 요청번호 : ${2}\n- 어드바이저 : ${'김민수'}`,
        buttonText: '요청서 보기/수정',
      };
      break;

    case '요청서 접수 완료!':
      requestReviewContent = {
        header: '요청서 접수 완료!',
        main: '요청서가 접수되었습니다.',
        buttonText: '요청서 확인',
      };
      break;
    case '스타일링 완료!':
      requestReviewContent = {
        header: '스타일링 완료!',
        main:
          '스타일링이 완료되었습니다.\n\n제안 받으신 스타일을 구매, 착용 후 사진을 업로드해주시면 피드백이 진행됩니다.',
        buttonText: '스타일 제안서로 이동',
      };
      break;
    case '상담 완료':
      requestReviewContent = {
        header: '상담 완료',
        main: '상담이 종료되었습니다.',
        buttonText: '후기 작성하러 가기',
      };
    default:
      break;
  }

  const messageTextColor = '#3B3B3B';

  return (
    <View style={{
      minHeight: 20,
      width: '70%',

      marginVertical: 10,
      borderRadius: 10,
      borderColor: '#E6E6E6',
      borderWidth: 1,

      marginLeft: user_id === item.send_id ? 0 : 10,
      marginRight: user_id === item.send_id ? 10 : 0,
      backgroundColor: '#FFFFFF',
    }}>
      <View style={styles.bubbleHeader}>
        <Text style={styles.bubbleHeaderText}>
          {requestReviewContent.header}
        </Text>
      </View>
      <View style={styles.bubbleMain}>
        <TouchableOpacity
          activeOpacity={0.8}>
          <Text
            style={{ ...styles.messageMainText, color: messageTextColor }}
            numberOfLines={50}>
            {requestReviewContent.main}
          </Text>
        </TouchableOpacity>
      </View>
      <SelectButton
        handleClick={() => {
          if (requestReviewContent.header === '요청서 접수 완료!') {
            navigation.navigate('System_Requirement', item.chat_index);
          }
          else if (requestReviewContent.header === '스타일링 완료!') {
            navigation.navigate('System_Suggestion', item.chat_index);
          }
          else if (requestReviewContent.header === '상담 완료') {
            axios.get(ip + 'chat/chat-review?styling_id=' + item.chat_index + '&user_id=' + parseInt(user_id))
              .then(function (response) {
                console.log(response.data)
                if (response.data[0].review_write === 0) {
                  navigation.navigate('Chat_Review', response.data[0]);
                }
                else if (response.data[0].review_write === 1){
                  toast.show('후기가 이미 작성되었습니다.');
                }
              })
              .catch((error) => {
                console.log(error);
            });
          }
        }}
        text={requestReviewContent.buttonText}
      />
      <Toast ref={(toast) => this.toast = toast} style={{ backgroundColor: '#000000' }} position='top' positionValue={80} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleHeader: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#3F3F3F',
    padding: 10,
  },
  bubbleHeaderText: {
    color: '#FFFFFF',
    fontFamily: 'NanumSquare_acB'
  },
  bubbleMain: {
    padding: 10,
    paddingRight: 12,
  },
  messageMainText: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'NanumSquare_acR'
  },
  buttonWrapper: {
    width: '90%',
    height: 40,

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    borderColor: '#E6E6E6',
    borderWidth: 1,

    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3C3C3C',
  },
});

export default SystemBubble;
