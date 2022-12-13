import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';
import MenuScreen from '../owner/MenuScreen';
import ReviewScreen from '../owner/ReviewScreen';
import StoreInfoScreen from '../owner/StoreInfoScreen';

const Tab = createMaterialTopTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, 'StoreHome'>;
const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <ScreenContainer>
      <Tab.Navigator>
        <Tab.Screen name="정보" component={StoreInfoScreen}/>
        <Tab.Screen name="메뉴" component={MenuScreen}/>
        <Tab.Screen name="후기" component={ReviewScreen} />
      </Tab.Navigator>
    </ScreenContainer>
  );
};

export default HomeScreen;
