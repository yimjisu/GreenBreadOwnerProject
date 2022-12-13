import React from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import PublicText from '../../../components/common/PublicText';
import firestore from '@react-native-firebase/firestore';
import StoreListItem from './StoreListItem';
import Logo from '../../../components/layout/Logo';
const StoreList = ({navigation, title, state, now}) => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        firestore()
        .collection('store')
        .where("openState", "==", state).onSnapshot(
          (querySnapshot) => {
          var stores = [];
          querySnapshot.forEach((doc) => {
            stores.push(doc.id);
          })
          setStoreList(stores);
        });
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  const onPressStore = useCallback((storeId: number) => async () => {
    navigation.navigate('StoreHome', {
      storeId,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <PublicText style={styles.title}>{title}</PublicText>
        {now && <Logo style={styles.logo}/>}
      </View>
      <ScrollView contentContainerStyle={styles.flatContainer}>
      {
        storeList.map((item) => {
          return(
          <StoreListItem
            key={item}
            id={item}
            onPress={onPressStore(item)}
            now={now}
          />
          );
        })
      }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  logo : {
    width: 45,
    height: 45,
  },
  title: {
    color: 'orange',
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});

export default StoreList;
