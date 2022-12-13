import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';

type Props = {
  style?: TextStyle;
  children: ReactNode;
};

const LabelText: React.FC<Props> = ({style, label, text}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, style]}>{label}</Text>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContents: 'flex-start',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    // fontFamily: ''
    marginLeft: 10,
    fontSize: 15,
  },
});

export default LabelText;
