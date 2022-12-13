import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ScreenContainer from '../../components/layout/ScreenContainer';
import { RootStackParamList } from '../RootStackNavigator';
import MenuScreen from './MenuScreen';
import StoreInfoScreen from './StoreInfoScreen';
import ReviewScreen from './ReviewScreen';


const Tab = createMaterialTopTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, 'StoreHome'>;
const StoreHomeScreen: React.FC<Props> = ({navigation, route}) => {
  const {storeId} = route.params;
  return (
    <ScreenContainer>
      <Tab.Navigator>
        <Tab.Screen name="메뉴" component={MenuScreen} initialParams={{storeId: storeId}}/>
        <Tab.Screen name="빵집 정보" component={StoreInfoScreen} />
        <Tab.Screen name="후기" component={ReviewScreen} />
      </Tab.Navigator>
    </ScreenContainer>
  );
};

export default StoreHomeScreen;
