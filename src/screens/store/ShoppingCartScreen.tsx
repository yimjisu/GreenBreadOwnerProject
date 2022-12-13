import PublicText from '../../components/common/PublicText';
import {Image, StyleSheet, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import OrangeButton from '../../components/buttons/LightBlueButton';
import NumericInput from '../../components/buttons/NumericInput';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import {
  productListInCartState,
  storeInCartState,
} from '../../atoms/shoppingCartState';
import userTokenState from '../../atoms/userTokenState';
import {images} from '../../../lib/image';

const DEFAULT_IMAGE = require('../../assets/product-images/단팥빵.png');
const ShoppingCartScreen = ({navigation, route}) => {
  const storeId = route.params.storeId;
  const productId = route.params.productId;

  const user = useRecoilValue(userTokenState);
  const setProductList = useSetRecoilState(productListInCartState);
  const storeIncart = useRecoilValue(storeInCartState);
  const setStoreInCart = useSetRecoilState(storeInCartState);

  const [productData, setProductData] = useState({});
  const [number, setNumber] = useState(1);

  function addItems(num, amt, price, reset) {
    setStoreInCart(storeId);
    if (reset) {
      setProductList(new Map());
    }
    setProductList(cart => new Map([...cart, [productId, {amount: num, price: price}]]));

    firestore()
      .collection('store')
      .doc(storeId)
      .collection('product')
      .doc(productId)
      .update({amount: amt - num});

    navigation.goBack();
  }
  function checkValid(num, amt, price) {
    if (storeIncart != null && storeIncart !== storeId) {
      Alert.alert(
        '장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.',
        '선택하신 메뉴를 장바구니에 담을 경우 이전에 담은 메뉴가 삭제됩니다.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '담기',
            style: 'default',
            onPress: () => addItems(num, amt, price, true),
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      addItems(num, amt, price, false);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        firestore()
          .collection('store')
          .doc(storeId)
          .collection('product')
          .doc(productId)
          .onSnapshot(snapshot => {
            setProductData(snapshot.data());
          });
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  const onPressBasket = useCallback(async () => {
    checkValid(number, productData.amount, productData.dc_price);
  }, [navigation, number, productData]);

  const onIncrease = () => {
    setNumber(number + 1);
  };

  const onDecrease = () => {
    setNumber(number - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <Image
          source={
            productData.img_path && images[productData.img_path]
              ? images[productData.img_path]
              : DEFAULT_IMAGE
          }
          style={styles.backgroundImage}></Image>
        <View style={styles.titleContainer}>
          <PublicText style={styles.title}>{productData.title}</PublicText>
          <PublicText style={styles.description}>
            {productData.description}
          </PublicText>
          <PublicText style={styles.infoText}>
            잔여수량 {productData.amount}개
          </PublicText>
          <PublicText style={styles.infoText}>
            판매가격 {productData.origin_price}원
          </PublicText>
          <PublicText style={styles.infoText}>
            할인가격 {productData.dc_price}원
          </PublicText>
        </View>
      </ScrollView>

      <View style={styles.cartContainer}>
        <NumericInput
          style={styles.numericInput}
          limit={productData.amount}
          number={number}
          onIncrease={onIncrease}
          onDecrease={onDecrease}></NumericInput>
        <View style={styles.textContainer}>
          <PublicText style={styles.textAmt}>
            총액 : {productData.dc_price * number} 원
          </PublicText>
        </View>
        <OrangeButton
          style={styles.button}
          title="장바구니 담기"
          onPress={onPressBasket}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  infoContainer: {
    paddingHorizontal: 20,
    flex: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cartContainer: {
    height: 200,
    backgroundColor: 'rgba(255, 216, 157, 0.5)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    widht: '100%',
  },
  backgroundImage: {
    width:200,
    borderRadius: 10,
    height: 200,
    marginBottom: 10,
  },
  titleContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 10,
    marginBottom: 10,
    borderStyle: 'dotted',
    borderBottomColor: '#FFD89D',
    borderBottomWidth: 2,
  },
  description: {
    color: 'gray',
    fontSize: 15,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textAmt: {
    fontSize: 14,
    color: 'black',
  },
  numericInput: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
  },
});
export default ShoppingCartScreen;
