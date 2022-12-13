import PublicText from '../../components/common/PublicText';
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProductItem from './components/ProductItem';
import firestore from '@react-native-firebase/firestore';
import userTokenState from '../../atoms/userTokenState';
import { useRecoilValue } from 'recoil';
import OrangeButton from '../../components/buttons/LightBlueButton';

const MenuScreen = ({navigation, route}) => {
  const [productList, setProductList] = useState([]);
  const storeId = useRecoilValue(userTokenState);  

  useEffect(() => {
    async function init() {
      try {
        firestore()
          .collection('store')
          .doc(storeId)
          .collection('product')
          .onSnapshot(querySnapshot => {
            var products = [];
            querySnapshot.forEach(doc => {
              products.push(doc.id);
            });
            setProductList(products);
          });
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, [storeId]);

  // const onPressProduct = useCallback(
  //   (storeId: number, productId: number) => async() => {
  //     navigation.navigate('ShoppingCartScreen', {
  //       storeId: storeId,
  //       productId: productId,
  //     });
  // }, [navigation]);


  return (
    <View style={styles.container}>
       <ScrollView>
        {productList.map(item => {
          return (
            <ProductItem
              key={item}
              storeId={storeId}
              productId={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
  },
  text: {
    color: 'black',
  },
});

export default MenuScreen;
