import PublicText from '../../components/common/PublicText';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';
import firestore from '@react-native-firebase/firestore';
import OrangeButton from '../../components/buttons/LightBlueButton';
import userTokenState from '../../atoms/userTokenState';
import ShoppingCartItem from './components/ShoppingCartItem';
import {
  productListInCartState,
  storeInCartState,
} from '../../atoms/shoppingCartState';

const TotalShoppingCartScreen = ({navigation, route}) => {
  const [orders, setOrders] = useState([]);
  const user = useRecoilValue(userTokenState);
  const carts = useRecoilValue(productListInCartState);
  const storeId = useRecoilValue(storeInCartState);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    function init() {
      try {
        var list = [];
        var totalPrice = 0;
        carts.forEach((value, key) => {
          list.push({
            productId: key,
            amount: value.amount,
            price: value.price,
          });
          totalPrice += value.amount * value.price;
        });
        setTotalPrice(totalPrice);
        setOrders(list);
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, []);

  const onPressOrder = useCallback(async () => {
    var data = {orders: orders, totalPrice: totalPrice, state:'ready', date: new Date().toLocaleString()};
    
    await firestore()
      .collection('store')
      .doc(storeId)
      .collection('order')
      .add({...data, user: user});

    const docRef = await firestore()
      .collection('user')
      .doc(user)
      .collection('order')
      .add({...data, storeId: storeId});

    const id = docRef.id;
    navigation.navigate('OrderCompleteScreen', {id});
  }, [navigation, orders, storeId, user]);

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({item}) => (
          <ShoppingCartItem
            productId={item.productId}
            storeId={storeId}
            amount={item.amount}
          />
        )}
        keyExtractor={item => item.productId}
        data={orders}
      />
      <View style={styles.cartContainer}>
        <PublicText style={styles.textAmt}>총액   {totalPrice} 원</PublicText>
        <OrangeButton onPress={onPressOrder} title="주문하기" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cartContainer: {
    height: 120,
    backgroundColor: 'rgba(255, 216, 157, 0.5)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    widht: '100%',
  },
  textAmt: {
    fontSize: 14,
    color: 'black',
    paddingBottom: 10,
  },
});
export default TotalShoppingCartScreen;
