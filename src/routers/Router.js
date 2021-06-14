import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions, Alert } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

import MyTabBar from '../screens/components/MyTabBar';

import Stylist_Select from '../screens/BottomTab/Stylist/Stylist_Select';
import Stylist_Profile from '../screens/BottomTab/Stylist/Stylist_Profile';
import Feed_Detail from '../screens/BottomTab/Stylist/Feed_Detail';
import Intro0 from '../screens/BottomTab/Stylist/Survey/Intro0';
import Intro1 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro1';
import Intro2 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro2';
import Intro3 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro3';
import Intro4 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro4';
import Intro5 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro5';
import Intro6 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro6';
import Intro7 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro7';
import Intro8 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro8';
import Intro9 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro9';
import Intro10 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro10';
import Intro11 from '../screens/BottomTab/Stylist/Survey/UserInfo/Intro11';
import Survey1 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey1';
import Survey2 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey2';
import Survey3 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey3';
import Survey4 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey4';
import Survey5 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey5';
import Survey6 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey6';
import Survey7 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey7';
import Survey8 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey8';
import Survey9 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey9';
import Survey10 from '../screens/BottomTab/Stylist/Survey/Requirements/Survey10';
import Final_Survey from '../screens/BottomTab/Stylist/Survey/Final_Survey';
import Payment from '../screens/BottomTab/Stylist/Survey/Payment';
import Payment_View from '../screens/BottomTab/Stylist/Payment_View';
import Payment_Success from '../screens/BottomTab/Stylist/Survey/Payment_Success';
import Payment_Fail from '../screens/BottomTab/Stylist/Survey/Payment_Fail';

import { RequestProvider } from '../context/RequestContext';
import { UserProvider, UserContext } from '../context/UserContext';
import { IndexProvider } from '../context/BottomTabIndex';
import { ChatProvider, ChatContext } from '../context/ChatContext';

import Login from '../screens/Login';
import Signup from '../screens/Signup';

import ChatRoomList from '../screens/BottomTab/Chat/ChatRoomList';
import ChatRoom from '../screens/BottomTab/Chat/ChatRoom';
import Chat_Review from '../screens/BottomTab/Chat/Chat_Review';

import My_Page from '../screens/BottomTab/MyPage/My_Page';
import Requirement from '../screens/BottomTab/MyPage/Requirement';
import Suggestion from '../screens/BottomTab/MyPage/Suggestion';
import Review from '../screens/BottomTab/MyPage/Review';
import Myinfo from '../screens/BottomTab/MyPage/Myinfo';
import Suggestion_Requirement from '../screens/BottomTab/MyPage/Suggestion_Requirement';
import Requirement_Suggestion from '../screens/BottomTab/MyPage/Requirement_Suggestion';

import Notice from '../screens/Drawer/Notice';
import Law from '../screens/Drawer/Law';
import CS from '../screens/Drawer/CS';

const RootDrawerStack = createDrawerNavigator();

const MainStack = createStackNavigator();

const LoginModalStack = createStackNavigator();
const MainBottomTab = createBottomTabNavigator();

const StylistStack = createStackNavigator();
const ChatStack = createStackNavigator();
const MyPageStack = createStackNavigator();

const NoticeStack = createStackNavigator();
const LawStack = createStackNavigator();
const CSStack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Screen transition Slide Animation
const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateX: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.width, // Focused, but offscreen in the beginning
                                0, // Fully focused
                                screen.width * -0.3, // Fully unfocused
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    };
};

//Screen transition Slide Animation
const forModalSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateY: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.height, // Focused, but offscreen in the beginning
                                0, // Fully focused
                                screen.height * -0.3, // Fully unfocused
                            ],
                            extrapolate: 'clamp',
                        }),
                        inverted
                    ),
                },
            ],
        },
    };
};

const CustomDrawer = (props) => {
    const [info, actions] = useContext(UserContext);

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <View style={{ height: windowHeight / 20, }} />
                {info.login_state === 0 ?
                    <TouchableOpacity style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: windowWidth / 40 }} onPress={() => {
                        props.navigation.navigate('LoginModal');
                    }}>
                        <Icon name='person-circle-outline' size={windowWidth / 8} style={{ color: '#787878', marginLeft: 4 }} />
                        <Text style={{ fontSize: windowWidth / 20, fontFamily: 'NanumSquare_acR', includeFontPadding: false, marginLeft: 4 }}>로그인 해주세요</Text>
                    </TouchableOpacity> :
                    <View style={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                        {info.user_profile_photo === 'default' ? <Icon name='person-circle-outline' size={windowWidth / 8} style={{ color: '#787878', marginLeft: windowWidth / 40 }} /> :
                            <Image source={{ uri: info.user_profile_photo }} style={{ width: windowWidth / 8, aspectRatio: 1 / 1, borderRadius: 200, marginLeft: windowWidth / 40 }} />
                        }
                        <Text style={{ fontSize: windowWidth / 20, fontFamily: 'NanumSquare_acEB', includeFontPadding: false, marginLeft: 4, marginRight: 5 }}>{info.nick_name}</Text>
                        <Text style={{ fontSize: windowWidth / 20, fontFamily: 'NanumSquare_acR', includeFontPadding: false, }}>님</Text>
                    </View>
                }
                <View style={{ width: '100%', flex: 1, marginTop: 5 }}>
                    <DrawerItemList {...props} />
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

