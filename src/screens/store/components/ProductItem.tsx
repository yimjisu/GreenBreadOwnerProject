import React, {useEffect, useState} from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import PublicText from '../../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';

const DEFAULT_IMAGE = require('../../../assets/product-images/단팥빵.png');
import { images } from '../../../../lib/image';
const ProductItem: React.FC<Props> = ({storeId, productId, onPress}) => {
  const [data, setData] = useState({});
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
  }, []);

  return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          source={data.img_path && images[data.img_path] ? images[data.img_path] : DEFAULT_IMAGE}
          style={styles.backgroundImage}>
        </Image>      
        <View style={styles.titleContainer}>
          <PublicText style={styles.title}>{data.title}</PublicText>
          <PublicText style={styles.infoText}>잔여수량    {data.amount}개</PublicText>
          <PublicText style={styles.infoText}>판매가격    {data.origin_price}원</PublicText>
          <PublicText style={styles.infoText}>할인가격    {data.dc_price}원</PublicText>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRightColor: '#D9D9D9',
    borderRightWidth: 1,
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  backgroundImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  titleContainer: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  infoText:{
    fontSize: 15,
    color: 'gray',
  }
});
export default ProductItem;
