import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const ImgPickerModal = ({ setSendType, setText, setImages, setImage_text, setSendMode, styling_id, setModalVisible }) => {
  const windowWidth = Dimensions.get('window').width;
  let imageList = [];
  let imageText = [];

  let date = Date.now();

  return (
    <TouchableWithoutFeedback onPress={() => {
      setModalVisible(false);
    }}>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 3, flex: 1, }}>
        <View style={{ width: '70%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 20, }}>
          <Text style={{ width: '100%', textAlign: 'center', paddingVertical: 10, fontSize: 28, fontFamily: 'NanumSquare_acR', borderBottomWidth: 3, }}>
            사진 업로드</Text>
          <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }} onPress={() => {
            //처리할것!!!!
            launchCamera({ mediaType: 'photo', cameraType: 'back', }, (response) => {
              if (!response.didCancel) {
                imageList.push({
                  name: `${styling_id}${date}-0`,
                  type: response.type,
                  uri: response.uri
                });
                setImages(imageList);
                setSendType('image');
                setText('(사진)');
                setSendMode(true);
                setModalVisible(false);
              }
              else {
                setSendType('text');
                setModalVisible(false);
              }
            })
          }}>
            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR', }}>사진 촬영하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 10, width: '100%', justifyContent: 'center', alignItems: 'center', }}
            onPress={() => {
              ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                forceJpg: true,
                mediaType: 'photo',
              })
                .then(images => {
                  images.map((image, index) => {
                    imageList.push({
                      name: `${styling_id}${date}-${index}.jpg`,
                      type: image.mime,
                      uri: image.path
                    });
                    imageText.push(`https://stylerecipe.s3.ap-northeast-2.amazonaws.com/Chatting/${styling_id}${date}-${index}.jpg`)
                  });
                  setImages(imageList);
                  setImage_text(imageText.join(','));
                  setSendType('image');
                  setText('(사진)');
                  setSendMode(true);
                  setModalVisible(false);
                })
                .catch(error => {
                  console.log(error);
                  setSendType('text');
                  setModalVisible(false);
                });
            }}>
            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR', }}>갤러리에서 선택하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImgPickerModal;
