import PublicText from '../../../components/common/PublicText';
import {View, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import firestore from '@react-native-firebase/firestore';
import userTokenState from '../../../atoms/userTokenState';
import ShoppingCartItem from './ShoppingCartItem';

const OrderItem = ({id}) => {
  const user = useRecoilValue(userTokenState);
  const [data, setData] = useState({});
  const [storeInfo, setStoreInfo] = useState({});
  useEffect(() => {
    function init() {
      try {
        firestore()
          .collection('user')
          .doc(user)
          .collection('order')
          .doc(id)
          .onSnapshot(doc => {
            if (doc.exists) {
              setData(doc.data());
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [id]);

  useEffect(() => {
    firestore()
      .collection('store')
      .doc(data.storeId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setStoreInfo(doc.data());
        }
      });
  }, [data]);

  return (
    <View style={styles.container}>
        {
          data.state == 'ready' && (
            
          <View style={styles.titleContainer}>
              <PublicText style={styles.title}>주문 접수 중입니다!</PublicText>
              <PublicText style={styles.description}>
                주문이 완료될 때까지 대기해주세요
              </PublicText>
            </View>
          )
        }
        {
          data.state == 'checked' && (
            <View style={styles.titleCompleteContainer}>
            <PublicText style={styles.titleComplete}>주문 접수가 완료되었습니다!</PublicText>
            <PublicText style={styles.descriptionComplete}>
              매장을 방문하여 빵을 수령해주세요
            </PublicText>
            </View>
          )
        }
        <View style={styles.orderContainer}>
        <PublicText style={styles.title}>주문 내역</PublicText>
        <PublicText style={styles.text}>매장 {storeInfo.title}</PublicText>
        <PublicText style={styles.text}>주소 {storeInfo.addr}</PublicText>
        <PublicText style={styles.text}>시간 {data.date}</PublicText>
        
        <FlatList
          renderItem={({item}) => (
            <ShoppingCartItem
              productId={item.productId}
              storeId={data.storeId}
              amount={item.amount}
            />
          )}
          keyExtractor={item => item.productId}
          data={data.orders}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    color: 'black',
    backgroundColor: 'rgba(255, 216, 157, 0.5)',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
  titleCompleteContainer: {
    justifyContent: 'center',
    backgroundColor: '#FF9E58',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  titleComplete: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  descriptionComplete: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  orderContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  flatList: {
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 20,
    fontSize: 15,
    color: 'gray',
  },
});
export default OrderItem;
