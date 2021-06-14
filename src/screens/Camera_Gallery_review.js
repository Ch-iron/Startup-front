import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback, } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { UserContext } from '../context/UserContext';

const Camera_Gallery_review = ({ index, setIndex, setPhoto1, setPhoto2, setPhoto3, setPhoto4, setPhoto5, ordernum }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [info, useractions] = useContext(UserContext);

    return (
        <TouchableWithoutFeedback onPress={() => {
            setIndex(0);
        }}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ width: '70%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <Text style={{ width: '100%', textAlign: 'center', paddingVertical: 10, fontSize: 28, fontFamily: 'NanumSquare_acR', borderBottomWidth: 3 }}>사진 업로드</Text>
                    <TouchableOpacity style={{ paddingVertical: 10, borderBottomWidth: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        launchCamera({ mediaType: 'photo', cameraType: 'back', }, (response) => {
                            // console.log(response);
                            if (!response.didCancel) {
                                if (index === 1) {
                                    response.fileName = ordernum + '1.jpg';
                                    setPhoto1(response);
                                }
                                else if (index === 2) {
                                    response.fileName = ordernum + '2.jpg';
                                    setPhoto2(response);
                                }
                                else if (index === 3) {
                                    response.fileName = ordernum + '3.jpg';
                                    setPhoto3(response);
                                }
                                else if (index === 4) {
                                    response.fileName = ordernum + '4.jpg';
                                    setPhoto4(response);
                                }
                                else if (index === 5) {
                                    response.fileName = ordernum + '5.jpg';
                                    setPhoto5(response);
                                }
                            }
                        });
                        setIndex(0);
                    }}>
                        <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR' }}>사진 촬영하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 10, width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        launchImageLibrary({ mediaType: 'photo', }, (response) => {
                            // console.log(response);
                            if (!response.didCancel) {
                                if (index === 1) {
                                    response.fileName = ordernum + '1.jpg';
                                    setPhoto1(response);
                                }
                                else if (index === 2) {
                                    response.fileName = ordernum + '2.jpg';
                                    setPhoto2(response);
                                }
                                else if (index === 3) {
                                    response.fileName = ordernum + '3.jpg';
                                    setPhoto3(response);
                                }
                                else if (index === 4) {
                                    response.fileName = ordernum + '4.jpg';
                                    setPhoto4(response);
                                }
                                else if (index === 5) {
                                    response.fileName = ordernum + '5.jpg';
                                    setPhoto5(response);
                                }
                            }
                        });
                        setIndex(0);
                    }}>
                        <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acR' }}>갤러리에서 선택하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Camera_Gallery_review;