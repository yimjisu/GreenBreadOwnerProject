import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

type Props = {
  style?: TextStyle;
  children: ReactNode;
};

const PublicText: React.FC<Props> = ({style, children}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    // fontFamily: ''
    fontSize: 15,
  },
});

export default PublicText;
