import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StatusBar, Text, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Header from '../../components/Header';
import FloatingButton from '../../components/FloatingButton';
import { RequestContext } from '../../../context/RequestContext';
import FastImage from 'react-native-fast-image';
import ImageView from "react-native-image-viewing";
import ip from '../../../ip';

const Stylist_Profile = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [survey, request, photo, actions] = useContext(RequestContext);

    const [tabindex, setTabindex] = useState(1);
    const [rating, setRating] = useState(0);
    const [review_count, setReview_count] = useState(0);
    const [review, setReview] = useState([]);
    const [reviewLoading, setReviewloading] = useState(true);

    //이미지 뷰어용 < 구현 못함
    const [imageindex, setImageindex] = useState(0);
    const [isvisible, setIsVisible] = useState(false);

    const stylist = route.params;

    useEffect(() => {
        actions.setStylist_id(stylist.profile.stylist_id);
        actions.setUser_id_for_stylist(stylist.user_id_for_stylist);
        setRating(stylist.profile.user_rating);
        setReview_count(stylist.profile.count);
    }, []);

    useEffect(() => {
        if (tabindex === 3) {
            axios.get(ip + 'stylist/review?stylist_id=' + stylist.profile.stylist_id)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data[0] === undefined) {
                        setReview('No Review');
                        setReviewloading(false);
                    }
                    else {
                        // console.log(response.data);
                        setReview(response.data);
                        setReviewloading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            setReviewloading(true);
        }
    }, [tabindex]);

    const StylistInfo = () => {
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor: '#ffffff', }}>
                <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 18, marginHorizontal: 20, marginTop: 10 }}>{stylist.profile.profile_description}</Text>
                    <View style={{ width: '100%', height: 80, }} />
                </ScrollView>
            </View>
        );
    }

    const StylistReview = () => {
        const renderItem = useCallback(({ item, index }) => {
            const Big_rate = () => {
                return (
                    index === 0 ?
                        <View style={{
                            width: '100%', height: 50, flexDirection: 'row', paddingVertical: 4,
                            borderBottomWidth: 1, borderBottomColor: '#dcdcdc', justifyContent: 'center', alignItems: 'center',
                        }}>
                            {/* 별점 부분 */}
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                                <Icon name='star' size={27} color={rating >= 1 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={27} color={rating >= 2 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={27} color={rating >= 3 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={27} color={rating >= 4 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={27} color={rating >= 5 ? '#ffd400' : '#969696'} />
                                <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 15 }}>({review_count})</Text>
                            </View>
                            {/* 평점 부분 */}
                            <View style={{ width: '40%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 37 }}>{Number(rating).toFixed(1)}</Text>
                                <Text style={{ color: '#969696', fontSize: 15 }}>/5.0</Text>
                            </View>
                        </View> : null
                );
            }

            const Review = () => {
                const [review_photo, setReview_photo] = useState([]);

                useEffect(() => {
                    if (item.user_photo !== '')
                        setReview_photo(item.user_photo.split(','));
                }, []);

                const renderItemPhoto = useCallback(({ item, index }) => {
                    return (
                        <View>
                            <FastImage source={{ uri: item, cache: 'web' }} style={{ height: 130, aspectRatio: 1 / 1, marginLeft: index === 0 ? 10 : 0, marginRight: 10 }} />
                        </View>
                    );
                }, []);

                const keyExtractorReview = useCallback((item) => item, []);

                return (
                    // {/* 별점 + 평점 부분 */}
                    // {/* 최신순 + 높은별점순 + 낮은 별점순 */ }
                    // {/* <View style={{
                    //     flex: 1, width: '100%', flexDirection: 'row', paddingVertical: 4,
                    // borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: '#dcdcdc', borderBottomColor: '#dcdcdc'
                    // }}>
                    //     <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    //     <TouchableOpacity onPress={() => { Alert.alert('최신순') }} activeOpacity={0.8} >
                    //             <Text> 최신순 </Text>
                    //         </TouchableOpacity>
                    //     </View>

                    //     <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                    //     <TouchableOpacity onPress={() => { Alert.alert('높은 별점순') }} activeOpacity={0.8} >
                    //             <Text> 높은 별점순 </Text>
                    //         </TouchableOpacity>
                    //     </View>

                    // <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                    //     <TouchableOpacity onPress={() => { Alert.alert('낮은 별점순') }} activeOpacity={0.8} >
                    //             <Text> 낮은 별점순 </Text>
                    // </TouchableOpacity>
                    //     </View>
                    // </View> */}
                    <View>
                        <Big_rate />
                        {/* 각각의 리뷰 부분 */}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#dcdcdc', minHeight: 80 }}>
                            {/* 별점 + 날짜 + 닉네임 + tpo + 텍스트 리뷰 */}
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingLeft: 10 }}>
                                <Icon name='star' size={20} color={item.user_rating >= 1 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={20} color={item.user_rating >= 2 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={20} color={item.user_rating >= 3 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={20} color={item.user_rating >= 4 ? '#ffd400' : '#969696'} />
                                <Icon name='star' size={20} color={item.user_rating >= 5 ? '#ffd400' : '#969696'} />
                                <Text style={{ marginLeft: 5, fontSize: 12, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>{
                                    JSON.stringify(item.timestamp).substr(1, 10)
                                }</Text>
                                <Text style={{ marginHorizontal: 5, fontSize: 12, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>{item.nick_name}</Text>
                                <Text style={{ fontSize: 12, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>{item.tpo}룩</Text>
                            </View>
                            <View style={{ width: '100%', }}>
                                <Text style={{
                                    width: '80%', marginVertical: 5, paddingLeft: 10, fontFamily: 'NanumSquare_acR', includeFontPadding: false, fontSize: 15,
                                }}>{item.user_review_text}</Text>
                                {item.user_photo !== '' ?
                                    <FlatList horizontal={true}
                                        showsHorizontalScrollIndicator={true}
                                        data={review_photo}
                                        renderItem={renderItemPhoto}
                                        keyExtractor={keyExtractorReview}
                                        style={{ marginTop: 5, marginBottom: 10, }} contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                        removeClippedSubviews={true}
                                    /> : null
                                }
                            </View>
                        </View>
                        {index === review.length - 1 ?
                            <View style={{ width: '100%', height: 80, }} /> : null
                        }
                    </View>
                );
            }

            return (
                <Review />
            );
        }, []);

        const keyExtractor = useCallback((item) => item.styling_id, []);

        return (
            review === 'No Review' ?
                <View style={{ flex: 7, width: '100%', backgroundColor: '#ffffff', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <View style={{ height: '20%' }} />
                    <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 28, }}>아직 등록된 후기가 없어요 :-)</Text>
                </View> :
                <View style={{ flex: 7, width: '100%', backgroundColor: '#ffffff', alignItems: 'center' }}>
                    <FlatList
                        data={review}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        style={{ width: '100%' }}
                    />
                </View>
        );
    }

    const TabBar = () => {
        return (
            <View style={{ height: 80, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#dcdcdc', }}>
                <TouchableOpacity onPress={() => { setTabindex(1); }} activeOpacity={0.8}
                    style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: tabindex === 1 ? 5 : 0, }}>
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 20, color: tabindex === 1 ? '#000000' : '#b4b4b4', includeFontPadding: false, }}>{stylist.feed.length}</Text>
                        <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 16, color: tabindex === 1 ? '#000000' : '#b4b4b4', includeFontPadding: false }}>FEED</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setTabindex(2); }} activeOpacity={0.8}
                    style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: tabindex === 2 ? 5 : 0, }}>
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <Icon name='information-circle-outline' size={20} style={{ color: tabindex === 2 ? '#000000' : '#b4b4b4', }} />
                        <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 16, color: tabindex === 2 ? '#000000' : '#b4b4b4', includeFontPadding: false }}>INFO</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setTabindex(3); }} activeOpacity={0.8}
                    style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: tabindex === 3 ? 5 : 0, }}>
                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'flex-end', }}>
                            <Text style={{ fontFamily: 'NanumSquare_acB', fontSize: 20, color: tabindex === 3 ? '#000000' : '#b4b4b4', includeFontPadding: false, marginRight: 2 }}>
                                {Number(rating).toFixed(1)}
                            </Text>
                            <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 13, color: tabindex === 3 ? '#000000' : '#b4b4b4', includeFontPadding: false, marginBottom: 3 }}>
                                ({review_count})
                            </Text>
                        </View>
                        <Text style={{ fontFamily: 'NanumSquare_acR', fontSize: 16, color: tabindex === 3 ? '#000000' : '#b4b4b4', includeFontPadding: false }}>REVIEW</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    const Stylist = () => {
        if (tabindex === 1) {
            return (
                <StylistFeed />
            );
        }
        else if (tabindex === 2) {
            return (
                <StylistInfo />
            );
        }
        else if (tabindex === 3) {
            return (
                <StylistReview loading={reviewLoading} />
            );
        }
    }

    const StylistFeed = () => {
        const renderItem = useCallback((({ item, index }) => {
            return (
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Feed_Detail', {
                            profile: stylist.profile,
                            detail: item,
                        })
                    }} style={{ width: windowWidth / 3, aspectRatio: 1 / 1.1, marginLeft: index % 3 === 0 ? 0 : 1, marginRight: index % 3 === 2 ? 0 : 1, marginBottom: 2 }}
                        activeOpacity={0.8}>
                        <FastImage source={{ uri: item.feed_photo, cache: 'web' }} style={{ height: '100%', }} />
                    </TouchableOpacity>
                    {index === stylist.feed.length - 1 ?
                        <View style={{ width: '100%', height: 80, }} /> : null
                    }
                </View>
            );
        }), []);

        const keyExtractor = useCallback((item) => item.feed_index, []);

        return (
            // Feed_Scroll
            <View style={{ flex: 1, width: '100%', backgroundColor: '#ffffff' }}>
                <FlatList
                    data={stylist.feed}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
            {/* Header */}
            <Header title='PROF!LE' navigation={navigation} isMain={false} />
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                {/* Profile */}
                <View style={{ height: 140, width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#ffffff', }}>
                    <FastImage source={{ uri: stylist.profile.profile_photo, cache: 'web' }}
                        style={{ height: '50%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: '8%', marginTop: 20, marginRight: 10, }}
                    />
                    <View style={{ width: '100%', flex: 1, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: 32 }}>
                            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{stylist.profile.nick_name}</Text>
                            <Text style={{ fontSize: 16.5, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> 어드바이저</Text>
                        </View>
                        <Text style={{ width: '90%', fontSize: 15, fontFamily: 'NanumSquare_acR', color: '#000000', includeFontPadding: false, marginTop: 5 }}>
                            {stylist.profile.profile_introduction}
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', height: 8 }} />
                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <TabBar />
                    <Stylist />
                </View>
                <FloatingButton title='예약하기' navigation={navigation} index='Intro0' next={true} />
            </View>
        </View>
    );
}

export default Stylist_Profile;