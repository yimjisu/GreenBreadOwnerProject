import React, {useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PublicText from '../../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';

type Props = {
  title: string;
  distance: number;
  location: string;
  openTime?: string;
  closeTime?: string;
  current: boolean;
  image?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const DEFAULT_IMAGE = require('../../../assets/images/store-default-image.png');
const SalesInfoItem: React.FC<Props> = ({id}) => {
  const [data, setData] = useState({});
  const [totalAmount, setTotalAmount] = useState(null);
  useEffect(() => {
    async function init() {
      try {
        firestore()
          .collection('store')
          .doc(id)
          .get()
          .then(doc => {
            if (doc.exists) {
              setData(doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log('No such Product!');
            }
          });
        firestore()
          .collection('store')
          .doc(id)
          .collection('product')
          .get()
          .then((query) => {
              var total = 0;
              query.forEach((doc) => {
                const amount = doc.data().amount;
                total += amount;
              });
              setTotalAmount(total);
            }
          )
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={data.image ? {uri: image} : DEFAULT_IMAGE}
        style={styles.backgroundImage}/>
      <View style={styles.titleContainer}>
        <PublicText style={styles.title}>{data.title}</PublicText>
        <View style={{flexDirection: 'row'}}>
        <PublicText style={styles.review}>★ {data.review ? data.review : '5.0'}</PublicText>
        <PublicText style={styles.location}>{data.addr}</PublicText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  titleContainer: {
    paddingLeft: 10,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee'
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  location: {
    fontSize: 12,
    color: 'gray',
  },
  leftOver: {
    fontSize: 16,
    color: 'black',
  },
  openTime: {
    fontSize: 16,
    color: 'black',
  },
  sale: {
    fontSize: 16,
    color: 'orange',
  },
  amount: {
    fontSize: 12,
    color: 'black',
  }, 
  review: {
    fontSize: 12,
    color: 'orange',
    marginRight: 10,
  }
});
export default SalesInfoItem;