//Drawer Menu
const RootDrawer = () => {
    return (
        <UserProvider>
            <RequestProvider>
                <ChatProvider>
                    <RootDrawerStack.Navigator drawerStyle={{ width: windowWidth / 2 }}
                        drawerContentOptions={{
                            activeBackgroundColor: '#eaeaea', activeTintColor: '#000000', labelStyle: { fontFamily: 'NanumSquare_acR', fontSize: windowWidth / 20 },
                            itemStyle: { paddingLeft: 6, }
                        }}
                        initialRouteName='Main'
                        drawerContent={(props) => <CustomDrawer {...props} />}>
                        <RootDrawerStack.Screen name='Main' component={MainLoginStack} options={{ swipeEnabled: false, drawerLabel: '스타일링 받기' }} />
                        <RootDrawerStack.Screen name='Notice' component={NoticeScreen} options={{ swipeEnabled: false, drawerLabel: '공지사항' }} />
                        <RootDrawerStack.Screen name='Law' component={LawScreen} options={{ swipeEnabled: false, drawerLabel: '이용약관' }} />
                        <RootDrawerStack.Screen name='CS' component={CSScreen} options={{ swipeEnabled: false, drawerLabel: 'FAQ' }} />
                    </RootDrawerStack.Navigator>
                </ChatProvider>
            </RequestProvider>
        </UserProvider>

    )
}

// tab + login navigation
const MainLoginStack = () => {
    const [fcmtoken, setFcmtoken, isread_exist, setIsread_exist] = useContext(ChatContext);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // console.log('remoteMessage : ' + remoteMessage);
            // console.log(remoteMessage);
            if (remoteMessage.notification.title === '요청서') {
                setIsread_exist(1);
                Alert.alert('요청서 도착!', '요청서가 도착하였습니다. 채팅탭에서 지금 바로 확인해주세요.',
                    [
                        {
                            text: '확인하겠습니다.',
                            style: 'success',
                            onPress: () => { },
                        }
                    ]);
            }
            else if (remoteMessage.notification.title === '제안서') {
                setIsread_exist(1);
                Alert.alert('제안서 도착!', '제안서가 도착하였습니다. 채팅탭에서 지금 바로 확인해주세요.',
                    [
                        {
                            text: '확인하겠습니다.',
                            style: 'success',
                            onPress: () => { },
                        }
                    ]);
            }
            else if (remoteMessage.notification.title === '채팅') {
                setIsread_exist(1);
            }
        });

        return unsubscribe;
    }, [])

    //앱 첫 실행화면에서 fcm토큰 값 가져오기
    messaging().getToken()
        .then(token => {
            setFcmtoken(token);
        });

    return (
        <MainStack.Navigator mode='modal' headerMode='none'>
            <MainStack.Screen name='Main' component={MainBottom} options={{ cardStyleInterpolator: forSlide }} />
            <MainStack.Screen name='LoginModal' component={LoginModal} options={{ cardStyleInterpolator: forModalSlide }} />
        </MainStack.Navigator>
    )
}


// Login Modal Stack
const LoginModal = () => {
    return (
        <LoginModalStack.Navigator headerMode='none'>
            <LoginModalStack.Screen name='Login' component={Login} options={{ cardStyleInterpolator: forModalSlide }} />
            <LoginModalStack.Screen name='Signup' component={Signup} options={{ cardStyleInterpolator: forSlide }} />
        </LoginModalStack.Navigator>
    );
}

//BottomTab
const MainBottom = () => {
    return (
        <IndexProvider>
            <MainBottomTab.Navigator initialRouteName='Stylist' sceneContainerStyle={{ flex: 10, width: '100%' }}
                tabBar={props => <MyTabBar  {...props} />}
                tabBarOptions={{
                    keyboardHidesTabBar: true,
                }}
            >
                <MainBottomTab.Screen name='Stylist' component={Stylist} options={({ route }) => ({
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'Stylist_Profile' || routeName === 'Feed_Detail' || routeName === 'Intro0' || routeName === 'Intro0'
                            || routeName === 'Intro1' || routeName === 'Intro2' || routeName === 'Intro3' || routeName === 'Intro4' || routeName === 'Intro5'
                            || routeName === 'Intro6' || routeName === 'Intro7' || routeName === 'Intro8' || routeName === 'Intro9' || routeName === 'Intro10'
                            || routeName === 'Intro11' || routeName === 'Survey1' || routeName === 'Survey2' || routeName === 'Survey3' || routeName === 'Survey4'
                            || routeName === 'Survey5' || routeName === 'Survey6' || routeName === 'Survey7' || routeName === 'Survey8' || routeName === 'Survey9'
                            || routeName === 'Survey10' || routeName === 'Final_Survey' || routeName === 'Payment' || routeName === 'Payment_Success'
                            || routeName === 'Payment_Fail' || routeName === 'Payment_View') {
                            return false
                        }
                        return true
                    })(route),
                })} />
                <MainBottomTab.Screen name='Chat' component={Chatting} options={({ route }) => ({
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'ChatRoom' || routeName === 'System_Requirement' || routeName === 'System_Suggestion' || routeName === 'Chat_Review') {
                            return false
                        }
                        return true
                    })(route),
                })} />
                <MainBottomTab.Screen name='MyPage' component={MyPage} options={({ route }) => ({
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === 'Requirement' || routeName === 'Suggestion' || routeName === 'Review' || routeName === 'Myinfo'
                            || routeName === 'Suggestion_Requirement' || routeName === 'Requirement_Suggestion') {
                            return false
                        }
                        return true
                    })(route),
                })} />
            </MainBottomTab.Navigator>
        </IndexProvider>
    )
}

