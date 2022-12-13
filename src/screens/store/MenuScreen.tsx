import PublicText from '../../components/common/PublicText';
import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProductItem from './components/ProductItem';
import firestore from '@react-native-firebase/firestore';
import FloatingActionButtton from './components/FloatingActionButton';

const MenuScreen = ({navigation, route}) => {
  const storeId = route.params.storeId;
  const [productList, setProductList] = useState([]);
  
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
  }, []);

  const onPressProduct = useCallback(
    (storeId: number, productId: number) => async() => {
      navigation.navigate('ShoppingCartScreen', {
        storeId: storeId,
        productId: productId,
      });
  }, [navigation]);

  const onPressBasket = useCallback(() => {
    navigation.navigate('TotalShoppingCartScreen');
  }, [navigation]);


  return (
    <>
       <ScrollView>
        {productList.map(item => {
          return (
            <ProductItem
              key={item}
              storeId={storeId}
              productId={item}
              onPress={onPressProduct(storeId, item)}
            />
          );
        })}
      </ScrollView>
      <FloatingActionButtton onPress={onPressBasket}/>
    </>
  );
};

const listItemStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 20,
  },
  text: {
    color: 'black',
  },
});

export default MenuScreen;
