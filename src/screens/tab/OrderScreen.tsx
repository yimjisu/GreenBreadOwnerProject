import React, {useState, useEffect, useCallback} from 'react';
import {useRecoilValue} from 'recoil';
import {View, FlatList, StyleSheet} from 'react-native';
import userTokenState from '../../atoms/userTokenState';
import OrderItem from '../store/components/OrderItem';
import firestore from '@react-native-firebase/firestore';

const OrderScreen = ({navigation}) => {
  const user = useRecoilValue(userTokenState);
  const [data, setData] = useState([]);

  useEffect(() => {
    function init() {
      firestore()
        .collection('user')
        .doc(user)
        .collection('order')
        .orderBy('date')
        .limit(10)
        .get()
        .then((query) => {
            var orders = [];
            query.forEach((doc) => {
                orders.push(doc.id);
            });
          setData(orders);
        });
    }
    init();
  }, [user]);

  return (
    <FlatList
      renderItem={({item}) => <OrderItem id={item}/>}
      data={data}
    />
  );
};
export default OrderScreen;
