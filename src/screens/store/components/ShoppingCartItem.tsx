import React from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {ScrollView, Image, StyleSheet, View} from 'react-native';
import PublicText from '../../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';
import { images } from '../../../../lib/image';

const DEFAULT_IMAGE = require('../../../assets/product-images/단팥빵.png');

const ShoppingCartItem = ({productId, storeId, amount}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    function init() {
      try{
        console.log('store', storeId, 'product', productId);
        firestore()
          .collection('store')
          .doc(storeId)
          .collection('product')
          .doc(productId)
          .get()
          .then(doc => {
            if(doc.exists) {
              setData(doc.data());
            }
          })
      } catch(error) {
        console.log(error);
      }
    }
    init();
  }, [storeId, productId]);

  return (
    <View style={styles.container}>
      <Image
        source={data.img_path && images[data.img_path] ? images[data.img_path] : DEFAULT_IMAGE}
        style={styles.backgroundImage}>
      </Image>      
      <View style={styles.titleContainer}>
        <PublicText style={styles.title}>{data.title}</PublicText>
        <PublicText style={styles.text}>가격  {data.dc_price}원</PublicText>
        <PublicText style={styles.text}>수량  {amount}개</PublicText>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
container: {
  paddingHorizontal: 20,
  borderRightColor: '#D9D9D9',
  borderRightWidth: 1,
  flex: 1,
  flexDirection: "row",
  paddingVertical: 10,
},
backgroundImage: {
  width: 100,
  height: 100,
  borderRadius: 20,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#ccc',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginRight: 10,
},
inputContainer: {
  width: 100,
},
titleContainer: {
  width: '100%',
},
title: {
  fontSize: 16,
  color: 'black',
  fontWeight: 'bold'
},
text: {
  fontSize: 16,
  color: "black",
  fontWeight: "200",
}
});
export default ShoppingCartItem;
