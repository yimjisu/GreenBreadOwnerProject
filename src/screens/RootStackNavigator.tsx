import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {useRecoilState} from 'recoil';

import userTokenState from '../atoms/userTokenState';
import SignInScreen from './auth/SignInScreen';
import SignUpScreen from './auth/SignUpScreen';
import RootTabNavigator from './RootTabNavigator';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  StoreList: undefined;
  CreateProfile: {
    storeId: number;
  };
  StoreHome: {
    storeId: number;
  };
  ArticleWrite: {
    storeId: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userTokenStateValue, setUserTokenState] =
    useRecoilState(userTokenState);

  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('token');
      setUserTokenState(token);
      setIsLoading(false);
    }
    init();
  }, []);

  if (isLoading === true) {
    return (
      <View style={styles.indicatorContainer}>
        <DotIndicator color="#000" />
      </View>
    );
  }

  // userToken === null ? 참 : 거짓
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userTokenStateValue === null ? 'SignIn' : 'StoreList'}>
      {userTokenStateValue === null ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Tab" component={RootTabNavigator}/>
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default RootStackNavigator;
