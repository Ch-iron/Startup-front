import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ip from '../../ip';

const Notice = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [notice, setNotice] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(ip + 'notice')
      .then(function (response) {
        console.log(response.data)
        setNotice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    const Info = ({ time, title, description }) => {
      const [istouched, setIstouched] = useState(false);

      return (
        <View>
          <TouchableOpacity style={{
            width: '100%', flexDirection: 'row',
            paddingHorizontal: 12.5, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#d2d2d2',
            justifyContent: 'center', alignItems: 'center',
          }} onPress={() => {
            if (istouched === false) setIstouched(true);
            else setIstouched(false);
          }} activeOpacity={1}>
            <View style={{ width: '80%', justifyContent: 'center', alignItems: 'flex-start', }}>
              {/* 날짜 부분 */}
              <View style={{ width: '100%', }}>
                <Text style={{ color: '#8c8c8c', fontSize: 13 }}>{JSON.stringify(time).substr(1, 10)}</Text>
              </View>
              {/* 제목 부분 */}
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start', }}>
                <Text style={{ fontSize: 20, }} numberOfLines={1}>{title}</Text>
              </View>
            </View>
            {/* 내용 보기 부분 */}
            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end', }}>
              {istouched === true ? <Icon name='chevron-up-outline' size={30} /> : <Icon name='chevron-down-outline' size={30} />}
            </View>
          </TouchableOpacity>
          {istouched === true ?
            <View style={{ width: '100%', paddingHorizontal: 12.5, backgroundColor: '#f6f6f6', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#d2d2d2' }}>
              <Text style={{ fontSize: 18 }}>{description}</Text>
            </View> : null
          }
        </View>
      );
    }
    return (
      <Info time={item.time_stamp} title={item.notice_title} description={item.notice_description} />
    );
  }


  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {/* Header */}
      <View style={{
        // flex: 9,
        minHeight: 45,
        width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
      }}>
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2' }}>
          <TouchableOpacity style={{ position: 'absolute', left: 16 }} onPress={() => {
            navigation.openDrawer()
          }} activeOpacity={0.8}>
            <Icon name='menu-outline' size={33} />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>공지사항</Text>
        </View>
      </View>

      {/* Body */}
      <View style={{ flex: 135, width: '100%', backgroundColor: '#ffffff' }}>
        {Loading ?
          <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator size='large' color='#d2d2d2' />
          </View> :
          <FlatList
            data={notice}
            renderItem={renderItem}
            keyExtractor={(item) => item.number}
            style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
          />
        }
      </View>
    </View>
  );
}

export default Notice;
