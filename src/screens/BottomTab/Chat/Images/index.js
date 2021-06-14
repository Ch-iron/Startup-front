import React, {useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';

import ImageView from 'react-native-image-viewing';
import Img from '../Img';
import styles from './styles';

// 필요한 기능
// 1. 4개 이상일 때 화면 구성
// 2. 4개 보다 작을 때 화면 구성
// 3. 클릭 시 보이는 화면 구성

const Images = props => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const {images} = props;
  // console.log(props);

  const showImageListModal = (modalVisible, activeImageIndex) => {
    setActiveImageIndex(activeImageIndex);
    setModalVisible(modalVisible);
  };
  const lessThanFourImages = () => {
    const allImages = (
      <View style={[styles.imageContainer]}>
        <View style={styles.flexRow}>
          {images.map((image, i) => (
            <TouchableOpacity
              key={`chat-image-${i}`}
              onPress={() => showImageListModal(!modalVisible, i)}
              activeOpacity={0.8}
              style={styles.flexOne}>
              <Img style={styles.flexOne} image={image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
    return allImages;
  };
  const fourImages = () => {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.fourImagesInnerView}>
          {images.map((image, i) => (
            <TouchableOpacity
              key={`chat-image-${i}`}
              onPress={() => showImageListModal(!modalVisible, i)}
              activeOpacity={0.8}
              style={styles.flexBasisHalf}>
              <Img image={image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  const moreThanFourImages = () => {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.fourImagesInnerView}>
          <TouchableOpacity
            onPress={() => showImageListModal(!modalVisible, 0)}
            activeOpacity={0.8}
            style={styles.flexBasisHalf}>
            <Img image={images[0]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showImageListModal(!modalVisible, 1)}
            activeOpacity={0.8}
            style={styles.flexBasisHalf}>
            <Img image={images[1]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showImageListModal(!modalVisible, 2)}
            activeOpacity={0.8}
            style={styles.flexBasisHalf}>
            <Img image={images[2]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showImageListModal(!modalVisible, 3)}
            activeOpacity={0.8}
            style={styles.flexBasisHalf}>
            <View style={styles.moreImagesOverlayContainer}>
              <View style={styles.moreImagesOverlay}>
                <Text style={styles.imagesCount}>+{images.length - 3}</Text>
              </View>
              <Img image={images[3]} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const {style} = props;

  return (
    <ScrollView style={style}>
      {/* {console.log("hi")} */}
      {images.length < 4 && lessThanFourImages()}
      {images.length === 4 && fourImages()}
      {images.length > 4 && moreThanFourImages()}
      <ImageView
        images={images}
        imageIndex={activeImageIndex}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default Images;
