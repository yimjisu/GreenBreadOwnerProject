import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './tab/HomeScreen';
import SettingScreen from './tab/SettingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderScreen from './tab/OrderScreen';
import SearchScreen from './tab/SearchScreen';

const RootTabNavigator: React.FC<Props> = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '매장 관리') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === '판매 내역') {
            iconName = focused ? 'md-reader' : 'md-reader-outline';
          } else if (route.name === '내 정보') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      
      >
      <Tab.Screen name="매장 관리" component={HomeScreen} />
      <Tab.Screen name="판매 내역" component={OrderScreen} />
      <Tab.Screen name="내 정보" component={SettingScreen} />
    </Tab.Navigator>
  );
};
export default RootTabNavigator;
