import React, { useEffect, useContext } from 'react';
import { View, StatusBar, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import { RequestContext } from '../../../context/RequestContext';
import FastImage from 'react-native-fast-image'

const Product_detail1 = ({ navigation, route }) => {
  const [survey, request, photo, actions] = useContext(RequestContext);

  const feed_item = route.params;
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    actions.setStylist_id(feed_item.profile.stylist_id);
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
      {/* Body */}
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        {/* Feed_Image */}
        <View style={{ flex: 5, width: '100%', }}>
          <FastImage source={{ uri: feed_item.detail.feed_photo, cache: 'web' }} style={{ flex: 1, width: '100%', }} />
        </View>
        {/* Intro */}
        <View style={{ height: 105, width: '100%', backgroundColor: '#ffffff' }}>
          {/* Name */}
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onPress={() => {
            navigation.navigate('Stylist_Profile', {
              profile: feed_item.profile,
              feed: feed_item.feed,
            })
            // console.log(feed_item);
          }}>
            <Image source={{ uri: feed_item.profile.profile_photo }}
              style={{ height: '70%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: '10%', marginRight: 10, }}
            />
            <View style={{ width: '100%', flex: 1, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', }}>
                <Text style={{ fontSize: 27, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{feed_item.profile.nick_name}</Text>
                <Text style={{ fontSize: 17, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3, }}> 어드바이저</Text>
              </View>
              <Text style={{ width: '90%', fontSize: 16, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, }}>
                {feed_item.profile.profile_introduction}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Empty_Space */}
        <View style={{ width: '100%', height: 8, backgroundColor: '#dcdcdc' }}></View>
        {/* Description */}
        <View style={{ flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: '80%', }}>
            <Text style={{ fontSize: 17, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginTop: 5, }}>{feed_item.detail.feed_description}</Text>
            <View style={{ width: '100%', height: 80, }}/>
          </ScrollView>
        </View>
        <FloatingButton title='예약하기' navigation={navigation} index='Intro0' next={true} />
      </View>
      {/* Header */}
      <LinearGradient colors={['#464646', 'transparent']} style={{
        width: '100%', height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        borderBottomWidth: 1, borderBottomColor: '#d2d2d2', position: 'absolute', top: 0
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 16 }}>
          <Icon name='chevron-back' size={33} color='#ffffff'/>
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false, color: '#ffffff' }}>PROF!LE</Text>
        <TouchableOpacity onPress={() => navigation.popToTop()} style={{ position: 'absolute', right: 10 }}>
          <Icon name='home-outline' size={33} color='#ffffff'/>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default Product_detail1;