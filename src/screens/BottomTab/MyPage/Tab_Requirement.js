import React, { useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, } from 'react-native';
import { IndexContext } from '../../../context/BottomTabIndex';

const Requirements = ({ loading, requirements, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [index, setIndex] = useContext(IndexContext);

  const renderItem = useCallback(({ item, index }) => {
    return (
      // {/* request Body1 */}
      <TouchableOpacity style={{
        width: '100%', padding: 7, backgroundColor: '#ffffff', alignitems: 'center', justifyContent: 'center',
        marginTop: index === 0 ? 10 : 0, marginBottom: 10,
      }} onPress={() => {
        navigation.navigate('Requirement', item);
      }} activeOpacity={0.8}>
        {/* request Body1 up */}
        <View style={{ width: '100%', flexDirection: 'row', alignitems: 'center', justifyContent: 'center', }}>
          {/* request Body1 left up */}
          <View style={{ width: '50%', alignItems: 'flex-start', justifyContent: 'center', }}>
            <Text style={{ fontSize: 23, fontFamily: 'NanumSquare_acEB', color: '#000000', includeFontPadding: false, }}>요청서</Text>
          </View>

          {/* request Body1 right up */}
          <View style={{ width: '50%', alignitems: 'flex-end', justifyContent: 'center', }}>
            <Text style={{ fontSize: 10, fontFamily: 'NanumSquare_acB', color: '#000000', textAlign: 'right', includeFontPadding: false, }}>{
              JSON.stringify(item.timestamp).substr(1, 10) + ' ' + JSON.stringify(item.timestamp)[12] +
              JSON.stringify(item.timestamp)[13] + JSON.stringify(item.timestamp)[14] +
              JSON.stringify(item.timestamp)[15] + JSON.stringify(item.timestamp)[16]
            }</Text>
            <Text style={{ fontSize: 10, fontFamily: 'NanumSquare_acB', color: '#000000', textAlign: 'right', includeFontPadding: false, marginTop: 3 }}>{
              item.styling_state === 1 ? '접수중' :
                item.styling_state === 2 ? '진행중' :
                  '완료'
            }</Text>
          </View>
        </View>
        {/* request Contents */}
        <View style={{ width: '90%', justifyContent: 'space-around', paddingVertical: 5, paddingRight: '10%', }}>
          <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginVertical: 3 }}>TPO : {item.tpo}</Text>
          <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginVertical: 3 }}>필요상품종류 :
              {item.need_outer === '알아서 해주세요!' || item.need_outer === '필요없어요!' ? null : item.need_outer + ', '}
            {item.need_top === '알아서 해주세요!' || item.need_top === '필요없어요!' ? null : item.need_top + ', '}
            {item.need_bottom === '알아서 해주세요!' || item.need_bottom === '필요없어요!' ? null : item.need_bottom + ', '}
            {item.need_shoes === '알아서 해주세요!' || item.need_shoes === '필요없어요!' ? null : item.need_shoes + ', '}
            {item.need_acc === '알아서 해주세요!' || item.need_acc === '필요없어요!' ? null : item.need_acc}
          </Text>
          <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginVertical: 3 }}>요청사항 : {item.requirements}</Text>
          <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginVertical: 3 }}>
            원하는 핏 : {item.wanted_fitting_top}(상의), {item.wanted_fitting_bottom}(하의)
        </Text>
        </View>
        {/* request Body1 bottom */}
        <View style={{ width: '100%', flexDirection: 'row', alignitems: 'flex-start', justifyContent: 'flex-start', }}>
          {/* request Body 1 left bottom*/}
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acB', color: '#000000', includeFontPadding: false, }}>어드바이저 {item.nick_name}</Text>
          </View>

          {/* request Body1 right bottom */}
          <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-end', }}>
            <Text style={{ fontSize: 12.5, fontFamily: 'NanumSquare_acB', color: '#000000', includeFontPadding: false, }}>주문번호 : {item.styling_id}</Text>
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
      </View> : requirements === 'No Requirement' ?
        <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea', justifyContent: 'flex-start', alignItems: 'center', }}>
          <View style={{ height: '20%' }} />
          <Text style={{ width: '80%', textAlign: 'center', fontFamily: 'NanumSquare_acR', fontSize: 28, marginBottom: 20 }}>스타일 레시피 시작해볼까요?</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Stylist');
            setIndex('Stylist');
          }} activeOpacity={0.8}
            style={{ borderRadius: 10, backgroundColor: '#000000', width: '60%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
            <Text style={{ fontFamily: 'NanumSquare_acR', color: '#ffffff', fontSize: 20 }}>예약하러가기</Text>
          </TouchableOpacity>
        </View> :
        <View style={{ flex: 1, paddingHorizontal: 10, width: '100%', backgroundColor: '#eaeaea' }}>
          <FlatList
            data={requirements}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={{ width: '100%' }}
          />
        </View>
  );
}

export default Requirements;