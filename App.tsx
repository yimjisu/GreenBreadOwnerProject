import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RecoilRoot } from 'recoil';


import RootStackNavigator from './src/screens/RootStackNavigator';

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    borderWidth: 10,
  },
});

export default App;
