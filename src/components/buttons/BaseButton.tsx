import React from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';

import PublicText from '../common/PublicText';

type Props = {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const BaseButton: React.FC<Props> = ({
  title,
  style,
  textStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity>
      <Pressable
        style={[styles.button, style]}
        onPress={onPress}
        disabled={disabled}>
        <PublicText style={textStyle}>{title}</PublicText>
      </Pressable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
});

export default BaseButton;
