import React from 'react';
import { GestureResponderEvent, StyleSheet, ViewStyle } from 'react-native';

import BaseButton from './BaseButton';

type Props = {
  title: string;
  style?: ViewStyle;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const OrangeButton: React.FC<Props> = ({
  title,
  style,
  textStyle,
  onPress,
  disabled,
}) => {
  return (
    <BaseButton
      title={title}
      style={[styles.button, style]}
      textStyle={[styles.text, textStyle]}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF9E58',
    borderWidth: 0,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default OrangeButton;
