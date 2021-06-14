import React, { useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, } from 'react-native';
import { IndexContext } from '../../../context/BottomTabIndex';

const Suggestion = ({ loading, suggestions, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [index, setIndex] = useContext(IndexContext);

  const renderItem = useCallback(({ item, index }) => {
    return (
      // {/* Suggestion Body1 */}
      <TouchableOpacity style={{
        width: '100%', padding: 7, backgroundColor: '#ffffff', alignitems: 'center', justifyContent: 'center',
        marginTop: index === 0 ? 10 : 0, marginBottom: 10,
      }} onPress={() => {
        navigation.navigate('Suggestion', item);
      }} activeOpacity={0.8}>
        {/* Suggestion Body1 up */}
        <View style={{ width: '100%', flexDirection: 'row', alignitems: 'flex-start', justifyContent: 'flex-start', }}>
          {/* Suggestion Body1 left up */}
          < View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center', }}>
            <Text style={{ fontSize: 23, fontFamily: 'NanumSquare_acEB', color: '#000000', includeFontPadding: false, }}>{item.tpo}룩</Text>
          </View >
          {/* Suggestion Body1 right up */}
          <View style={{ width: '50%', alignitems: 'flex-start', justifyContent: 'center', }}>
            <Text style={{ fontSize: 14, fontFamily: 'NNanumSquare_acB', color: '#000000', textAlign: 'right', includeFontPadding: false, }}>{
              JSON.stringify(item.time_stamp).substr(1, 10) + ' ' + JSON.stringify(item.time_stamp)[12] +
              JSON.stringify(item.time_stamp)[13] + JSON.stringify(item.time_stamp)[14] +
              JSON.stringify(item.time_stamp)[15] + JSON.stringify(item.time_stamp)[16]
            }</Text>
          </View>
        </View>
        {/* Suggestion Contents */}
        <View style={{ width: '100%', marginVertical: 10 }}>
          <Text style={{ width: '90%', color: '#000000', fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 14.5, lineHeight: 23 }}>
            {item.description}
          </Text>
        </View >
        {/* Suggestion Body1 bottom */}
        <View style={{ width: '100%', flexDirection: 'row', alignitems: 'flex-start', justifyContent: 'center', }}>
          {/* Suggestion Body 1 left bottom*/}
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-start', }}>
            <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acB', color: 'black', includeFontPadding: false, }}>어드바이저 {item.nick_name}</Text>
          </View >
          {/* Suggestion Body1 right bottom */}
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-end', }}>
            <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acB', color: 'black', includeFontPadding: false, }}>주문번호 : {item.styling_id}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item) => item.styling_id, []);

  return (
    loading ?
      <View style={{ flex: 1, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'center', alignItems: 'center', }}>
        <ActivityIndicator size='large' color='#000000' />
      </View> : suggestions === 'No Suggestion' ?
        <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'flex-start', alignItems: 'center', }}>
          <View style={{ height: '20%' }} />
          <Text style={{ width: '80%', textAlign: 'center', fontFamily: 'NanumSquare_acR', fontSize: 28, marginBottom: 20 }}>아직 등록하신 요청서가 없어요 :-)</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Stylist');
            setIndex('Stylist');
          }} activeOpacity={0.8}
            style={{ borderRadius: 10, backgroundColor: '#000000', width: '60%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
            <Text style={{ fontFamily: 'NanumSquare_acR', color: '#ffffff', fontSize: 20 }}>예약하러가기</Text>
          </TouchableOpacity>
        </View> :
        <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea', }} >
          <FlatList
            data={suggestions}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={{ width: '100%' }}
          />
        </View>
  );
}

export default Suggestion;