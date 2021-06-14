import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ title, navigation, isMain }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //Drawer exists only stylist tab
    if (isMain === true) {
        return (
            <View style={{
                minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
            }}>
                <TouchableOpacity style={{ position: 'absolute', left: 16 }} onPress={() => {
                    navigation.openDrawer()
                }}>
                    <Icon name='menu-outline' size={33} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>{title}</Text>
                {/* <Icon name='notifications-none' size={35} style={{ position: 'absolute', right: 55 }} /> */}
                {/* <Icon name='search' size={35} style={{ position: 'absolute', right: 10 }} /> */}
            </View>
        );
    }
    //BackButton exists not main
    else {
        return (
            <View style={{
                minHeight: 45, width: '100%', flexDirection: 'row', backgroundColor: '#ffffff',
                justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#d2d2d2'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 16 }}>
                    <Icon name='chevron-back' size={33} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', includeFontPadding: false }}>{title}</Text>
                <TouchableOpacity onPress={() => navigation.popToTop()} style={{ position: 'absolute', right: 10 }}>
                    <Icon name='home-outline' size={33} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Header;