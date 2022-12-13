// CustomTextInput > PascalCase
// customTextInput > camelCase
// custom_text_input > snake_case
// custom-text-input > kebab-case
import React, { useState } from 'react';
import { StyleSheet, TextInput, ViewStyle } from 'react-native';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  secureTextEntry?: boolean;
};

const CustomTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  style,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.textInput, style]}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});

export default CustomTextInput;
