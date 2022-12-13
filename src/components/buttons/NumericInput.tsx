import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PublicText from '../common/PublicText';

const NumericInput: React.FC<Props> = ({number, limit, onIncrease, onDecrease, style}) => {

  return (
    <View style={[style,styles.container]}>
       <TouchableOpacity style={styles.input} onPress={onDecrease} disabled={number == 1}>
        <PublicText style={number == 1 ? styles.disabledText : styles.inputText}>-</PublicText>
       </TouchableOpacity>
      <View style={styles.textContainer}>
        <PublicText style={styles.numberText}>{number}개</PublicText>
      </View>
      <TouchableOpacity style={styles.input} onPress={onIncrease} disabled={number == limit}>
        <PublicText style={number == limit ? styles.disabledText : styles.inputText}>+</PublicText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 30,
    color: '#D9D9D9',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6B2C',
  },
  disabledText : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.1)'
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 20,
    color: '#FF6B2C',
  }
});

export default NumericInput;
