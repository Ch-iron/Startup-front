import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import ImageView from "react-native-image-viewing";
import Header from '../../components/Header';
import ip from '../../../ip';

const Requirement_Suggestion = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [suggestion, setSuggestion] = useState('');
    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    const [products_image1, setProducts_image1] = useState([]);
    const [products_image2, setProducts_image2] = useState([]);
    const [products1visible, setProducts1visible] = useState(false);
    const [products2visible, setProducts2visible] = useState(false);
    const [productindex, setProductindex] = useState(0);

    const styling_id = route.params;

    useEffect(() => {
        axios.get(ip + 'mypage/requirement-suggestion?styling_id=' + styling_id)
            .then(function (response) {
                setSuggestion(response.data[0][0]);
                setProducts1(response.data[1]);
                setProducts2(response.data[2]);
                setIsloading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (products1.length !== 0) {
            products1.map((product) => {
                setProducts_image1((curr) => [...curr, { uri: product.product_photo }])
            });
        }
    }, [products1]);

    useEffect(() => {
        if (products2.length !== 0) {
            products2.map((product) => {
                setProducts_image2((curr) => [...curr, { uri: product.product_photo }])
            });
        }
    }, [products2]);

    //?????? ?????? ??????
    const Product = ({ item, index, length, products }) => {
        return (
            <View style={{ width: '100%', borderBottomWidth: index === (length - 1) ? 0 : 1, borderBottomColor: '#eaeaea', }}>
                {/* ??? ?????? ?????? ?????? ??? ?????? */}
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 7, }}>
                    <TouchableOpacity onPress={() => {
                        console.log(index);
                        setProductindex(index);
                        if (products === 1) {
                            setProducts1visible(true);
                        }
                        else if (products === 2) {
                            setProducts2visible(true);
                        }
                    }} style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage source={{ uri: item.product_photo, cache: 'web' }} style={{ width: '100%', aspectRatio: 1 / 1, }} resizeMode='stretch' />
                    </TouchableOpacity>
                    <View style={{ width: '50%', marginHorizontal: 10 }}>
                        <Text style={{ width: '100%', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{item.text_category} : [{item.brand}]</Text>
                        <Text style={{ width: '100%', fontSize: 14.5, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginTop: 2 }}>
                            {item.product_name + '/' + item.color + '/' + item.size + '/' + item.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '???'}
                        </Text>
                    </View>
                    {/* ???????????? ?????? */}
                    <TouchableOpacity onPress={() => { Linking.openURL(item.link) }}
                        style={{
                            backgroundColor: '#dcdcdc', borderRadius: 20,
                            paddingHorizontal: 14, paddingVertical: 6, justifyContent: 'center', alignItems: 'center',
                        }}>
                        <Text style={{
                            width: '100%',
                            fontSize: 18, fontFamily: 'NanumSquare_acEB',
                            includeFontPadding: false,
                        }}>????????????</Text>
                    </TouchableOpacity>
                </View>
                {/* ??? ?????? ?????? ?????? ?????? ?????? */}
                <Text style={{
                    backgroundColor: '#f0f0f0', fontSize: 16, fontFamily: 'NanumSquare_acR', includeFontPadding: false, padding: 10, marginVertical: 5,
                    lineHeight: 20, borderRadius: 20, marginHorizontal: '5%'
                }}>{item.description}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#ffffff' }}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            {/* Header */}
            <View style={{
                minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 16 }}>
                    <Icon name='chevron-back' size={33} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>?????????</Text>
            </View>
            {/* Body */}
            <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                <ImageView
                    images={products_image1}
                    imageIndex={productindex}
                    visible={products1visible}
                    onRequestClose={() => setProducts1visible(false)}
                />
                <ImageView
                    images={products_image2}
                    imageIndex={productindex}
                    visible={products2visible}
                    onRequestClose={() => setProducts2visible(false)}
                />
                <Text style={{ width: '100%', paddingVertical: 10, fontSize: 28, color: '#000000', fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginLeft: '10%', }}>?????? ?????????</Text>
                {/* ??????????????? ????????? ?????? */}
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', }}>
                    <FastImage source={{ uri: suggestion.profile_photo, cache: 'web' }}
                        style={{ width: '17%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: '5%', marginTop: '1%', marginRight: 10, }}
                    />
                    <View style={{ width: '75%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: '1%', }}>
                            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{suggestion.nick_name}</Text>
                            <Text style={{ fontSize: 16.5, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> ???????????????</Text>
                        </View>
                        {/* ???????????? ?????? ?????? */}
                        <Text style={{
                            width: '95%', backgroundColor: '#f0f0f0', padding: 10, fontSize: 15, fontFamily: 'NanumSquare_acR',
                            color: '#000000', includeFontPadding: false, marginTop: 5, lineHeight: 20, borderRadius: 20
                        }}>
                            {suggestion.description}
                        </Text>
                    </View>
                </View>
                {isLoading ?
                    <View style={{ width: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size='large' color='#000000' />
                    </View> :
                    // {/* ?????? ?????? ?????? */}
                    <ScrollView style={{ width: '100%', backgroundColor: '#ffffff', marginTop: 10, flex: 1 }}>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#d2d2d2', justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{
                                fontSize: 25, color: '#000000', fontFamily: 'NanumSquare_acB', includeFontPadding: false,
                                marginVertical: 10, marginLeft: '5%', borderBottomWidth: 1,
                            }}>????????? ?????????</Text>
                        </View>
                        {products1.map((item, index, array) => (
                            <Product item={item} index={index} length={array.length} key={index} products={1} />
                        ))}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#d2d2d2', justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{
                                fontSize: 25, color: '#000000', fontFamily: 'NanumSquare_acB', includeFontPadding: false,
                                marginVertical: 10, marginLeft: '5%', borderBottomWidth: 1,
                            }}>????????? ?????????</Text>
                        </View>
                        {products2.map((item, index, array) => (
                            <Product item={item} index={index} length={array.length} key={index} products={2} />
                        ))}
                        <View style={{ width: '100%', height: 20 }} />
                    </ScrollView>
                }
            </View>
        </View>
    );
};

export default Requirement_Suggestion;
