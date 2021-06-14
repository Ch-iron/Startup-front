import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StatusBar, Text, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import { RequestContext } from '../../../../../context/RequestContext';
import { UserContext } from '../../../../../context/UserContext';
import ip from '../../../../../ip';

const Stylist_Profile = ({ index, setIndex, setModalfeed, setPhoto1, setPhoto2, setPhoto3 }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [survey, request, photo, actions] = useContext(RequestContext);
    const [info, useractions] = useContext(UserContext);
    const [profile, setProfile] = useState('');
    const [feed, setFeed] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    let date = Date.now();

    useEffect(() => {
        axios.get(ip + 'stylist/selected-stylist?stylist_id=' + request.stylist_id)
            .then(function (response) {
                console.log(response.data);
                setProfile(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(ip + 'stylist/stylist_feed?stylist_id=' + request.stylist_id)
            .then(function (response) {
                // console.log(response.data);
                setFeed(response.data);
                setIsloading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // console.log(index);

    const StylistFeed = () => {
        const renderItem = useCallback((({ item }) => {
            return (
                <TouchableOpacity onPress={() => {
                    if (index === 1) {
                        setPhoto1({
                            fileName: `${date}${info.user_index}-1.jpg`,
                            type: 'image/jpeg',
                            uri: item.feed_photo
                        });
                        setIndex(0);
                        setModalfeed(false);
                    }
                    else if (index === 2) {
                        setPhoto2({
                            fileName: `${date}${info.user_index}-2.jpg`,
                            type: 'image/jpeg',
                            uri: item.feed_photo
                        });
                        setIndex(0);
                        setModalfeed(false);
                    }
                    else if (index === 3) {
                        setPhoto3({
                            fileName: `${date}${info.user_index}-2.jpg`,
                            type: 'image/jpeg',
                            uri: item.feed_photo
                        });
                        setIndex(0);
                        setModalfeed(false);
                    }
                }} style={{ width: windowWidth / 3, aspectRatio: 1 / 1.1, marginLeft: index % 3 === 0 ? 0 : 1, marginRight: index % 3 === 2 ? 0 : 1, marginBottom: 2 }}
                activeOpacity={0.8}>
                    <FastImage source={{ uri: item.feed_photo, cache: 'web' }} style={{ height: '100%', }} />
                </TouchableOpacity>
            );
        }), []);

        const keyExtractor = useCallback((item) => item.feed_index);

        return (
            // Feed_Scroll
            <View style={{ flex: 7, width: '100%', backgroundColor: '#ffffff' }}>
                <FlatList
                    data={feed}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                />
            </View>
        );
    }

    return (
        isLoading ? <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', }} >
            <ActivityIndicator size='large' color='#000000' />
        </View > :
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
                {/* Header */}
                    <View style={{ minHeight: 45, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2', }}>
                        <TouchableOpacity onPress={() => {
                            setIndex(0);
                            setModalfeed(false);
                        }} style={{ position: 'absolute', left: 16 }}>
                            <Icon name='chevron-back' size={33} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>Feed 사진 선택</Text>
                    </View>
                {/* Body */}
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    {/* Profile */}
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', }}>
                            <FastImage source={{ uri: profile.profile_photo, cache: 'web' }}
                                style={{ height: '50%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: '8%', marginTop: 20, marginRight: 10, }}
                            />
                            <View style={{ width: '100%', flex: 1, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: 32 }}>
                                    <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{profile.nick_name}</Text>
                                    <Text style={{ fontSize: 16.5, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> 어드바이저</Text>
                                </View>
                                <Text style={{ width: '90%', fontSize: 15, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginTop: 5 }}>
                                    {profile.profile_introduction}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: '1%' }}></View>
                    <View style={{ flex: 4.5, width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                        <StylistFeed />
                    </View>
                    {/* <FloatingButton title='예약하기' navigation={navigation} index='Intro0' next={true} /> */}
                </View>
            </View>
    );
}

export default Stylist_Profile;