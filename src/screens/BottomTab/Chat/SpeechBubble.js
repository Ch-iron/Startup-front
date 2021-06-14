import React, { useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import Images from './Images';
const SpeechBubble = ({ item, isActiveUser }) => {
  const textMessageBubble = isActiveUser
    ? styles.rightTextMessageBubble
    : styles.leftTextMessageBubble;
  const imgMessageBubble = isActiveUser
    ? styles.rightImgMessageBubble
    : styles.leftImgMessageBubble;
  const messageTextColor = isActiveUser ? '#FFFFFF' : '#3B3B3B';
  const { message_type, chat_text } = item;

  let bubble;

  const make_images = () => {
    const arr = chat_text.split(',').map(uri => {
      return { uri };
    });
    return arr;
  };

  switch (message_type) {
    case 'text':
      bubble = (
        <TouchableOpacity
          activeOpacity={0.8}
          style={textMessageBubble}>
          <Text
            style={{ ...styles.messageMainText, color: messageTextColor }}
            numberOfLines={50}>
            {item.chat_text}
          </Text>
        </TouchableOpacity>
      );
      break;
    case 'image':
      const images = make_images();
      bubble = (
        <View style={imgMessageBubble}>
          <Images images={images} />
        </View>
      );
      break;
    default:
      break;
  }

  return bubble;
};

const textMessageBubble = {
  minHeight: 20,
  minWidth: '10%',
  maxWidth: '70%',
  paddingHorizontal: 10,
  paddingVertical: 7,

  marginVertical: 3,
  borderRadius: 10,
  borderColor: '#E6E6E6',
  borderWidth: 1,
};

const imgMessageBubble = {
  flex: 1,
  maxWidth: '60%',
};

const styles = StyleSheet.create({
  rightTextMessageBubble: {
    ...textMessageBubble,
    paddingLeft: 12,
    marginRight: 10,
    backgroundColor: '#3C3C3C',
  },
  leftTextMessageBubble: {
    ...textMessageBubble,
    paddingRight: 12,
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  rightImgMessageBubble: {
    ...imgMessageBubble,
    marginRight: 10,
  },
  leftImgMessageBubble: {
    ...imgMessageBubble,
    marginLeft: 10,
  },
  messageMainText: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'NanumSquare_acR',
  },
});

export default SpeechBubble;
