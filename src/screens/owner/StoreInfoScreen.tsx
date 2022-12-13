import React, {useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PublicText from '../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';
import userTokenState from '../../atoms/userTokenState';
import { useRecoilValue } from 'recoil';
import LabelText from '../../components/common/LabelText';

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

const DEFAULT_IMAGE = require('../../assets/images/store-default-image.png');
const StoreInfoItem: React.FC<Props> = ({id}) => {
  const [data, setData] = useState({});
  const storeId = useRecoilValue(userTokenState);
  const [openTime, setOpenTime] = useState(7);
  const [endTime, setEndTime] = useState(9);

  useEffect(() => {
    async function init() {
      try {
        firestore()
          .collection('store')
          .doc(storeId)
          .get()
          .then(doc => {
            if (doc.exists) {
              setData(doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log('No such Product!');
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <PublicText style={styles.title}>매장 정보</PublicText>
        <LabelText label="주소" text={data.addr}/>
        <LabelText label="시간" text="월,화,수,목,금 10:00 ~ 22:30"/>
        <LabelText label="번호" text={data.phone}/>
      </View>
      <View style={styles.infoContainer}>
        <PublicText style={styles.title}>마감 판매 정보</PublicText>
        <LabelText label="판매 상태" text={data.openState == 'open' ? '판매 중' : '판매 준비 중'}/>
        <LabelText label="판매 시간" text={'오후 '+openTime+'시 ~ '+endTime+'시'}/>
        <LabelText label="할인율" text='50%'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingVertical: 5,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  infoContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    paddingLeft: 10,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    color: '#FF6B2C',
    fontWeight: 'bold'
  }
});
export default StoreInfoItem;
