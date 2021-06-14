import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import AsyncImage from '../AsyncImage';

const Img = props => {
  const {image, style: propsStyle} = props;
  return (
    <View style={[styles.container, propsStyle]}>
      <AsyncImage source={image.uri} />
    </View>
  );
};

export default Img;
