import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking, ActivityIndicator } from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import ImageView from "react-native-image-viewing";
import Header from '../../components/Header';
import ip from '../../../ip';

const Suggestion = ({ navigation, route }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    const [products_image1, setProducts_image1] = useState([]);
    const [products_image2, setProducts_image2] = useState([]);
    const [products1visible, setProducts1visible] = useState(false);
    const [products2visible, setProducts2visible] = useState(false);
    const [productindex, setProductindex] = useState(0);

    const styling = route.params;

    useEffect(() => {
        axios.get(ip + 'mypage/products?styling_id=' + styling.styling_id)
            .then(function (response) {
                setProducts1(response.data[0]);
                setProducts2(response.data[1]);
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

    //제품 설명 부분
    const Product = ({ item, index, length, products }) => {
        return (
            <View style={{ width: '100%', borderBottomWidth: index === (length - 1) ? 0 : 1, borderBottomColor: '#eaeaea', }}>
                {/* 한 개의 제품 설명 윗 부분 */}
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 7, }}>
                    <TouchableOpacity onPress={() => {
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
                    <View style={{ width: '50%', marginHorizontal: 10, }}>
                        <Text style={{ width: '100%', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{item.text_category} : [{item.brand}]</Text>
                        <Text style={{ width: '100%', fontSize: 14.5, color: '#969696', fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginTop: 2 }}>
                            {item.product_name + '/' + item.color + '/' + item.size + '/' + item.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원'}
                        </Text>
                    </View>
                    {/* 구매하기 버튼 */}
                    <TouchableOpacity onPress={() => { Linking.openURL(item.link) }}
                        style={{
                            backgroundColor: '#dcdcdc', borderRadius: 20,
                            paddingHorizontal: 14, paddingVertical: 6, justifyContent: 'center', alignItems: 'center',
                        }}>
                        <Text style={{
                            width: '100%',
                            fontSize: 18, fontFamily: 'NanumSquare_acEB',
                            includeFontPadding: false,
                        }}>구매하기</Text>
                    </TouchableOpacity>
                </View>
                {/* 한 개의 제품 설명 아랫 부분 */}
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
            <Header title="스타일링 제안서" navigation={navigation} isMain={false} />
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
                <Text style={{ width: '100%', paddingVertical: 10, fontSize: 28, color: '#000000', fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginLeft: '10%', }}>받은 제안서</Text>
                {/* 어드바이저 프로필 부분 */}
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', }}>
                    <FastImage source={{ uri: styling.profile_photo, cache: 'web' }}
                        style={{ width: '17%', aspectRatio: 1 / 1, borderRadius: 200, marginLeft: '5%', marginTop: '1%', marginRight: 10, }}
                    />
                    <View style={{ width: '75%', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: '1%', }}>
                            <Text style={{ fontSize: 28, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>{styling.nick_name}</Text>
                            <Text style={{ fontSize: 16.5, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginBottom: 3, marginLeft: 3 }}> 어드바이저</Text>
                        </View>
                        {/* 스타일링 설명 부분 */}
                        <Text style={{
                            width: '95%', backgroundColor: '#f0f0f0', padding: 10, fontSize: 15, fontFamily: 'NanumSquare_acR',
                            color: '#000000', includeFontPadding: false, marginTop: 5, lineHeight: 20, borderRadius: 20
                        }}>
                            {styling.description}
                        </Text>
                    </View>
                </View>
                {isLoading ?
                    <View style={{ width: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size='large' color='#000000' />
                    </View> :
                    // {/* 제품 설명 부분 */}
                    <ScrollView style={{ width: '100%', backgroundColor: '#ffffff', marginTop: 10, }}>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#d2d2d2', justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{
                                fontSize: 25, color: '#000000', fontFamily: 'NanumSquare_acB', includeFontPadding: false,
                                marginVertical: 10, marginLeft: '5%', borderBottomWidth: 1,
                            }}>첫번째 스타일</Text>
                        </View>
                        {products1.map((item, index, array) => (
                            <Product item={item} index={index} length={array.length} key={index} products={1} />
                        ))}
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#d2d2d2', justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={{
                                fontSize: 25, color: '#000000', fontFamily: 'NanumSquare_acB', includeFontPadding: false,
                                marginVertical: 10, marginLeft: '5%', borderBottomWidth: 1,
                            }}>두번째 스타일</Text>
                        </View>
                        {products2.map((item, index, array) => (
                            <Product item={item} index={index} length={array.length} key={index} products={2} />
                        ))}
                        <View style={{ width: '100%', height: 80 }} />
                    </ScrollView>
                }
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Suggestion_Requirement', styling.styling_id)
                }} activeOpacity={0.8}
                    style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: 50, position: 'absolute', bottom: 10, backgroundColor: '#464646', borderRadius: 30, }}>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'NanumSquare_acB', includeFontPadding: false, }}>요청서 보러가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Suggestion;
