import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Dimensions, ActivityIndicator, Modal } from 'react-native';
import Header from '../../../components/Header';
import FloatingButton from '../../../components/FloatingButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { RequestContext } from '../../../../context/RequestContext';
import { UserContext } from '../../../../context/UserContext';
import axios from 'axios';


//설문 데이터는 화면에서 수정되었다가 다음 버튼을 누르면 context로 전달!!!!
const Intro0 = ({ navigation, }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [survey, request, photo, actions] = useContext(RequestContext);
    const [info, useractions] = useContext(UserContext);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        if (info.survey_check === 1) {
            axios.get('http://15.165.242.227:3000/login/survey?user_id=' + info.user_index)
                .then(function (response) {
                    console.log(response.data[0]);
                    actions.setShopping_preference(response.data[0].shopping_preference);
                    actions.setShopping_effort(response.data[0].shopping_effort);
                    actions.setTrend_sensitive(response.data[0].trend_sensitive);
                    actions.setJob(response.data[0].job);
                    actions.setWorking_fashion(response.data[0].working_fashion);
                    actions.setHeight(response.data[0].height);
                    actions.setWeight(response.data[0].weight);
                    actions.setSize_top(response.data[0].size_top);
                    actions.setFeeling_top(response.data[0].feeling_top);
                    actions.setSize_waist(response.data[0].size_waist);
                    actions.setFeeling_waist(response.data[0].feeling_waist);
                    actions.setSize_outer(response.data[0].size_outer);
                    actions.setSize_shoes(response.data[0].size_shoes);
                    actions.setBody_shape(response.data[0].body_shape);
                    actions.setBody_photo1(response.data[0].body_photo1);
                    actions.setBody_photo2(response.data[0].body_photo2);
                    actions.setBody_photo3(response.data[0].body_photo3);
                    actions.setComplex_top(response.data[0].complex_top);
                    actions.setComplex_bottom(response.data[0].complex_bottom);
                    actions.setLook_preference(response.data[0].look_preference);
                    setIsloading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (info.survey_check === 0) {
            setIsloading(false);
        }
    }, [])

    useEffect(() => {
        // console.log(survey);
        // console.log(request);
    }, [survey, request]);

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Modal animationType='none' visible={isLoading} transparent={true}>
                <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size='large' color='#000000' />
                </View>
            </Modal>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='설문조사' navigation={navigation} isMain={false} />
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <View style={{ height: '30%' }} />
                <Icon name='document-text-outline' size={100} />
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 100, }}>
                    <Text style={{ width: '70%', textAlign: 'center', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false }}>예약 전 설문 조사</Text>
                    <Text style={{ width: '70%', textAlign: 'center', fontSize: 18, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false }}>취향과 체형에 맞는 옷을 추천해드립니다 :)</Text>
                </View>
                {/* 최초 설문인지 판별하여 다른 설문화면으로 분기한다. */}
                <FloatingButton title='시작하기' navigation={navigation} index={info.survey_check === 0 ? 'Intro1' : 'Survey1'} next={true} />
            </View>
        </View>
    );
}

export default Intro0;