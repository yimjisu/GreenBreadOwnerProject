import React from 'react';
import { Image, StyleSheet } from 'react-native';

const LOGO_IMAGE = require('../../assets/images/logo.png');

const Logo = ({style}) => {
  return <Image style={[styles.logo,style]} source={LOGO_IMAGE} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 300,
  },
});

export default Logo;
