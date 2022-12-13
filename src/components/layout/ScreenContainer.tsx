import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children?: ReactNode;
  style?: ViewStyle;
};

const ScreenContainer: React.FC<Props> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ScreenContainer;