//Stylist_Select Stack
const Stylist = () => {
    return (
        <StylistStack.Navigator initialRouteName='Stylist_Select' headerMode='none'>
            <StylistStack.Screen name='Stylist_Select' component={Stylist_Select} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Stylist_Profile' component={Stylist_Profile} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Feed_Detail' component={Feed_Detail} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro0' component={Intro0} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro1' component={Intro1} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro2' component={Intro2} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro3' component={Intro3} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro4' component={Intro4} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro5' component={Intro5} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro6' component={Intro6} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro7' component={Intro7} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro8' component={Intro8} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro9' component={Intro9} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro10' component={Intro10} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Intro11' component={Intro11} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey1' component={Survey1} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey2' component={Survey2} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey3' component={Survey3} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey4' component={Survey4} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey5' component={Survey5} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey6' component={Survey6} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey7' component={Survey7} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey8' component={Survey8} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey9' component={Survey9} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Survey10' component={Survey10} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Final_Survey' component={Final_Survey} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Payment' component={Payment} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Payment_View' component={Payment_View} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Payment_Success' component={Payment_Success} options={{ cardStyleInterpolator: forSlide }} />
            <StylistStack.Screen name='Payment_Fail' component={Payment_Fail} options={{ cardStyleInterpolator: forSlide }} />
        </StylistStack.Navigator>
    );
}

const Chatting = () => {
    return (
        <ChatStack.Navigator initialRouteName='ChatRoomList' headerMode='none'>
            <ChatStack.Screen name='ChatRoomList' component={ChatRoomList} options={{ cardStyleInterpolator: forSlide }} />
            <ChatStack.Screen name='ChatRoom' component={ChatRoom} options={{ cardStyleInterpolator: forSlide }} />
            <ChatStack.Screen name='System_Requirement' component={Suggestion_Requirement} options={{ cardStyleInterpolator: forSlide }} />
            <ChatStack.Screen name='System_Suggestion' component={Requirement_Suggestion} options={{ cardStyleInterpolator: forSlide }} />
            <ChatStack.Screen name='Chat_Review' component={Chat_Review} options={{ cardStyleInterpolator: forSlide }} />
        </ChatStack.Navigator>
    );
}

const MyPage = () => {
    return (
        <MyPageStack.Navigator initialRouteName='MyPage' headerMode='none'>
            <MyPageStack.Screen name='MyPage' component={My_Page} options={{ cardStyleInterpolator: forSlide }} />
            <MyPageStack.Screen name='Requirement' component={Requirement} options={{ cardStyleInterpolator: forSlide }} />
            <MyPageStack.Screen name='Suggestion' component={Suggestion} options={{ cardStyleInterpolator: forSlide }} />
            <MyPageStack.Screen name='Review' component={Review} options={{ cardStyleInterpolator: forSlide }} />
            <MyPageStack.Screen name='Myinfo' component={Myinfo} options={{ cardStyleInterpolator: forSlide }} />
            <MyPageStack.Screen name='Suggestion_Requirement' component={Suggestion_Requirement} options={{ cardStyleInterpolator: forSlide }} />
            <MyPageStack.Screen name='Requirement_Suggestion' component={Requirement_Suggestion} options={{ cardStyleInterpolator: forSlide }} />
        </MyPageStack.Navigator>
    );
}

const NoticeScreen = () => {
    return (
        <NoticeStack.Navigator headerMode='none'>
            <NoticeStack.Screen name='Notice' component={Notice} options={{ cardStyleInterpolator: forSlide }} />
        </NoticeStack.Navigator>
    );
}

const LawScreen = () => {
    return (
        <LawStack.Navigator headerMode='none'>
            <LawStack.Screen name='Law' component={Law} options={{ cardStyleInterpolator: forSlide }} />
        </LawStack.Navigator>
    );
}

const CSScreen = () => {
    return (
        <CSStack.Navigator headerMode='none'>
            <CSStack.Screen name='CS' component={CS} options={{ cardStyleInterpolator: forSlide }} />
        </CSStack.Navigator>
    );
}

export default RootDrawer;