import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IndexContext } from '../../context/BottomTabIndex';
import { UserContext } from '../../context/UserContext';

//BottomTabBar의 초기버전
const BottomTabBar = ({ navigation, tabindex }) => {
    //Initial index is 'Stylist' Tab
    const [index, setIndex] = useContext(IndexContext);
    const [info, actions] = useContext(UserContext);

    useEffect(() => {
        console.log(index);
        navigation.navigate(index);
    }, [index])

    return (
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => {
                setIndex('Stylist');
            }}>
                {
                    index === 'Stylist' ? <Icon name='home' size={30} /> : <Icon name='home-outline' size={30} />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setIndex('Chat');
            }}>
                {
                    index === 'Chat' ? <Icon name='chatbox' size={30} /> : <Icon name='chatbox-outline' size={30} />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if (info.login_state === 0) {
                    navigation.navigate('LoginModal');
                }
                else if (info.login_state === 1) {
                    setIndex('MyPage');
                }
            }}>
                {
                    index === 'MyPage' ? <Icon name='person' size={30} /> : <Icon name='person-outline' size={30} />
                }
            </TouchableOpacity>
        </View>
    );
}

export default BottomTabBar;