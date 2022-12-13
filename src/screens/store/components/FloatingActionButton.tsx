import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICON = require('../../../assets/images/ShoppingCartOutlinedWhite.png');

type Props = {
  clubId: number;
};

const FloatingActionButtton: React.FC<Props> = ({productId, number, onPress}) => {
  const inset = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={[styles.container, {bottom: inset.bottom + 20}]}
      onPress={onPress}>
      <Image source={ICON} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    backgroundColor: "#FF9E58",
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default FloatingActionButtton;
