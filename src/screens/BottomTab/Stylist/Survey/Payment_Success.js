import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, Dimensions, ActivityIndicator, Modal } from 'react-native';
import FloatingButton from '../../../components/FloatingButton';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { RequestContext } from '../../../../context/RequestContext';
import { UserContext } from '../../../../context/UserContext';

const Payment_Success = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const pay_method = route.params;

    const [survey, request, photo, requestactions] = useContext(RequestContext);
    const [info, actions] = useContext(UserContext);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const image = new FormData();
        const request_style = new FormData();

        if (info.survey_check === 0) {
            image.append('image', {
                name: photo.body_image1.fileName,
                type: photo.body_image1.type,
                uri: photo.body_image1.uri
            });
            image.append('image', {
                name: photo.body_image2.fileName,
                type: photo.body_image2.type,
                uri: photo.body_image2.uri
            });
            image.append('image', {
                name: photo.body_image3.fileName,
                type: photo.body_image3.type,
                uri: photo.body_image3.uri
            });
        }

        if (request.request_style1 !== '') {
            request_style.append('image', {
                name: request.request_style1.fileName,
                type: request.request_style1.type,
                uri: request.request_style1.uri,
            })
        }
        if (request.request_style2 !== '') {
            request_style.append('image', {
                name: request.request_style2.fileName,
                type: request.request_style2.type,
                uri: request.request_style2.uri,
            })
        }
        if (request.request_style3 !== '') {
            request_style.append('image', {
                name: request.request_style3.fileName,
                type: request.request_style3.type,
                uri: request.request_style3.uri,
            })
        }
        if (info.survey_check === 0) {
            axios.post('http://15.165.242.227:3000/stylist/image-upload-body', image)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (request.request_style !== 'No photos') {
            axios.post('http://15.165.242.227:3000/stylist/image-upload-request', request_style)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        axios.post('http://15.165.242.227:3000/stylist/requirement', {
            survey,
            request
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.post('http://15.165.242.227:3000/stylist/payment', {
            styling_id: request.ordernum,
            user_id: request.user_id,
            stylist_id: request.stylist_id,
            payment_price: 15000,
            payment_way: pay_method,
        })
            .then((response) => {
                console.log(response);
                setIsloading(false);
            })
            .catch((error) => {
                console.log(error);
            });

        //????????? ???????????? API, ?????????????????? ????????? ????????? ????????? ????????????.
        // axios.post('http://15.165.242.227:3000/stylist/chatroom', {
        //     styling_id: request.ordernum,
        //     user_id1: request.user_id,
        //     user_id2: request.user_id_for_stylist,
        // })
        //     .then((response) => {
        //         console.log(response);
        //         //???????????????????????? ???????????? ??????????????? ?????? ?????????
        //         axios.get('http://15.165.242.227:3000/fcm/push-notification-requirement?user_id=' + request.user_id_for_stylist)
        //             .then(function (response) {
        //                 console.log(response);
        //                 setIsloading(false);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        actions.setSurvey_check(1);
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Modal animationType='none' visible={isLoading} transparent={true}>
                <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size='large' color='#000000' />
                </View>
            </Modal>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <View style={{
                minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2',
            }}>
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>????????????</Text>
            </View>
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff' }}>
                <View style={{ height: '30%' }} />
                <Icon name='paper-plane-outline' size={100} />
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 100, }}>
                    <Text style={{ width: '70%', textAlign: 'center', fontSize: 35, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false }}>????????????!</Text>
                    <Text style={{ width: '70%', textAlign: 'center', fontSize: 18, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false, marginTop: 10 }}>??????????????? ?????? ??? ??????????????? ???????????????.</Text>
                </View>
                <FloatingButton title='??????' navigation={navigation} index='Stylist_Select' next={true} />
            </View>
        </View >
    );
}

export default Payment_Success;