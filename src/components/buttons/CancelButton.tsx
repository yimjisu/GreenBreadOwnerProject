import React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';

import BaseButton from './BaseButton';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
};
const CancelButton: React.FC<Props> = ({onPress}) => {
  return <BaseButton title="취소" textStyle={styles.button} onPress={onPress} />;
};

const styles = StyleSheet.create({
  button: {
    color: 'black',
  },
});

export default CancelButton;
