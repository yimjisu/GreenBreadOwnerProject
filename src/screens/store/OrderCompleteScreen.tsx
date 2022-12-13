import PublicText from '../../components/common/PublicText';
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';
import firestore from '@react-native-firebase/firestore';
import userTokenState from '../../atoms/userTokenState';
import ShoppingCartItem from './components/ShoppingCartItem';
import { productListInCartState, storeInCartState } from '../../atoms/shoppingCartState';
import { getDocsId } from '../../../lib/firestore';
import OrderItem from './components/OrderItem';

const OrderCompleteScreen = ({navigation, route}) => {
  const {id} = route.params;
  const setProductListInCart = useSetRecoilState(productListInCartState);
  const setStoreInCartList = useSetRecoilState(storeInCartState);

  useEffect(() => {
    setProductListInCart(new Map());
    setStoreInCartList(null);
  }, []);

  return (
    <OrderItem id={id}/>
  );
};
export default OrderCompleteScreen;
