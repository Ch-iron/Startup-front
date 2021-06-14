import React, { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import RootDrawer from './src/routers/Router';
import Splash from './src/screens/Splash';

//데이터 받아오면 스플래시 치우기
const App = () => {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setTimeout(() => {
          setSplash(false);
        }, 1500);
      }
      else {
        Alert.alert(
          '네트워크 확인',
          '네트워크를 연결하고 다시 시도해주세요.',
          [
            {
              text: '확인',
              onPress: () => BackHandler.exitApp()
            }
          ]
        )
      }
    });
  }, []);

  return (
    splash === true ? <Splash /> :
      <NavigationContainer>
        <RootDrawer />
      </NavigationContainer>
  );
}

export default App;