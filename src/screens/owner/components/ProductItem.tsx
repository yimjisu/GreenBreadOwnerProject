import React, {useEffect, useState, useCallback} from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PublicText from '../../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';
import OrangeButton from '../../../components/buttons/LightBlueButton';

const DEFAULT_IMAGE = require('../../../assets/product-images/단팥빵.png');
import {images} from '../../../../lib/image';
import NumericInput from '../../../components/buttons/NumericInput';
import LabelText from '../../../components/common/LabelText';
import GrayButton from '../../../components/buttons/GrayButton';
import CancelButton from '../../../components/buttons/CancelButton';
const ProductItem: React.FC<Props> = ({storeId, productId}) => {
  const [data, setData] = useState({});
  const [number, setNumber] = useState(0);
  const [modifyState, setModifyState] = useState(false);
  useEffect(() => {
    async function init() {
      try {
        firestore()
          .collection('store')
          .doc(storeId)
          .collection('product')
          .doc(productId)
          .onSnapshot(doc => {
            if (doc.exists) {
              setData(doc.data());
              setNumber(doc.data().amount);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, [storeId, productId]);

  const onIncrease = () => {
    setNumber((number) => number + 1);
  }

  const onDecrease = () => {
    setNumber((number) => number - 1);
  }

  const onPress = useCallback(() => {
    if(modifyState) {
      firestore()
        .collection('store')
        .doc(storeId)
        .collection('product')
        .doc(productId)
        .update({amount: number})
    }
    setModifyState((state) => !state);
  }, [modifyState, number]);

  const onPressCancel = useCallback(() => {
    setNumber(data.amount);
    setModifyState((state) => !state);
  }, [modifyState]);

  return (
    <View style={styles.container}>
      <Image
        source={
          data.img_path && images[data.img_path]
            ? images[data.img_path]
            : DEFAULT_IMAGE
        }
        style={styles.backgroundImage}></Image>
      <View style={styles.titleContainer}>
        <PublicText style={styles.title}>{data.title}</PublicText>
        <LabelText label="잔여 수량" text={data.amount+"개"}/>
        <LabelText label="정상 가격" text={data.origin_price+"개"}/>
        <LabelText label="할인 가격" text={data.dc_price+"개"}/>
      </View>
      {
        modifyState && 
        <View style={styles.input}>
          <NumericInput number={number} onIncrease={onIncrease} onDecrease={onDecrease}/>
        </View>
      }
      {
        modifyState ? (
          <>
          <OrangeButton
            style={{...styles.buttonStyle, marginRight: 5}}
            textStyle={styles.button} 
            title="설정하기"
            onPress={onPress}/>
          <GrayButton
            style={styles.buttonStyle}
            textStyle={styles.button} 
            title="취소"
            onPress={onPressCancel}/>
          </>
        ) : (
          <GrayButton
            style={styles.buttonStyle}
            textStyle={styles.button} 
            title = "수량 변경하기"
            onPress={onPress}/>

        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRightColor: '#D9D9D9',
    borderRightWidth: 1,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    maxWidth: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 15,
    color: 'gray',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    fontSize: 12,
  },
  buttonStyle: {
    borderRadius: 10,
  }
});
export default ProductItem;
