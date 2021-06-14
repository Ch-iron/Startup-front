import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StatusBar, Text, ActivityIndicator, FlatList, Dimensions, Image, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import BottomTabBar from '../../components/BottomTabBar';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import ip from '../../../ip';

const Stylist_Select = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [isLoading, setLoading] = useState(true);
  const [stylist, setStylist] = useState([]);
  const [page, setPage] = useState(0);

  //백 버튼 두번누르면 종료 - 안드로이드
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log(this.exitApp);
        if (this.exitApp == undefined || !this.exitApp) {
          ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
          this.exitApp = true;
          this.timeout = setTimeout(() => {
            this.exitApp = false
          }, 2000);
        }
        else {
          clearTimeout(this.timeout);
          this.exitApp = false;
          BackHandler.exitApp();
        }
        return true;
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  )

  useEffect(() => {
    // 스타일리스트 정보 가져오기
    axios.get(ip + 'stylist/stylist?page=' + page)
      .then(function (response) {
        // console.log(response.data[0]);
        setStylist(response.data);
        setLoading(false);
        setPage(page + 10);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onRefresh = () => {
    setLoading(true);
    // 스타일리스트 정보 가져오기
    axios.get(ip + 'stylist/stylist?page=0')
      .then(function (response) {
        setStylist(response.data);
        setLoading(false);
        setPage(10);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLoadMore = () => {
    // setLoading(true);
    // 스타일리스트 정보 가져오기
    axios.get(ip + 'stylist/stylist?page=' + page)
      .then(function (response) {
        setStylist(stylist.concat(response.data));
        // setLoading(false);
        setPage(page + 10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Rating = ({ rate, count }) => {
    const Star = ({ num }) => {
      return (
        <Icon name='star' size={15} color={rate >= num ? '#ffd400' : '#969696'} />
      );
    }

    return (
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
        <Star num={1} />
        <Star num={2} />
        <Star num={3} />
        <Star num={4} />
        <Star num={5} />
        <Text style={{ marginLeft: 5, fontSize: 14, color: '#969696' }}>({count})</Text>
      </View>
    );
  };

  // 스타일리스트 뿌리기
  const renderItem = useCallback(({ item, index }) => {
    // 스타일리스트마다 피드, 후기 정보 가져오기
    const Stylist = () => {
      const [feed, setFeed] = useState([]);

      useEffect(() => {
        axios.get(ip + 'stylist/stylist_feed?stylist_id=' + item.stylist_id)
          .then(function (response) {
            setFeed(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        return () => setFeed([]);
      }, []);

      // 스타일리스트 피드 뿌리기
      const renderItemFeed = ({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Feed_Detail', {
              profile: stylist[stylist.findIndex((i) => i.stylist_id === item.stylist_id)],
              detail: item,
              feed: feed,
            })
          }} style={{
            height: 250, aspectRatio: 1 / 1, justifyContent: 'flex-start', alignItems: 'flex-start',
            marginLeft: index === 0 ? 30 : 10
          }}>
            <FastImage source={{ uri: item.feed_photo, cache: 'web' }} style={{ height: '100%', aspectRatio: 1 / 1, }} />
          </TouchableOpacity>
        )
      };

      const keyExtractorFeed = useCallback((item) => item.feed_index, []);

      // 광고배너
      const Ad = () => {
        return (
          index === 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <FastImage source={require('../../../assets/advertisement.png')} style={{ width: '100%', height: 130, }} resizeMode='contain' />
          </View> : null)
      }

      return (
        <View style={{ width: '100%', }}>
          <Ad />
          <View style={{ width: '100%', }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Stylist_Profile', {
                profile: item,
                feed: feed
              })
            }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10, paddingLeft: '5%', }}
            activeOpacity={0.8}>
              <FastImage source={{ uri: item.profile_photo, cache: 'web' }} style={{ height: 75, aspectRatio: 1 / 1, borderRadius: 200, marginLeft: 10, marginRight: 10 }} />
              <View style={{ width: '100%', justifyContent: 'flex-start', }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 25, fontFamily: 'NanumSquare_acB', includeFontPadding: false }}>{item.nick_name}</Text>
                  <Text style={{ fontSize: 15, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> 어드바이저</Text>
                </View>
                <Rating rate={item.user_rating} count={item.count} />
                <Text style={{ width: '70%', fontSize: 15, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginTop: 5, }}>{item.profile_introduction}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: '100%', }}>
              <FlatList horizontal={true}
                showsHorizontalScrollIndicator={true}
                data={feed}
                renderItem={renderItemFeed}
                keyExtractor={keyExtractorFeed}
                style={{ marginTop: '5%', marginBottom: '5%', }} contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
              />
            </View>
            <View style={{ width: '100%', height: 9, backgroundColor: '#dcdcdc' }}/>
          </View>
        </View>
      );
    }

    return (
      <Stylist />
    );
  });

  const keyExtractor = useCallback((item) => item.stylist_id, []);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
      {/* Header */}
      <Header title='STYLE REC!PE' navigation={navigation} isMain={true} />
      {/* Body */}
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        {/* FlatList로 스타일리스트 뿌리기 */}
        {isLoading ?
          <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator size='large' color='#d2d2d2' />
          </View> :
          <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
            <FlatList
              data={stylist}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={{ flex: 1, width: '100%' }}
              onRefresh={onRefresh}
              refreshing={isLoading}
              onEndReachedThreshold={0.8}
              onEndReached={handleLoadMore}
              removeClippedSubviews={true}
              maxToRenderPerBatch={2}
            />
          </View>
        }
      </View>
      {/* BottomTab */}
      {/* <View style={{ flex: 10, width: '100%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#d2d2d2', backgroundColor: '#ffffff' }}>
        <BottomTabBar navigation={navigation} tabindex={1} />
      </View> */}
    </View>
  );
}

export default Stylist_Select;