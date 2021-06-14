import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IndexContext } from '../../context/BottomTabIndex';
import { ChatContext } from '../../context/ChatContext';

//BottomTabBar의 Navigation활용 버전
const MyTabBar = ({ state, descriptors, navigation }) => {
    const [index, setIndex] = useContext(IndexContext);
    const [fcmtoken, setFcmtoken, isread_exist, setIsread_exist] = useContext(ChatContext);

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{
            width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
            backgroundColor: '#ffffff', borderTopWidth: 0.5, borderColor: '#d2d2d2',
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    setIndex(route.name);
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                        key={index}
                    >
                        {route.name === 'Stylist' ? isFocused ? <Icon name='home' size={30} /> : <Icon name='home-outline' size={30} /> :
                            route.name === 'Chat' ?
                                isFocused ?
                                    <View>
                                        <Icon name='chatbox' size={30} />
                                        {isread_exist === 1 ? <Icon name='alert-circle' size={20} style={{ position: 'absolute', right: -12, top: -5 }} color='red' /> : null}
                                    </View> :
                                    <View>
                                        <Icon name='chatbox-outline' size={30} />
                                        {isread_exist === 1 ? <Icon name='alert-circle' size={20} style={{ position: 'absolute', right: -12, top: -5 }} color='red' /> : null}
                                    </View> :
                                route.name === 'MyPage' ? isFocused ? <Icon name='person' size={30} /> : <Icon name='person-outline' size={30} /> : null
                        }
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MyTabBar;